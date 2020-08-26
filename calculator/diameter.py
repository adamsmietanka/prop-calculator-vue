import pandas as pd
import numpy as np
import plotly
import json
import math

import plotly.graph_objects as go

from scipy.interpolate import interp1d


class Diameter:
    def __init__(self, data):
        self.v_max = data['max_speed']
        self.v_prop = data['prop_speed']
        self.v_sound = data['sound_speed']
        self.cn = data['Cn']
        self.data = pd.read_csv(r'calculator/diameter.csv')

    def points(self):
        points = pd.DataFrame(self.data.columns[1:], columns=['Type'])
        for i in points.Type:
            j = interp1d(self.data.x, self.data[i])
            points.loc[points.Type == i, 'J'] = j(self.cn)
        points['Diameter'] = self.v_max / (points['J'] * self.v_prop)
        points['Mach'] = np.hypot(1.2 * self.v_max, math.pi * self.v_prop * points.Diameter) / self.v_sound
        return points.round(3).to_json(orient='records')

    def layout(self):
        title = {"text": "Maximum Efficiency Curves"}
        xaxis = {'title': {'text': 'Cn'}}
        yaxis = {'title': {'text': 'Advance Ratio (J)'}}
        return go.Layout(margin=dict(l=50, r=0, b=0, t=50),
                         width=500, height=400,
                         legend_title_text='Data', title=title,
                         xaxis=xaxis, yaxis=yaxis)

    def draw(self):
        fig = go.Figure()
        for col in self.data.columns[1:]:
            fig.add_trace(go.Scatter(x=self.data.x, y=self.data[col], mode='lines', name=col))
        fig.update_layout(self.layout())
        return fig

    def get_data(self):
        table = self.points()
        chart = self.draw()
        data = json.dumps({'table': {}, 'chart': chart}, cls=plotly.utils.PlotlyJSONEncoder)
        return data.replace('{}', table)
