"""azanlocator-project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin

from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

from django.contrib.auth import views as auth_views
from django.conf.urls import include

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_framework_jwt.views import obtain_jwt_token
# from django.views.generic import TemplateView, RedirectView


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer): 
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^$', TemplateView.as_view(template_name="index.html"), name='home'),

    url(r'^azanlocator/', include('azanlocator.urls')),
    url(r'', include('azanlocator.urls')),

    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),

    url(r'^accounts/', include('allauth.urls')),
    
    #rest and social
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^rest-auth/', include('rest_auth.urls')),

    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),

    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),

    url(r'^api-token-auth/', obtain_jwt_token),
]

# if already have facebook access_token, to fetch:
# curl -H "Content-Type: application/json" -X POST -d '{"access_token":""}' localhost:8000/rest-auth/facebook/

# then use the given Django OR JWT token to access
# curl -X GET http://127.0.0.1:8000/request-parsed-times/ -H 'Authorization: Token '
# urlpatterns += [
#     url(r'^api-auth/', include('rest_framework.urls',
#                                namespace='rest_framework')),
# ]

# to request a parsed times
# curl -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0ODY2MTIyNjEsImVtYWlsIjoiIiwidXNlcl9pZCI6NSwidXNlcm5hbWUiOiJyYWRlbjczIn0.ME6WmyDeC6CptunYA0ut1hDAJhlrFcHMoTo7mgfHw2w" -H "Content-Type: application/json" -X POST -d '{"lat":"1.0","lon":"103"}' http://127.0.0.1:8000/request-parsed-times/
