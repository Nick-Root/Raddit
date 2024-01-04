from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    games1post = Post(
        title='What do you guys think was the best game of 2023?', body='Personally, I think that csgo/cs2 was the best game of 2023. My opinion is a little bias because I have been playing the counterstrike series for years on end. It is always the most played game on steam though, so I have to wonder, what other games were really popular this year?', ownerId=1, communityId=1
    )
    games2post = Post(
        title='Are the bosses in Elden Ring always this hard??', body='Im currently stuck on Rykard, Lord of Blasphemy in Elden Ring. Any tips on beating him? So far this game has been extrodinarily difficult. Starting to consider whether or not I can actually do this hahaha', ownerId=2, communityId=1
    )
    sports1post = Post(
        title='Any superbowl predictions for this year?', body='Looks like as of now the 49ers are definitely taking a spot this year, however, the Ravens are starting to close the gap after that big win over Miami. Who do yall think got that second spot', ownerId=2, communityId=2
    )
    sports2post = Post(
        title='Oklahoma City Thunder going crazzyyy', body='Thunder just pulled some wins over the Timberwolves, Nuggets, and Celtics. What are your guys thoughts as they head out of their four-game road trip this week?', ownerId=3, communityId=2
    )
    cars1post = Post(
        title='What is your dream car?', body='No limits, anything you want, any modifications, what car would you get? There so many different options and combinations. Just want to see some of the Communitys thoughts and interests.', ownerId=3, communityId=3
    )
    cars2post = Post(
        title='Best headlight bulbs', body='For the past couple years I have been using Xenon headlight bulbs and they work wonders at night. Its practically like driving in sunlight. Dont even get me started on the highbeams too', ownerId=2, communityId=3
    )
    db.session.add(games1post)
    db.session.add(games2post)
    db.session.add(sports1post)
    db.session.add(sports2post)
    db.session.add(cars1post)
    db.session.add(cars2post)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
