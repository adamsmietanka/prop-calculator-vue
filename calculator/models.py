from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class PropellerMesh(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    x = db.Column(db.Float)
    y = db.Column(db.Float)
    z_angle = db.Column(db.Float)
    z_eff = db.Column(db.Float)
    blades = db.Column(db.Integer)

    __table_args__ = {'extend_existing': True}