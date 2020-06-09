import pandas as pd
import numpy as np
import plotly
import json

from scipy.interpolate import griddata

from charts import Chart
from models import PropellerMesh


class _Prop:

    def __init__(self, inputs):
        self.v_max = int(inputs['text'].v_max.data)
        self.v_delta = int(inputs['text'].v_delta.data)
        self.v_eng = inputs['text'].v_eng.data
        self.ratio = inputs['text'].ratio.data
        self.diameter = inputs['text'].diameter.data
        self.blades_number = inputs['radio'].blades.data
        self.angle = float(inputs['specs'].angle.data)
        self.cp = inputs['specs'].Cp.data
        self.v_cruise = inputs['specs'].v_cruise.data
        self.min = self.get_mesh()
        self.data = self.prepare_data()
        self.calculate()

    def get_mesh(self):
        query = PropellerMesh.query.filter(PropellerMesh.blades == self.blades_number)
        return pd.read_sql(query.statement, query.session.bind)

    def prepare_data(self):
        v_end = self.v_max // self.v_delta * self.v_delta
        v_steps = self.v_max // self.v_delta + 1
        data = pd.DataFrame(np.linspace(0, v_end, v_steps), columns=['V'])
        data['J'] = np.round(data.V / (self.v_eng * self.ratio * self.diameter), 3)
        data['Angle'] = self.angle
        return data

    def interpolate_cp(self):
        cp = griddata(self.min[['x', 'y']].values,
                      self.min.z_angle.values,
                      (self.data.J, self.data.Angle),
                      method='linear', fill_value=0)
        self.data['Cp'] = np.round(cp, 4)

    def interpolate_angle(self):
        angle = griddata(self.min[['x', 'z_angle']].values,
                         self.min.y.values,
                         (self.data.J, self.cp),
                         method='linear', fill_value=0)
        self.data['Angle'] = np.round(angle, 1)

    def interpolate_eff(self):
        eff = griddata(self.min[['x', 'y']].values,
                       self.min.z_eff.values,
                       (self.data.J, self.data.Angle),
                       method='linear', fill_value=0)
        self.data['Eff'] = np.round(eff, 3)

    def draw_eff(self):
        chart = Chart(minified=self.min, points=self.data, cp=None,
                      z_col='z_eff', z_title='Eff', series_name='Efficiency')
        return chart.draw()

    def get_data(self):
        chart1 = self.draw_eff()
        chart2 = self.draw_angle()
        table = self.data.to_json(orient='records')
        data = json.dumps({"1": chart1, "2": chart2, "table": {}}, cls=plotly.utils.PlotlyJSONEncoder)
        return data.replace('{}', table)


class PropVariable(_Prop):

    def calculate(self):
        self.interpolate_angle()
        self.interpolate_eff()

    def draw_angle(self):
        chart = Chart(minified=self.min, points=self.data, cp=self.cp,
                      z_col='z_angle', z_title='Cp', series_name='Angle')
        return chart.draw()


class PropFixed(_Prop):

    def calculate(self):
        j_cruise = self.v_cruise / (self.ratio * self.v_eng * self.diameter)
        cp_cruise = self.calculate_cp(adv_ratio=j_cruise)
        self.interpolate_cp()
        self.interpolate_eff()
        self.data['J/Jo'] = np.round(self.data.J / j_cruise, 3)
        self.data['n/no'] = np.round((cp_cruise / self.data.Cp) ** 0.5, 3)
        self.data['V_new'] = np.round(self.v_cruise * self.data['J/Jo'] * self.data['n/no'], 1)

    def calculate_cp(self, adv_ratio):
        cp = griddata(self.min[['x', 'y']].values,
                      self.min.z_angle.values,
                      (adv_ratio, self.angle),
                      method='linear', fill_value=0)
        return cp

    def draw_angle(self):
        chart = Chart(minified=self.min, points=self.data, cp=self.data.Cp,
                      z_col='z_angle', z_title='Cp', series_name='Cp')
        return chart.draw()

