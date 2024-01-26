from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    games1post = Post(
        title='What do you guys think was the best game of 2023?', imageUrl='https://radditbucket.s3.amazonaws.com/cs2.jpg', body='I think that csgo/cs2 was the best game of 2023. My opinion is a little bias because I have been playing the counterstrike series for years on end. It is always the most played game on steam though, what other games were really popular this year?', ownerId=1, communityId=1
    )
    games2post = Post(
        title='Are the bosses in Elden Ring always this hard??', imageUrl='https://radditbucket.s3.amazonaws.com/eldenring.jpg', body='Im currently stuck on Rykard, Lord of Blasphemy in Elden Ring. Any tips on beating him? So far this game has been extrodinarily difficult. Starting to consider whether or not I can actually do this hahaha', ownerId=2, communityId=1
    )
    sports1post = Post(
        title='Any superbowl predictions for this year?', imageUrl='https://radditbucket.s3.amazonaws.com/superbowl.jpg', body='Looks like as of now the 49ers are definitely taking a spot this year, however, the Ravens are starting to close the gap after that big win over Miami. Who do yall think got that second spot', ownerId=2, communityId=2
    )
    sports2post = Post(
        title='Oklahoma City Thunder going crazzyyy', imageUrl='https://radditbucket.s3.amazonaws.com/oklahomact.jpg', body='Thunder just pulled some wins over the Timberwolves, Nuggets, and Celtics. What are your guys thoughts as they head out of their four-game road trip this week?', ownerId=3, communityId=2
    )
    cars1post = Post(
        title='What is your dream car?', imageUrl='https://radditbucket.s3.amazonaws.com/carnice.webp', body='No limits, anything you want, any modifications, what car would you get? There so many different options and combinations. Just want to see some of the Communitys thoughts and interests.', ownerId=3, communityId=3
    )
    cars2post = Post(
        title='Best headlight bulbs', imageUrl='https://radditbucket.s3.amazonaws.com/xenon.jpg', body='For the past couple years I have been using Xenon headlight bulbs and they work wonders at night. Its practically like driving in sunlight. Dont even get me started on the highbeams too', ownerId=2, communityId=3
    )
    tech1post = Post(
        title='Favorite programming language and why?', imageUrl='https://radditbucket.s3.amazonaws.com/programming-languages.jpg', body='As a tech enthusiast, I always find it interesting to know what programming languages people prefer and why. Personally, I\'m a fan of Python for its simplicity and versatility. What about you?', ownerId=4, communityId=4
    )
    tech2post = Post(
        title='Latest tech gadgets you can\'t live without', imageUrl='https://radditbucket.s3.amazonaws.com/gadgets.jpg', body='In a world filled with amazing tech gadgets, which ones are your absolute must-haves? Whether it\'s a smartphone, smartwatch, or any other gadget, share your tech essentials with the community!', ownerId=5, communityId=4
    )
    books1post = Post(
        title='Book recommendations for a cozy weekend', imageUrl='https://radditbucket.s3.amazonaws.com/books.jpg', body='Looking for some great book recommendations to curl up with this weekend. Share your favorite reads or ask for suggestions from fellow book lovers in the community!', ownerId=6, communityId=5
    )
    books2post = Post(
        title='Thoughts on the latest bestseller?', imageUrl='https://radditbucket.s3.amazonaws.com/bestsellers.png', body='Just finished reading the latest bestseller, and I\'m curious to hear what others thought about it. Did it live up to the hype? Let\'s discuss!', ownerId=1, communityId=5
    )
    food1post = Post(
        title='Favorite homemade recipes', imageUrl='https://radditbucket.s3.amazonaws.com/homemadebiscuits.jpg', body='Let\'s share our favorite homemade recipes! Whether it\'s a delicious main course, dessert, or snack, I\'m excited to discover new culinary delights from the Foodies community.', ownerId=2, communityId=6
    )
    food2post = Post(
        title='Best local eateries in town', imageUrl='https://radditbucket.s3.amazonaws.com/localeatery.jpg', body='Exploring the local food scene? Share your favorite eateries, hidden gems, and must-try dishes in our community. Let\'s create a guide for fellow food enthusiasts!', ownerId=3, communityId=6
    )
    travel1post = Post(
        title='Unforgettable travel experiences', imageUrl='https://radditbucket.s3.amazonaws.com/travelexp.jpg', body='Share your most unforgettable travel experiences and the stories behind them. Whether its a breathtaking destination or a unique cultural encounter, let\'s inspire each other to explore the world!', ownerId=4, communityId=7
    )
    travel2post = Post(
        title='Travel tips for first-time adventurers', imageUrl='https://radditbucket.s3.amazonaws.com/traveltips.jpg', body='Planning your first big adventure? Seek advice and tips from seasoned travelers in the community. Share your questions and experiences to make your journey even more memorable!', ownerId=5, communityId=7
    )
    music1post = Post(
        title='Discovering new music genres', imageUrl='https://radditbucket.s3.amazonaws.com/genres.jpg', body='Let\'s broaden our musical horizons! Share your favorite genres, artists, and recent discoveries. Who knows, you might introduce someone to their new favorite song!', ownerId=6, communityId=8
    )
    music2post = Post(
        title='Concert experiences worth sharing', imageUrl='https://radditbucket.s3.amazonaws.com/concerrt.jpg', body='Attended an unforgettable concert recently? Share your experiences, favorite performances, and any memorable moments from the live music scene. Let the Music community relive the excitement!', ownerId=1, communityId=8
    )
    fitness1post = Post(
        title='Favorite workout routines', imageUrl='https://radditbucket.s3.amazonaws.com/routineworkout.jpg', body='Whether it\'s cardio, strength training, or yoga, share your favorite workout routines and tips for staying fit. Let\'s motivate each other to achieve our fitness goals!', ownerId=2, communityId=9
    )
    fitness2post = Post(
        title='Nutrition tips for a healthy lifestyle', imageUrl='https://radditbucket.s3.amazonaws.com/nutritoin.jpg', body='Discuss nutrition tips, healthy recipes, and dietary advice to support a balanced and healthy lifestyle. Join the conversation and contribute to the Fitness community!', ownerId=3, communityId=9
    )
    art1post = Post(
        title='Showcasing your latest art projects', imageUrl='https://radditbucket.s3.amazonaws.com/art1.jpg',  body='Artists unite! Share your latest art projects, whether its drawings, paintings, or digital creations. Lets celebrate creativity and inspire each other in the Art community.', ownerId=4, communityId=10
    )
    art2post = Post(
        title='Favorite art supplies and tools', imageUrl='https://radditbucket.s3.amazonaws.com/artstuff.jpg', body='What are your go-to art supplies and tools? Whether its a specific brand of paints, brushes, or digital tools, share your recommendations with fellow artists in the community!', ownerId=5, communityId=10
    )

    db.session.add(games1post)
    db.session.add(games2post)
    db.session.add(sports1post)
    db.session.add(sports2post)
    db.session.add(cars1post)
    db.session.add(cars2post)
    db.session.add(tech1post)
    db.session.add(tech2post)
    db.session.add(books1post)
    db.session.add(books2post)
    db.session.add(food1post)
    db.session.add(food2post)
    db.session.add(travel1post)
    db.session.add(travel2post)
    db.session.add(music1post)
    db.session.add(music2post)
    db.session.add(fitness1post)
    db.session.add(fitness2post)
    db.session.add(art1post)
    db.session.add(art2post)
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
