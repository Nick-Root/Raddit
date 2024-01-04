from flask_wtf import FlaskForm
from wtforms import StringField
from app.models import Comment
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField("comment", validators=[DataRequired()])
