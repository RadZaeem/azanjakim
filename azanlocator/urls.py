from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from django.contrib.staticfiles.views import serve
from django.views.generic import TemplateView, RedirectView



urlpatterns = [
    # ex: /polls/
    # url(r'^$', views.IndexView.as_view(), name='index'),
    # url(r'^$', views.index, name='index'),
       url(r'^$', serve,
        kwargs={'path': '../index.html'}),

    # static files (*.css, *.js, *.jpg etc.) served on /
    # (assuming Django uses /static/ and /media/ for static/media urls)
    url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
        RedirectView.as_view(url='/static/%(path)s', permanent=False)),

    url(r'^home$', views.index, name='home'),
    # url(r'^$', TemplateView.as_view(template_name="frontend/index.html"), name='index'),

    url(r'^test$', TemplateView.as_view(template_name="azanlocator/test.html"), name='test'),
    # url(r'^daily-times/$', views.daily_times_list),
    url(r'^daily-times/$', views.DailyTimesList.as_view()),
    url(r'^request-parsed-times/$', views.RequestParsedTimes.as_view()),
    url(r'^request-last-parsed-times/$', views.RequestLastParsedTimes.as_view()),
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