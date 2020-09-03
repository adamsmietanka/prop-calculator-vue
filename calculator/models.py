from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Mesh(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    x = db.Column(db.Float)
    y = db.Column(db.Float)
    z = db.Column(db.Float)
    blades = db.Column(db.Integer)
    chart = db.Column(db.String)

    __table_args__ = {'extend_existing': True}


class DiameterData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    x = db.Column(db.Float)
    y = db.Column(db.Float)
    blades = db.Column(db.String)