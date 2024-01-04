from flask_wtf import FlaskForm
from wtforms import StringField
from app.models import Community
from wtforms.validators import DataRequired, ValidationError

def community_exists(form, field):
    community = form.data
    exists = Community.query.filter(Community.community == community).first()
    if exists:
        raise ValidationError('Community already exists')

class CommunityForm(FlaskForm):
    community = StringField("community", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
