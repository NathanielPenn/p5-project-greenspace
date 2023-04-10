#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from faker.providers import  person, profile, internet, lorem   

# Local imports
from app import app
from models import db, Trail, User, Review, Gear

fake = Faker()
fake.add_provider(profile)
fake.add_provider(internet)
fake.add_provider(lorem)

def make_trail():
    Trail.query.delete()

    trails = [
        # Trail(name= "", location= "", state= "", distance= "", elevation = "", difficulty = "")
        Trail(name= "Rock Creek Valley Trail", location= "Rock Creek Park", state= "Maryland", distance= "10.8", elevation = "990", difficulty = "Moderate", review_id = randint(1,20)),
        Trail(name= "Abilene Dam Road Loop", location= "Abilene", state= "Texas", distance= "5.3", elevation = "183", difficulty = "Moderate"),
        Trail(name= "Baldy Peak", location= "Uncompahgre National Forest", state= "Colorado", distance= "6.2", elevation = "2122", difficulty = "Hard"),
        Trail(name= "Lower Antelope Canyon", location= "Lake Powell Navajo Tribal Park", state= "Arizona", distance= "0.6", elevation = "98", difficulty = "Easy"),
        Trail(name= "Devils Garden", location= "Arches National Park", state= "Utah", distance= "7.9", elevation = "1085", difficulty = "Hard"),
        Trail(name= "Kitchen Mesa Trail", location= "Ghost Ranch", state= "New Mexico", distance= "3.7", elevation = "718", difficulty = "Moderate"),
        Trail(name= "The Narrows", location= "Zion National Park", state= "Utah", distance= "16.1", elevation = "2076", difficulty = "Hard"),
        Trail(name= "Angels Landing Trail", location= "Zion National Park", state= "Utah", distance= "4.4", elevation = "1604", difficulty = "Hard"),
        Trail(name= "West Fork to Courthouse Mountain", location= "Uncompahgre National Forest", state= "Colorado", distance= "3.7", elevation = "1735", difficulty = "Hard"),
        Trail(name= "Ouray Perimeter Trail", location= "Uncompahgre Wilderness", state= "Colorado", distance= "6.0", elevation = "1512", difficulty = "Moderate"),
        Trail(name= "Prospect Park Loop", location= "Prospect Park", state= "New York", distance= "3.6", elevation = "157", difficulty = "Easy"),
        Trail(name= "Tremper Fire Tower Trail", location= "Phonecia", state= "New York", distance= "7.2", elevation = "1860", difficulty = "Moderate"),
        Trail(name= "Elk Pen Loop Trail", location= "Harriman State Park", state= "New York", distance= "7.5", elevation = "1525", difficulty = "Hard"),
        Trail(name= "Reeves Brook Loop Trail", location= "Harriman State Park", state= "New York", distance= "3.8", elevation = "872", difficulty = "Moderate")
    ]

    db.session.add_all(trails)
    db.session.commit()

def make_gear():
    Gear.query.delete()

    gear_obj = [
        # Gear(item= '', description= ''),
        Gear(item= 'Multi-Tool', description= 'Better to have it and not need it then need it and not have it.'),
        Gear(item= 'Pack', description= 'Important to carry all your equipment, sizes should range depending on length of trip.'),
        Gear(item= 'Moisture Wicking Clothes', description= 'Cotton leads to chaffing, chaffing leads to sadness, sadness leads to no more hiking.'),
        Gear(item= 'First-Aid Kit', description= 'No comment necessary.'),
        Gear(item= 'Map', description= 'Even with the best marked trails, a map is a must.'),
        Gear(item= 'Wide Brim Hat', description= 'Protect your neck.'),
        Gear(item= 'Sunscreen', description= 'Rain or shine, UV will get ya.'),
        Gear(item= 'Hiking Shoes', description= 'For when you dont need ankle support.'),
        Gear(item= 'Hiking Boots', description= 'Comfortable, broken in boots make everything better.'),
        Gear(item= 'Food', description= 'Keep your energy up, especially on long or multiday trips.'),
        Gear(item= 'Water', description= "Don't Forget to hydrate.")
    ]

    db.session.add_all(gear_obj)
    db.session.commit()


def make_user():
    
    User.query.delete()

    users_obj = []

    for i in range(10):
    
        user = User(
            username= fake.word(),
            full_name= fake.name(),   
        )

        user.password_hash = user.username + 'password'
        
        users_obj.append(user)
    
    db.session.add_all(users_obj)
    db.session.commit()

def make_review():
    Review.query.delete()

    reviews_obj = []

    for i in range(20):
        review = Review(
            title= fake.word(),
            review_text= fake.sentence(),
            rating= randint(1,10),
            user_id= randint(1,10),
            
            # trail_id= i
        )
        reviews_obj.append(review)

    db.session.add_all(reviews_obj)
    db.session.commit()



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        make_trail()
        make_gear()
        make_user()
        make_review()
        print('Seed Complete!')
