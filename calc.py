import pandas as pd
import numpy as np
from scipy.interpolate import griddata

from charts import Chart
from models import PropellerMesh


class Propeller:

    def __init__(self, text, radio, type_data):
        self.v_max = int(text.v_max.data)
        self.v_delta = int(text.v_delta.data)
        self.v_eng = text.v_eng.data
        self.ratio = text.reduction_ratio.data
        self.diameter = text.diameter.data
        self.blades_number = radio.blades.data
        self.angle = float(type_data.angle.data)
        self.cp = type_data.Cp.data
        self.v_cruise = type_data.v_cruise.data
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


class PropellerVariable(Propeller):

    def calculate(self):
        self.interpolate_angle()
        self.interpolate_eff()

    def draw_angle(self):
        chart = Chart(minified=self.min, points=self.data, cp=self.cp,
                      z_col='z_angle', z_title='Power', series_name='Angle')
        return chart.draw()


class PropellerFixed(Propeller):

    def calculate(self):
        j_cruise = self.v_cruise / (self.ratio * self.v_eng * self.diameter)
        cp_cruise = self.calculate_cp(adv_ratio=j_cruise)
        self.interpolate_cp()
        self.interpolate_eff()
        self.data['J/Jo'] = np.round(self.data.J / j_cruise, 3)
        self.data['n/no'] = np.round((cp_cruise / self.data.Cp) ** (1/2), 3)
        self.data['V_new'] = np.round(self.v_cruise * self.data['J/Jo'] * self.data['n/no'], 1)

    def calculate_cp(self, adv_ratio):
        cp = griddata(self.min[['x', 'y']].values,
                      self.min.z_angle.values,
                      (adv_ratio, self.angle),
                      method='linear', fill_value=0)
        return cp

    def draw_angle(self):
        chart = Chart(minified=self.min, points=self.data, cp=self.data.Cp,
                      z_col='z_angle', z_title='Power', series_name='Cp')
        return chart.draw()
