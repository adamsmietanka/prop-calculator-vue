from wtforms import Form, FloatField, RadioField, validators


class TypeDataForm(Form):
    Cp = FloatField(
        label='Coefficient of power (-)', default=0.1,
        validators=[validators.InputRequired()])
    angle = FloatField(
        label='Propeller pitch (°)', default=30,
        validators=[validators.InputRequired()])


class TextForm(Form):
    v_max = FloatField(
        label='Max airspeed (m/s)', default=150,
        validators=[validators.InputRequired()])
    v_delta = FloatField(
        label='Speed step size (m/s)', default=10,
        validators=[validators.InputRequired()])
    v_eng = FloatField(
        label='Engine speed (1/s)', default=50,
        validators=[validators.InputRequired()])
    reduction_ratio = FloatField(
        label='Gear reduction ratio (-)', default=0.5,
        validators=[validators.InputRequired()])
    diameter = FloatField(
        label='Prop diameter (m)', default=3.5,
        validators=[validators.InputRequired()])


class RadioForm(Form):
    blades = RadioField(label='Number of blades',
                        choices=[(2, 2), (3, 3), (4, 4)],
                        default=2)
    blade_type = RadioField(label='Blade pitch',
                            choices=[('var', 'Variable'), ('fix', 'Fixed')],
                            default='var')

