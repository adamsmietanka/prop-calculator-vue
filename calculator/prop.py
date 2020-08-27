import pandas as pd
import numpy as np
import plotly
import json

from scipy.interpolate import griddata

from calculator.charts import Chart
from calculator.models import PropellerMesh


class _Prop:

    def __init__(self, data):
        self.v_max = data['max_speed']
        self.v_delta = data['step_size']
        self.v_prop = data['prop_speed']
        self.diameter = data['diameter']
        self.blades_number = data['blades']
        self.cp = data['cp']
        self.power = data['power']
        self.angle = data['angle']
        self.ratio = data['ratio']
        # self.min = self.get_mesh()
        self.data_cp = pd.read_csv(r'calculator/clark_3s_cp.csv')
        self.data_eff = pd.read_csv(r'calculator/clark_3s_eff.csv')

    # def get_mesh(self):
    #     query = PropellerMesh.query.filter(PropellerMesh.blades == self.blades_number)
    #     return pd.read_sql(query.statement, query.session.bind)

    def prepare_points(self):
        pass

    def interpolate_cp(self, points):
        return griddata(self.data_cp[['x', 'y']].values,
                        self.data_cp.z.values,
                        (points.j, points.angle),
                        method='cubic', fill_value=0)

    def interpolate_angle(self, points):
        return griddata(self.data_cp[['x', 'z']].values,
                        self.data_cp.y,
                        (points.j, self.cp),
                        method='cubic', fill_value=0)

    def interpolate_eff(self, points):
        return griddata(self.data_eff[['x', 'y']].values,
                        self.data_eff.z.values,
                        (points.j, points.angle),
                        method='cubic', fill_value=0)

    def draw_eff(self, points):
        chart = Chart(data=self.data_eff, points=points, z_col='eff')
        return chart.draw()

    def draw_angle(self, points):
        chart = Chart(data=self.data_cp, points=points, z_col='cp')
        return chart.draw()

    def get_data(self):
        points = self.calculate_points()
        points = points.round({'j': 3, 'cp': 4, 'angle': 2, 'eff': 3, 'power': 1, 'n': 0, 'v': 1})
        table = points.to_json(orient='records')
        chart1 = self.draw_eff(points)
        chart2 = self.draw_angle(points)
        data = json.dumps({'charts': {"eff": chart1, "cp": chart2},
                           "table": {}}, cls=plotly.utils.PlotlyJSONEncoder)
        return data.replace('{}', table)

    def calculate_points(self):
        pass


class PropVariable(_Prop):

    def prepare_points(self):
        points = pd.DataFrame(np.arange(0, self.v_max * 1.2, self.v_delta), columns=['v'])
        points['j'] = np.round(points.v / (self.v_prop * self.diameter), 3)
        points['cp'] = self.cp
        points['n'] = self.v_prop * 60 / self.ratio
        return points

    def calculate_points(self):
        points = self.prepare_points()
        points['angle'] = self.interpolate_angle(points)
        points['eff'] = self.interpolate_eff(points)
        points['power'] = points.eff * self.power
        return points


class PropFixed(_Prop):

    def __init__(self, data):
        super().__init__(data)
        self.j = self.calculate_j(cp=self.cp)
        self.j_end = self.calculate_j(cp=0)

    def prepare_points(self):
        normal = np.linspace(0, self.j, 11)
        overspeed = np.linspace(self.j, self.j_end, 5)
        points = pd.DataFrame(np.unique(np.concatenate((normal, overspeed))), columns=['j'])
        points['angle'] = self.angle
        return points

    def calculate_points(self):
        points = self.prepare_points()
        points['cp'] = self.interpolate_cp(points)
        points['n'] = (self.cp * self.v_prop ** 2 / points.cp) ** 0.5

        # Engine speed limit must not be surpassed
        points.loc[points.j > self.j, 'n'] = self.v_prop

        points['eff'] = self.interpolate_eff(points)
        points['power'] = points.eff * self.power * points.n / self.v_prop
        points['v'] = points.j * points.n * self.diameter
        points['n'] = points.n * 60 / self.ratio
        return points[['v', 'j', 'cp', 'n', 'angle', 'eff', 'power']]

    def calculate_j(self, cp):
        return griddata(self.data_cp[['y', 'z']].values,
                        self.data_cp.x.values,
                        (self.angle, cp),
                        method='cubic', fill_value=0)

