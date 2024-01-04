from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    c1 = Comment(
        ownerId=2, postId=1, comment='I honestly think that The Finals was a fantastic game. I just really enjoyed the fast paced take on competitive game modes that have been around for years. Overall just a great game in my eyes.'
    )
    c2 = Comment(
        ownerId=3, postId=3, comment='As a long time Ravens fan, I hope they keep this momentum and make it all the way!'
    )
    c3 = Comment(
        ownerId=1, postId=6, comment='The Xenon bulbs are amazing!! I have also been using them for a few years now and they are very reliable. No issues at all since I started using them!'
    )
    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
