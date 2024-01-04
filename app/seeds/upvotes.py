from app.models import db, Upvote, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_upvotes():
    u1 = Upvote(userId=1, postId=1)
    u2 = Upvote(userId=2, postId=1)
    u3 = Upvote(userId=3, postId=1)
    u4 = Upvote(userId=1, postId=2)
    u5 = Upvote(userId=3, postId=2)
    u6 = Upvote(userId=1, postId=3)


    db.session.add(u1)
    db.session.add(u2)
    db.session.add(u3)
    db.session.add(u4)
    db.session.add(u5)
    db.session.add(u6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_upvotes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.upvotes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM upvotes"))

    db.session.commit()
