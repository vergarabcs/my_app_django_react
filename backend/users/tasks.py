from django.core import management

from wordFactory import celery_app


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')
