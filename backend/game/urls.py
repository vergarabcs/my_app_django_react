from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from game import views

urlpatterns = [
    path('room/', views.ApiCreateRoom.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
