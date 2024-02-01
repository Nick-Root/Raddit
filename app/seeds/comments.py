from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    c1 = Comment(
        ownerId=2, postId=1, comment='I honestly think that The Finals was a fantastic game. I just really enjoyed the fast-paced take on competitive game modes that have been around for years. Overall just a great game in my eyes.'
    )
    c2 = Comment(
        ownerId=3, postId=3, comment='As a long-time Ravens fan, I hope they keep this momentum and make it all the way!'
    )
    c3 = Comment(
        ownerId=1, postId=6, comment='The Xenon bulbs are amazing!! I have also been using them for a few years now and they are very reliable. No issues at all since I started using them!'
    )
    c4 = Comment(
        ownerId=4, postId=2, comment='Elden Ring bosses can be tough, but it makes the victory even sweeter! For Rykard, try focusing on dodging his attacks and finding openings for counter-attacks.'
    )
    c5 = Comment(
        ownerId=5, postId=4, comment='The Thunder\'s recent performance has been outstanding! Can\'t wait to see how they continue on their road trip. Do you think they have a shot at the playoffs this season?'
    )
    c6 = Comment(
        ownerId=2, postId=5, comment='Dream car? Definitely a fully customized Tesla Model S. The electric power combined with cutting-edge tech is a game-changer!'
    )
    c7 = Comment(
        ownerId=3, postId=8, comment='Python is indeed versatile! I love its readability and the vast ecosystem of libraries. Anyone else here a fan of more niche languages like Rust or Kotlin?'
    )
    c8 = Comment(
        ownerId=4, postId=10, comment='Just finished the latest bestseller. It was a rollercoaster of emotions! I won\'t spoil anything, but the plot twists were unexpected.'
    )
    c9 = Comment(
        ownerId=5, postId=12, comment='Those homemade biscuits look delicious! Does anyone have a foolproof recipe to share? I\'m always on the lookout for new baking ideas.'
    )
    c10 = Comment(
        ownerId=6, postId=14, comment='Share your unforgettable travel experiences! I once hiked to Machu Picchu, and the view from the top was absolutely breathtaking.'
    )
    c11 = Comment(
        ownerId=1, postId=16, comment='I recently discovered a new music genre called lo-fi chillhop, and it\'s perfect for relaxing. Any other genre recommendations?'
    )
    c12 = Comment(
        ownerId=2, postId=18, comment='Favorite workout routine? I\'m a fan of high-intensity interval training (HIIT). Keeps things challenging and time-efficient!'
    )
    c13 = Comment(
        ownerId=3, postId=20, comment='The art projects shared here are so inspiring! I wish I had half the talent some of you showcase.'
    )

    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.add(c6)
    db.session.add(c7)
    db.session.add(c8)
    db.session.add(c9)
    db.session.add(c10)
    db.session.add(c11)
    db.session.add(c12)
    db.session.add(c13)

    # Add more comments as needed

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
