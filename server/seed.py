#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from faker.providers import  person, profile, internet   

# Local imports
from app import app
from models import db, Trail, User

fake = Faker()
fake.add_provider(profile)
fake.add_provider(internet)

def make_trail():
    Trail.query.delete()

    trails = [
        # Trail(name= "", location= "", state= "", distance= "", elevation = "", difficulty = "")
        Trail(name= "Rock Creek Valley Trail", location= "Rock Creek Park", state= "Maryland", distance= "10.8", elevation = "990", difficulty = "Moderate"),
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

# def make_gear():
#     Gear.query.delete()

#     gear_obj = [
#         Gear()
#     ]

def make_user():
    
    User.query.delete()

    users_obj = []

    for i in range(10):
    # for i in range(10):
    
        user = User(
            # password= randint(1,23),
            username= fake.email(),
            full_name= fake.name(),   
        )

        user.password_hash = user.username + 'password'
        
        users_obj.append(user)
    
    db.session.add_all(users_obj)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        make_trail()
        make_user()
