from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /polls/
    #url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^$', views.index, name='index'),
    url(r'^/nearby/$', views.index, name='nearby_campgrounds')]

'''
 {% extends 'azanlocator/base.html' %}


  {% block content %}
{% endblock %}
'''