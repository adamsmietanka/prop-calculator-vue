import plotly.graph_objects as go


class Chart:

    def __init__(self, data, points, z_col):
        self.z_col = z_col
        data = data.drop_duplicates(subset=['x', 'y'])
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
            reversescale=True,
            hovertemplate=
            '<b>J</b>: %{x}<br>' +
            '<b>Angle</b>: %{y}°<br>' +
            '<b>{}</b>: '.format(self.z_col.capitalize()) +
            '%{z}<extra></extra>',
        )
        trace2 = go.Scatter3d(
            x=self.points.j,
            y=self.points.angle,
            z=self.points[self.z_col],
            opacity=0.9,
            marker=dict(
                size=6,
                color=['#0275d8' for i in self.points.j],
            ),
            line=dict(
                color='#0275d8'
            ),
            hovertemplate=
            '<b>J</b>: %{x}<br>' +
            '<b>Angle</b>: %{y}°<br>' +
            '<b>{}</b>: '.format(self.z_col.capitalize()) +
            '%{z}<extra></extra>',
        )
        fig = go.Figure(data=[trace1, trace2])
        return fig
