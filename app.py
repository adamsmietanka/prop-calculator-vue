from flask import Flask, render_template, request, flash
from forms import TextForm, RadioForm, TypeDataForm
from calc import PropellerVariable, PropellerFixed
from flask_bootstrap import Bootstrap
import os
from commands import create_tables

from models import db

app = Flask(__name__)
Bootstrap(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
db.init_app(app)

app.cli.add_command(create_tables)


@app.route('/', methods=['POST', 'GET'])
def index():
    type_data = TypeDataForm(request.form)
    text_inputs = TextForm(request.form)
    radio_inputs = RadioForm(request.form)
    if request.method == 'POST':
        if text_inputs.validate() and type_data.validate() and radio_inputs.blades.data in ['2', '3', '4']:
            if radio_inputs.blade_type.data == 'var':
                prop = PropellerVariable(text=text_inputs,
                                         radio=radio_inputs,
                                         type_data=type_data)
            else:
                prop = PropellerFixed(text=text_inputs,
                                      radio=radio_inputs,
                                      type_data=type_data)
            figs = [(prop.draw_eff(), 'scatter1'), (prop.draw_angle(), 'scatter2')]
            return render_template('calc.html',
                                   table=prop.data.to_html(classes=['table', 'table-striped'], header="true"),
                                   type_data=type_data,
                                   text=text_inputs,
                                   radio=radio_inputs,
                                   figs=figs)
        else:
            return render_template('error.html',
                                   type_data=type_data,
                                   text=text_inputs,
                                   radio=radio_inputs)
    else:
        return render_template('index.html',
                               type_data=type_data,
                               text=text_inputs,
                               radio=radio_inputs)


if __name__ == '__main__':
    app.run()
