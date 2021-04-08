from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

import django_js_reverse.views

from startupScript import startupScript

urlpatterns = [
    path("", lambda request : redirect("/exampleapp/")),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("exampleapp/", include("exampleapp.urls"), name="exampleapp"),
    path("chat/", include('chat.urls')),
    path("game/", include('game.urls')),
]

#run startup script:
#todo: remove in production
startupScript()
