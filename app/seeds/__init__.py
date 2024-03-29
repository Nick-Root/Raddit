from flask.cli import AppGroup
from .users import seed_users, undo_users
from .communities import seed_communities, undo_communities
from .posts import seed_posts, undo_posts
from .upvotes import seed_upvotes, undo_upvotes
from .comments import seed_comments, undo_comments
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        # undo_users()
        # undo_communities()
        # undo_posts()
        db.session.commit()
        # undo_upvotes()
        # undo_comments()
    seed_users()
    seed_communities()
    seed_posts()
    seed_comments()
    # seed_upvotes()
    # seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_communities()
    undo_posts()
    undo_users()
    # undo_upvotes()
    # undo_comments()
    # Add other undo functions here
