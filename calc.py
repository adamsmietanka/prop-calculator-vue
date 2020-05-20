import pandas as pd
import numpy as np
from scipy.interpolate import griddata

from charts import Chart
from models import PropellerMesh


class Propeller:

    def __init__(self, text, radio, type_data):
        self.cp = type_data.Cp.data
        self.min = self.get_mesh(blades_number=radio.blades.data)
        self.data = self.prepare_data(text=text, type_data=type_data)
        self.interpolate()

    def prepare_data(self, text, type_data):
        v_max = int(text.v_max.data)
        v_delta = int(text.v_delta.data)
        data = pd.DataFrame(np.linspace(0, v_max//v_delta*v_delta, v_max//v_delta+1), columns=['V'])
        v_eng = text.v_eng.data
        ratio = text.reduction_ratio.data
        diameter = text.diameter.data
        data['J'] = np.round(data.V / (v_eng * ratio * diameter), 3)
        data['Angle'] = float(type_data.angle.data)
        return data

    def get_mesh(self, blades_number):
        query = PropellerMesh.query.filter(PropellerMesh.blades == blades_number)
        return pd.read_sql(query.statement, query.session.bind)

    def draw_eff(self):
        chart = Chart(minified=self.min, points=self.data, cp=None,
                      z_col='z_eff', z_title='Eff', series_name='Efficiency')
        graph = chart.draw()
        return graph


class PropellerVariable(Propeller):

    def interpolate(self):
        angle = griddata(self.min[['x', 'z_angle']].values,
                         self.min.y.values,
                         (self.data.J, self.cp),
                         method='linear', fill_value=0)
        self.data['Angle'] = np.round(angle, 1)
        eff = griddata(self.min[['x', 'y']].values,
                       self.min.z_eff.values,
                       (self.data.J, self.data.Angle),
                       method='linear', fill_value=0)
        self.data['Eff'] = np.round(eff, 3)

    def draw_angle(self):
        chart = Chart(minified=self.min, points=self.data, cp=self.cp,
                      z_col='z_angle', z_title='Power', series_name='Angle')
        graph = chart.draw()
        return graph


class PropellerFixed(Propeller):

    def interpolate(self):
        eff = griddata(self.min[['x', 'y']].values,
                       self.min.z_eff.values,
                       (self.data.J, self.data.Angle),
                       method='linear', fill_value=0)
        self.data['Eff'] = np.round(eff, 3)
