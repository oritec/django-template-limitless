# -*- coding: utf-8 -*-

from django.urls import include, path
from vista import views

app_name = 'vista'

urlpatterns = [
    #url(r'^$', views.index, name='index'),
    path('', views.index, name='index'),
]
