from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    # ex: /polls/
    #url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^$', views.index, name='index'),
    # url(r'^daily-times/$', views.daily_times_list),
    url(r'^daily-times/$', views.DailyTimesList.as_view()),
    # url(r'^snippets/(?P<pk>[0-9]+)/$', views.snippet_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)

'''
 {% extends 'azanlocator/base.html' %}


  {% block content %}
{% endblock %}
'''