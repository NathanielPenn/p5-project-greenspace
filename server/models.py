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

    serialize_rules = ('-trails', '-gears', '-reviews.user_id','-reviews.trail_id', '-created_at')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    full_name = db.Column(db.String)
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())
    
    reviews = db.relationship('Review', backref='user')
    # trails = db.relationship('Trail', backref='user')

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

    serialize_only = ( 'id', 'name', 'location', 'state', 'distance', 'elevation', 'difficulty', 'review')
    # serialize_rules = ('-users', '-review', '-review.user._password_hash', '-review.user_id', '-created_at')

    # serialize_rules= ('-review', '-gear_id', '-users', '-reviews','-review.trails', '-review.user._password_hash','-review.user_id', '-created_at')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    location = db.Column(db.String)
    state = db.Column(db.String)
    distance = db.Column(db.Float)
    elevation = db.Column(db.Integer)
    difficulty = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())

    review = db.relationship('Review', backref='trail')
    gear_id = db.Column(db.Integer, db.ForeignKey("gears.id"))
    # review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))
    # checklist_id = db.Column(db.Integer, db.ForeignKey('checklists.id'))
    # checklist = db.relationship('Checklist', backref='trail')
    # def serialize(self, depth=1):
    #     return super().serialize(max_depth=depth)

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_only = ( 'id', 'title', 'review_text', 'rating', 'user_id', 'trail_id', 'user.username', 'trail.name')
    # serialize_rules = ('-users', '-trail.reviews', '-created_at', 'trail')

    # serialize_rules = ('-users', '-trails.review_id', '-trails.review', '-created_at','-trails' )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    review_text = db.Column(db.String)
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    # trails = db.relationship('Trail', backref='review')
    trail_id = db.Column(db.Integer, db.ForeignKey("trails.id"))

    @validates('rating')
    def validate_rating_col(self, key, rating):
        rating = int(rating)
        if not 1 <= rating <= 10:
            raise ValueError('Rating must be between 1 and 10')
        else:
            return rating
    
    def serialize(self, depth=1):
        return super().serialize(max_depth=depth)

class Gear(db.Model, SerializerMixin):
    __tablename__ = 'gears'

    serialize_rules = ('-trails', '-users', '-reviews', '-created_at')

    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())

    trails = db.relationship('Trail', backref='gear')



class Checklist(db.Model, SerializerMixin):
    __tablename__ = 'checklists'

    # serialize_rules = ('-')

    id = db.Column(db.Integer, primary_key=True)
    items = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())


