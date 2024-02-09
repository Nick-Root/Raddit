from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Community, Post, Comment, Upvote, User
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from .awsupload import upload_file_to_s3, remove_file_from_s3

from flask_login import login_required, current_user
from datetime import datetime

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    posts_list = Post.query.order_by(Post.id.desc()).all()

    posts = []

    for post in posts_list:
        poster = User.query.get(post.ownerId).username
        community = Community.query.get(post.communityId).to_dict()
        post_data = post.to_dict()
        post_data["poster"] = poster
        post_data["community"] = community


        posts.append(post_data)

    return jsonify(posts)

@post_routes.route('/<int:id>')
def get_post(id):
    post = Post.query.get(id)
    poster = User.query.get(post.ownerId).username
    community = Community.query.get(post.communityId)
    comments = Comment.query.filter_by(postId=id).all()


    post_data = post.to_dict()

    post_data["poster"] = poster
    post_data["community"] = community.community


    return jsonify(post_data)

@post_routes.route('/current')
def get_curr_posts():
    userId = current_user.id

    user = User.query.get(userId)
    posts = Post.query.filter_by(ownerId=userId).all()

    user_data = user.to_dict()

    post_data = []

    for post in posts:
        poster = User.query.get(post.ownerId).username
        community = Community.query.get(post.communityId).to_dict()
        post_dict = post.to_dict()
        post_dict["poster"] = poster
        post_dict["community"] = community
        post_data.append(post_dict)

    return jsonify(user=user_data, posts=post_data)

@post_routes.route("/new", methods=["POST"])
@login_required
def post_post():

    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_post = Post (
            title = form.data["title"],
            body = form.data["body"],
            communityId = form.data["communityId"],
            ownerId = current_user.id,
            createdAt = datetime.now(),
            updatedAt = datetime.now()
        )
        if form.imageUrl.data:
            result = upload_file_to_s3(form.imageUrl.data)
            if "url" in result:
                new_post.imageUrl = result["url"]


        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    else:

        return "Bad Data"

@post_routes.route("<int:id>", methods=["PUT"])
@login_required
def update_post(id):
    post = Post.query.get(id)

    if not post:
        return "Post does not exist"

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if post.imageUrl and form.imageUrl.data:
            remove_file_from_s3(post.imageUrl)

        post.title = form.data["title"]
        post.body = form.data["body"]
        post.ownerId = current_user.id
        post.communityId = form.data["communityId"]
        post.updatedAt = datetime.now()

        if form.imageUrl.data:
            result = upload_file_to_s3(form.imageUrl.data)
            if "url" in result:
                post.imageUrl = result["url"]
            else:
                return jsonify(errors=result["errors"])

        db.session.commit()
        return post.to_dict()
    else:
        return "Bad Data"


@post_routes.route('<int:id>', methods=['DELETE'])
def remove_post(id):
    post = Post.query.get(id)
    Comment.query.filter_by(postId=id).delete()
    if post:
        if post.imageUrl:
            remove_file_from_s3(post.imageUrl)

        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post removed successfully'})
    else:
        print("Post does not exist")

    return jsonify({'message': 'Post not found'})



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
    return jsonify(comment.to_dict())
