import pandas as pd
import numpy as np
import plotly
import json
import math

import plotly.graph_objects as go

from scipy.interpolate import interp1d
from calculator.models import DiameterData


class Diameter:
    def __init__(self, data):
        self.v_max = data['max_speed']
        self.v_prop = data['prop_speed']
        self.v_sound = data['sound_speed']
        self.cn = data['Cn']
        self.data = self.get_mesh()

    def get_mesh(self):
        query = DiameterData.query
        return pd.read_sql(query.statement, query.session.bind)

    def points(self):
        points = pd.DataFrame(self.data.blades.unique(), columns=['Type'])
        for blades in self.data.blades.unique():
            trace = self.data[self.data.blades == blades]
            y = interp1d(trace.x, trace.y, fill_value='extrapolate')
            points.loc[points.Type == blades, 'J'] = y(self.cn)
        points['Diameter'] = self.v_max / (points['J'] * self.v_prop)
        points['Mach'] = np.hypot(1.2 * self.v_max, math.pi * self.v_prop * points.Diameter) / self.v_sound
        return points.round(3).to_json(orient='records')

    def layout(self):
        title = {"text": "Maximum Efficiency Curves"}
        xaxis = {'title': {'text': 'Cn'}}
        yaxis = {'title': {'text': 'Advance Ratio (J)'}}
        return go.Layout(margin=dict(l=50, r=0, b=0, t=50),
                         width=500, height=400,
                         legend_title_text='Blades', title=title,
                         xaxis=xaxis, yaxis=yaxis)

    def draw(self):
        fig = go.Figure(layout=self.layout())
        for curve in self.data.blades.unique():
            trace = self.data[self.data.blades == curve]
            fig.add_trace(go.Scatter(x=trace.x, y=trace.y, mode='lines', name=curve))
        return fig

    def get_data(self):
        table = self.points()
        chart = self.draw()
        data = json.dumps({'table': {}, 'chart': chart}, cls=plotly.utils.PlotlyJSONEncoder)
        return data.replace('{}', table)
