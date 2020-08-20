import pandas as pd
import numpy as np
import plotly
import json

from scipy.interpolate import griddata

from calculator.charts import Chart
from calculator.models import PropellerMesh


class _Prop:

    def __init__(self, data):
        self.v_max = int(data['maxAirspeed'])
        self.v_delta = int(data['stepSize'])
        self.v_prop = data['prop_speed']
        self.diameter = data['diameter']
        self.blades_number = data['numberOfBlades']
        # self.angle = float(data['specs'])
        self.cp = data['Cp']
        # self.v_cruise = data['specs']
        # self.min = self.get_mesh()
        self.data_cp = pd.read_csv(r'calculator/clark_3s_cp.csv')
        self.data_eff = pd.read_csv(r'calculator/clark_3s_eff.csv')
        self.points = self.prepare_points()
        self.calculate()

    # def get_mesh(self):
    #     query = PropellerMesh.query.filter(PropellerMesh.blades == self.blades_number)
    #     return pd.read_sql(query.statement, query.session.bind)

    def prepare_points(self):
        data = pd.DataFrame(np.arange(0, self.v_max + 1, self.v_delta), columns=['V'])
        data['J'] = np.round(data.V / (self.v_prop * self.diameter), 3)
        data['Cp'] = self.cp
        return data

    def interpolate_cp(self):
        cp = griddata(self.data_cp[['x', 'y']].values,
                      self.data_cp.z.values,
                      (self.points.J, self.points.Angle),
                      method='cubic', fill_value=0)
        self.points['Cp'] = np.round(cp, 4)

    def interpolate_angle(self):
        angle = griddata(self.data_cp[['x', 'z']].values,
                         self.data_cp.y.values,
                         (self.points.J, self.cp),
                         method='cubic', fill_value=0)
        self.points['Angle'] = np.round(angle, 1)

    def interpolate_eff(self):
        eff = griddata(self.data_eff[['x', 'y']].values,
                       self.data_eff.z.values,
                       (self.points.J, self.points.Angle),
                       method='cubic', fill_value=0)
        self.points['Eff'] = np.round(eff, 3)

    def draw_eff(self):
        chart = Chart(data=self.data_eff, points=self.points, z_col='Eff')
        return chart.draw()

    def get_data(self):
        chart1 = self.draw_eff()
        chart2 = self.draw_angle()
        table = self.points.to_json(orient='records')
        data = json.dumps({'charts': {"eff": chart1, "cp": chart2},
                           "table": {}}, cls=plotly.utils.PlotlyJSONEncoder)
        return data.replace('{}', table)


class PropVariable(_Prop):

    def calculate(self):
        self.interpolate_angle()
        self.interpolate_eff()

    def draw_angle(self):
        chart = Chart(data=self.data_cp, points=self.points, z_col='Cp')
        return chart.draw()


class PropFixed(_Prop):

    def calculate(self):
        j_cruise = self.v_cruise / (self.v_prop * self.diameter)
        cp_cruise = self.calculate_cp(adv_ratio=j_cruise)
        self.interpolate_cp()
        self.interpolate_eff()
        self.points['J/Jo'] = np.round(self.points.J / j_cruise, 3)
        self.points['n/no'] = np.round((cp_cruise / self.points.Cp) ** 0.5, 3)
        self.points['V_new'] = np.round(self.v_cruise * self.points['J/Jo'] * self.points['n/no'], 1)

    def calculate_cp(self, adv_ratio):
        cp = griddata(self.min[['x', 'y']].values,
                      self.min.z_angle.values,
                      (adv_ratio, self.angle),
                      method='linear', fill_value=0)
        return cp

    def draw_angle(self):
        chart = Chart(data=self.data_cp, points=self.points, z_col='Cp')
        return chart.draw()

