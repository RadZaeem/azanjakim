from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /polls/
    #url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^$', views.index, name='index'),
    url(r'^/nearby/$', views.index, name='nearby_campgrounds'),

    # ex: /polls/5/
    url(r'^(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /polls/5/results/
    url(r'^(?P<question_id>[0-9]+)/results/$', views.results, name='results'),
    # ex: /polls/5/vote/
    url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
]

'''
 {% extends 'azanlocator/base.html' %}


  {% block content %}
{% endblock %}
'''