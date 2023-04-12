from sqlalchemy.exc import IntegrityError
from flask_restful import Resource, Api
from flask import Flask, make_response, jsonify, request, session
# Local imports
from config import app, db, api
from models import User, Trail, Review, Gear, Checklist

# Views go here!

@app.route('/')
def index():
    return '<h1>GREENSPACE Backend</h1>'

class Trails(Resource):
    def get(self):
        trails = Trail.query.all()
        trails_dict = [trail.to_dict() for trail in trails]

        return make_response(
            jsonify(trails_dict),
            200
        )
api.add_resource(Trails, '/trails', endpoint= 'trails')

class TrailByID(Resource):
    def get(self, id):
        trail = Trail.query.filter_by(id=id).first()
        trail_dict = trail.to_dict()

        if not trail:
            return make_response(
                {"error": "Trail not found"}, 
                404
            )
        else:
            return make_response(
                jsonify(trail_dict),
                200
            )
api.add_resource(TrailByID, '/trails/<int:id>')

class Gears(Resource):
    def get(self):
        gears = Gear.query.all()
        gears_dict = [gear.to_dict() for gear in gears]

        return make_response(
            jsonify(gears_dict),
            200
        )
api.add_resource(Gears, '/gear', endpoint= 'gear')

class GearByID(Resource):
    def get(self, id):
        gear = Gear.query.filter_by(id=id).first()
        gear_dict = gear.to_dict()

        if not gear:
            return make_response(
                {"error": "Gear not found"}, 
                404
            )
        else:
            return make_response(
                jsonify(gear_dict),
                200
            )
api.add_resource(GearByID, '/gear/<int:id>')

class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()
        reviews_dict = [review.to_dict() for review in reviews]

        return make_response(
            jsonify(reviews_dict),
            200
        )

    def post(self):

        if session.get('user_id'):

            request_json = request.get_json()

            title = request_json['title']
            review_text = request_json['review_text']
            rating = request_json['rating']

            try:

                review = Review(
                    title=title,
                    review_text=review_text,
                    rating=rating,
                    user_id=session['user_id'],
                )

                db.session.add(review)
                db.session.commit()

                return review.to_dict(), 201

            except IntegrityError as ie:
                print(ie.orig)
                print(ie.statement)
                return {'error': '422 Unprocessable Entity'}, 422

        return {'error': '401 Unauthorized'}, 401

    def patch(self, id):

        data = request.get_json()

        review = Review.query.filter_by(id=id).first()

        for attr in data:
            setattr(review, attr, data[attr])

        db.session.add(review)
        db.session.commit()

        return make_response(review.to_dict(), 200)

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            return make_response(
                jsonify({'error': 'Review not found'}),
                404
            )
        db.session.delete(review)
        db.session.commit()

        return make_response(
            jsonify({'message': 'Review successfully deleted', 'id':id}),
            200
        )
        
api.add_resource(Reviews, '/reviews')

class ReviewByID(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        review_dict = review.to_dict()

        if not review:
            return make_response(
                {"error": "review not found"}, 
                404
            )
        else:
            return make_response(
                jsonify(review_dict),
                200
            )

    def patch(self, id):

        data = request.get_json()

        review = Review.query.filter_by(id=id).first()

        for attr in data:
            setattr(review, attr, data[attr])

        db.session.add(review)
        db.session.commit()

        return make_response(review.to_dict(), 200)

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            return make_response(
                jsonify({'error': 'Review not found'}),
                404
            )
        db.session.delete(review)
        db.session.commit()

        return make_response(
            jsonify({'message': 'Review successfully deleted', 'id':id}),
            200
        )
    
api.add_resource(ReviewByID, '/reviews/<int:id>')

class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')
        full_name = request_json.get('full_name')
        image_url = request_json.get('image_url')
        
        

        user = User(
            username=username,
            full_name=full_name,
            image_url=image_url
        )

        # the setter will encrypt this
        user.password_hash = password

        print('first')

        try:

            print('here!')

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            print(user.to_dict())

            return user.to_dict(), 201

        except IntegrityError as ie:
            print(ie.orig)
            print(ie.statement)
            return {'error': '422 Unprocessable Entity'}, 422
api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    
    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401        # need to add ? on the front end
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
