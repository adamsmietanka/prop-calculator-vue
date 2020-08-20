import plotly.graph_objects as go


class Chart:

    def __init__(self, data, points, z_col):
        self.z_col = z_col
        self.data = data.pivot(index='y', columns='x', values='z')
        self.points = points

    def draw(self):
        trace1 = go.Surface(
            z=self.data.values,
            x=self.data.columns,
            y=self.data.index,
            showscale=False,
            colorscale='algae',
            opacity=0.9,
        )
        trace2 = go.Scatter3d(
            x=self.points.J,
            y=self.points.Angle,
            z=self.points[self.z_col],
            # mode='markers',
            opacity=0.9,
            marker=dict(
                size=5,
                color='aliceblue',
            ),
        )
        fig = go.Figure(data=[trace1, trace2])
        return fig
