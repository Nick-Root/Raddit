from app.models import db, Community, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_communities():
    games = Community(
        ownerId=1, community='Games', description='A place where gamers convene')
    sports = Community(
        ownerId=2, community='Sports', description='Talk everything sports to your hearts content')
    cars = Community(
        ownerId=3, community='Cars', description='Build em, break em, fix em. Anything and everything cars')

    db.session.add(games)
    db.session.add(sports)
    db.session.add(cars)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_communities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM communities"))

    db.session.commit()
