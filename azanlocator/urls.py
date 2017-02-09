from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

from django.views.generic import TemplateView, RedirectView



urlpatterns = [
    # ex: /polls/
    # url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^index$', views.index, name='index'),
    url(r'^home$', views.index, name='home'),
    url(r'^test$', TemplateView.as_view(template_name="azanlocator/test.html"), name='test'),
    # url(r'^daily-times/$', views.daily_times_list),
    url(r'^daily-times/$', views.DailyTimesList.as_view()),
    url(r'^request-parsed-times/$', views.RequestParsedTimes.as_view()),
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    # url(r'^snippets/(?P<pk>[0-9]+)/$', views.snippet_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)

'''
 {% extends 'azanlocator/base.html' %}


  {% block content %}
{% endblock %}
'''