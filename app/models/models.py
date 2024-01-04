from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    posts = db.relationship('Post', back_populates='owner')
    communities = db.relationship('Community', back_populates='owner')
    comments = db.relationship('Comment', back_populates='owner')
    upvotes = db.relationship('Upvote', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email
        }

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    communityId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now(), onupdate=datetime.now())

    owner = db.relationship('User', back_populates='posts')
    communityId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)
    community = db.relationship('Community', back_populates='posts', foreign_keys=[communityId])
    comments = db.relationship('Comment', back_populates='post')
    upvotes = db.relationship('Upvote', back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'title': self.title,
            'body': self.body,
            'communityId': self.communityId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

class Community(db.Model):
    __tablename__ = 'communities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    community = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)

    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    owner = db.relationship('User', back_populates='communities')
    posts = db.relationship('Post', back_populates='community', foreign_keys=[Post.communityId])

    def to_dict(self):
        return {
            'id': self.id,
            'community': self.community,
            'description': self.description,
            'ownerId': self.ownerId
        }

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now(), onupdate=datetime.now())

    owner = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'postId': self.postId,
            'comment': self.comment,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

class Upvote(db.Model):
    __tablename__ = 'upvotes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)

    user = db.relationship('User', back_populates='upvotes')
    post = db.relationship('Post', back_populates='upvotes')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postId': self.postId
        }
