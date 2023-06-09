"""updated trail_id in Review

Revision ID: 283cad25e6c7
Revises: 0f5be4a35095
Create Date: 2023-04-17 09:58:47.536367

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '283cad25e6c7'
down_revision = '0f5be4a35095'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trails', schema=None) as batch_op:
        batch_op.drop_constraint('fk_trails_review_id_reviews', type_='foreignkey')
        batch_op.drop_column('review_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trails', schema=None) as batch_op:
        batch_op.add_column(sa.Column('review_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_trails_review_id_reviews', 'reviews', ['review_id'], ['id'])

    # ### end Alembic commands ###
