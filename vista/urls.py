# -*- coding: utf-8 -*-

from django.conf.urls import url
from vista import views

app_name = 'vista'

urlpatterns = [
    url(r'^$', views.index, name='index'),
]
