from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__= "users"

    # serialize_rules = ('-')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    full_name = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Trail(db.Model, SerializerMixin):
    __tablename__ = 'trails'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    location = db.Column(db.String)
    state = db.Column(db.String)
    distance = db.Column(db.Float)
    elevation = db.Column(db.Integer)
    difficulty = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())

    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))
    gear_id = db.Column(db.Integer, db.ForeignKey("gears.id"))

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    # serialize_rules = ('-')

    id = db.Column(db.Integer, primary_key=True)
    review_text = db.Column(db.String)
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    trail_id = db.Column(db.Integer, db.ForeignKey("trails.id"))

class Gear(db.Model, SerializerMixin):
    __tablename__ = 'gears'

    # serialize_rules = ('-')

    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String)
    # type = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())

class Checklist(db.Model, SerializerMixin):
    __tablename__ = 'checklists'

    # serialize_rules = ('-')

    id = db.Column(db.Integer, primary_key=True)
    items = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())
