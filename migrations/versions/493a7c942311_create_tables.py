"""create tables

Revision ID: 493a7c942311
Revises: 
Create Date: 2024-01-04 13:43:53.690544

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '493a7c942311'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('firstname', sa.String(length=20), nullable=False),
    sa.Column('lastname', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('communities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('community', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('community')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('body', sa.String(length=255), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(), nullable=True),
    sa.Column('updatedAt', sa.TIMESTAMP(), nullable=True),
    sa.Column('communityId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['communityId'], ['communities.id'], ),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('postId', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=255), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(), nullable=True),
    sa.Column('updatedAt', sa.TIMESTAMP(), nullable=True),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['postId'], ['posts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('upvotes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('postId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['postId'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('upvotes')
    op.drop_table('comments')
    op.drop_table('posts')
    op.drop_table('communities')
    op.drop_table('users')
    # ### end Alembic commands ###