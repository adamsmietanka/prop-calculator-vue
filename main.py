import os
import json

from flask import Flask, request
from flask_bootstrap import Bootstrap
from flask_cors import CORS

from calculator.diameter import Diameter
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


@app.route('/data', methods=['POST'])
def test():
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    propeller = PropVariable(data)
    return propeller.get_data()


@app.route('/prop', methods=['POST'])
def prop():
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    diameter = Diameter(data)
    return diameter.get_data()


if __name__ == '__main__':
    app.run()
