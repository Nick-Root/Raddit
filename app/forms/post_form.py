from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from ..api.awsupload import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    body = StringField("body", validators=[DataRequired()])
    imageUrl = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    communityId = IntegerField("communityId", validators=[DataRequired()])
