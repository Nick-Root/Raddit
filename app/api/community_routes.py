from flask import Blueprint, jsonify, request, redirect
from ..models import db
from ..models.models import Community, Post, Comment, Upvote
from ..forms.community_form import CommunityForm
from flask_login import login_required, current_user
community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def get_comms():
    communities = Community.query.all()
    community_names  = [community.community for community in communities]

    return community_names

@community_routes.route('/<int:id>')
def get_community(id):
    community = Community.query.get(id)

    community_data = []
    data = community.to_dict()
    posts = Post.query.filter_by(communityId = community.id).all()
    data['posts']=[post.to_dict() for post in posts]
    community_data.append(data)

    return community_data

@community_routes.route('/new', methods=['POST'])
@login_required
def new_community():
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        community = Community(community=form.data['community'], ownerId = current_user.id)
        db.session.add(community)
        db.session.commit()
    return


@community_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_community(id):
    community = Community.query.get(id)

    if current_user.id != community.ownerId:
        return jsonify({"error": "You are not authorized to update this community"}), 403

    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        community.community = form.data['community']
        db.session.commit()
        return jsonify({"message": "Community updated successfully"})
    else:
        errors = form.errors
        return jsonify({"error": errors}), 400

@community_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_community(id):
    community = Community.query.get(id)

    if current_user.id != community.ownerId:
        return jsonify({"error": "You are not authorized to delete this community"}), 403

    posts = Post.query.filter_by(communityId=community.id).all()
    for post in posts:
        Comment.query.filter_by(postId=post.id).delete()

    Post.query.filter_by(communityId=community.id).delete()

    db.session.delete(community)
    db.session.commit()

    return jsonify({"message": "Community deleted successfully"})
