# from wtforms.fields.html5 import DecimalField
from wtforms import Form, RadioField, FloatField
from wtforms.validators import DataRequired, NumberRange


class TypeDataForm(Form):
    Cp = FloatField(
        label='Coefficient of power (-)', default=0.1,
        validators=[DataRequired(), NumberRange(0.05, 0.3)])
    angle = FloatField(
        label='Propeller pitch (°)', default=30,
        validators=[DataRequired(), NumberRange(15, 50)])


class TextForm(Form):
    v_max = FloatField(
        label='Max airspeed (m/s)', default=150,
        validators=[DataRequired(), NumberRange(0, 300)])
    v_delta = FloatField(
        label='Speed step size (m/s)', default=10,
        validators=[DataRequired(), NumberRange(0, 100)])
    v_eng = FloatField(
        label='Engine speed (1/s)', default=50,
        validators=[DataRequired(), NumberRange(0, 200)])
    reduction_ratio = FloatField(
        label='Gear reduction ratio (-)', default=0.5,
        validators=[DataRequired(), NumberRange(0, 2)])
    diameter = FloatField(
        label='Prop diameter (m)', default=3.5,
        validators=[DataRequired(), NumberRange(0, 5)])


class RadioForm(Form):
    blades = RadioField(label='Number of blades',
                        choices=[(2, 2), (3, 3), (4, 4)],
                        default=2)
    blade_type = RadioField(label='Blade pitch',
                            choices=[('var', 'Variable'), ('fix', 'Fixed')],
                            default='var')

