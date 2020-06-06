import json
import numpy as np
import plotly
import plotly.graph_objects as go


class Chart:

    def __init__(self, minified, points, cp,  z_col, z_title, series_name):
        clean_data = minified[~((minified.x > 0.5) & (minified.z_eff == 0))]
        self.original = clean_data[clean_data.y.isin([15, 20, 25, 30, 35, 40, 45])]
        self.new_data = clean_data[~clean_data.y.isin([15, 20, 25, 30, 35, 40, 45])]
        self.points = points
        self.cp = cp
        self.z_col = z_col
        self.z_title = z_title
        self.series_name = series_name

    def get_layout(self):
        layout = go.Layout(
            scene=dict(
                xaxis_title='J',
                yaxis_title='Angle',
                zaxis_title=self.z_title),
            height=400,
            width=500,
            legend={'orientation': "h"},
            scene_camera=dict(
                eye=dict(x=1., y=-2, z=1.)
            ),
            margin=go.layout.Margin(
                l=0,
                r=0,
                b=0,
                t=0,
                pad=0
            )
        )
        return layout

    def draw(self):
        trace1 = go.Scatter3d(
            x=self.original['x'],
            y=self.original['y'],
            z=self.original[self.z_col],
            mode='markers',
            opacity=0.7,
            marker=dict(
                size=5,
            ),
            name='NACA'
        )
        trace2 = go.Scatter3d(
            x=self.new_data['x'],
            y=self.new_data['y'],
            z=self.new_data[self.z_col],
            mode='markers',
            opacity=0.3,
            marker=dict(
                size=4,
            ),
            name='Extrapolated',
        )
        points_z = self.get_points_z()
        trace3 = go.Scatter3d(
            x=self.points.J,
            y=self.points.Angle,
            z=points_z,
            mode='markers',
            marker=dict(
                size=5,
            ),
            name=self.series_name
        )
        layout = self.get_layout()
        fig = go.Figure(data=[trace1, trace2, trace3], layout=layout)
        graph_json = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
        return graph_json

    def get_points_z(self):
        if self.series_name is 'Angle':
            return np.repeat(self.cp, len(self.points))
        elif self.series_name is 'Cp':
            return self.points.Cp
        else:
            return self.points.Eff
