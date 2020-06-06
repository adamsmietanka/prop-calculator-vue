import os

from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap

from forms import TextForm, RadioForm, SpecsForm
from calc import PropVariable, PropFixed
from commands import create_tables
from models import db

app = Flask(__name__)
Bootstrap(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.cli.add_command(create_tables)

db.init_app(app)


@app.route('/', methods=['POST', 'GET'])
def index():
    text = TextForm(request.form)
    radio = RadioForm(request.form)
    specs = SpecsForm(request.form)
    inputs = {'text': text, 'radio': radio, 'specs': specs}
    if request.method == 'POST':
        if text.validate() and specs.validate() and radio.blades.data in ['2', '3', '4']:
            prop = PropVariable(inputs) if radio.blade_type.data == 'var' else PropFixed(inputs)
            figs = [prop.draw_eff(), prop.draw_angle()]
            return render_template('calc.html',
                                   table=prop.data.to_html(classes=['table', 'table-striped'], header="true"),
                                   inputs=inputs,
                                   figs=figs)
        return render_template('error.html',
                               inputs=inputs)
    return render_template('index.html',
                           inputs=inputs)


if __name__ == '__main__':
    app.run()
