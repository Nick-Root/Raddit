from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Community, Post, Comment, Upvote, User
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm

from flask_login import login_required, current_user
from datetime import datetime

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    posts_list = Post.query.order_by(Post.id.desc()).all()

    posts = []

    for post in posts_list:
        poster = User.query.get(post.ownerId).username
        community = Community.query.get(post.communityId)
        post_data = post.to_dict()
        post_data["poster"] = poster
        post_data["community"] = community

        posts.append(post_data)

    return jsonify(posts)

@post_routes.route('/<int:id>')
def get_post(id):
    post = Post.query.get(id)
    poster = User.query.get(post.ownerId).username
    comments = Comment.query.filter_by(postId=id).all()

    comment_data = [{
        "comment": comment.comment,
        "createdAt": comment.createdAt,
        "commentId": comment.id,
        "username": User.query.get(comment.ownerId).username,
        "ownerId": comment.userId
    } for comment in comments]

    post_data = post.to_dict()

    post_data["poster"] = poster

    return jsonify(post_data, comment_data)

@post_routes.route('/current')
def get_curr_posts():
    userId = current_user.id

    user = User.query.get(userId)
    posts = Post.query.filter_by(ownerId=userId).all()

    user_data = user.to_dict()

    post_data = [post.to_dict() for post in posts]

    return jsonify(user=user_data, posts=post_data)


@post_routes.route("/", methods=["POST"])
@login_required
def post_post():

    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_post = Post (
            title = form.data["title"],
            body = form.data["body"],
            ownerId = current_user.id,
            communityId = form.data["communityId"],
            createdAt = datetime.now(),
            updatedAt = datetime.now()
        )
        print("new_question", new_post)
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    else:
        print("Bad Data")
        return "Bad Data"

@post_routes.route("<int:id>", methods=["PUT"])
@login_required
def update_post(id):
    post = Post.query.get(id)

    if not post:
        return "Question does not exist"

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.title = form.data["title"]
        post.body = form.data["body"]
        post.ownerId = current_user.id
        post.communityId = form.data["communityId"]
        post.updatedAt = datetime.now()

        db.session.commit()
        return post.to_dict()
    else:
        print("Bad Data")
        return "Bad Data"


@post_routes.route('<int:id>', methods=['DELETE'])
def remove_question(id):
    post = Post.query.get(id)
    Comment.query.filter_by(postId=id).delete()
    if post:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Question removed successfully'})
    else:
        print("Question does not exist")

    return jsonify({'message': 'Question not found'})



@post_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def new_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(comment=form.data['comment'],
        ownerId=current_user.id,
        postId= id
        )
        db.session.add(comment)
        db.session.commit()
    return
