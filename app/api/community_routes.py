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
