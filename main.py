import os
import json

from flask import Flask, request, jsonify
from flask_bootstrap import Bootstrap
from flask_cors import CORS

from calculator.forms import TextForm, RadioForm, SpecsForm
from calculator.prop import PropVariable, PropFixed

from calculator.commands import create_tables
from calculator.models import db

app = Flask(__name__)
Bootstrap(app)
CORS(app, resources={r'/*': {'origins': '*'}})

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.cli.add_command(create_tables)

db.init_app(app)


def get_inputs(req):
    text = TextForm(req.form)
    radio = RadioForm(req.form)
    specs = SpecsForm(req.form)
    return {'text': text, 'radio': radio, 'specs': specs}


def valid_inputs(inputs):
    validated = inputs['text'].validate() and inputs['specs'].validate()
    blades_number = inputs['radio'].blades.data in ['2', '3', '4']
    return validated and blades_number


@app.route('/test', methods=['POST'])
def test():
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    prop = PropVariable(data)
    return prop.get_data()


@app.route('/prop-data', methods=['POST'])
def prop_data():
    inputs = get_inputs(request)
    if valid_inputs(inputs):
        prop_type = inputs['radio'].blade_type.data
        prop = PropVariable(inputs) if prop_type == 'var' else PropFixed(inputs)
        return prop.get_data()
    return jsonify(error="Data is not valid!")


if __name__ == '__main__':
    app.run()
