import os
import json
from flask import Flask, current_app, send_file, request
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv

from calculator.diameter import Diameter
from calculator.prop import PropVariable, PropFixed
from calculator.models import db

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='../dist/static')


class Config(object):
    # If not set fall back to production for safety
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')
    # Set FLASK_SECRET on your production Environment
    SECRET_KEY = os.getenv('FLASK_SECRET', 'Secret')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    APP_DIR = os.path.dirname(__file__)
    ROOT_DIR = os.path.dirname(APP_DIR)
    DIST_DIR = os.path.join(ROOT_DIR, 'dist')

    if not os.path.exists(DIST_DIR):
        raise Exception(
            'DIST_DIR not found: {}'.format(DIST_DIR))


app.config.from_object('calculator.Config')
CORS(app, resources={r'/api/*': {'origins': '*'}})

db.init_app(app)

app.logger.info('>>> {}'.format(Config.FLASK_ENV))


@app.route('/api/data', methods=['POST'])
def test():
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    propeller = PropVariable(data) if data['pitch'] == 'Variable' else PropFixed(data)
    return propeller.get_data()


@app.route('/api/prop', methods=['POST'])
def prop():
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    diam = Diameter(data)
    return diam.get_data()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index_client(path):
    dist_dir = current_app.config['DIST_DIR']
    entry = os.path.join(dist_dir, 'index.html')
    return send_file(entry)
