# azanjakim

Reset:

```
# 0 -- clean reset Posgrest
# TODO automate all of these, since manual is working fine..
# edit models.py, comment out default=... id=... get or create..
# create postgres database azanjakim, owner muaz
# read settings.py DATABASE dict for more info
$
create models.py.backup
python manage.py flush
rm -rf azanlocator/migrations
python manage.py makemigrations azanlocator
python manage.py makemigrations
python manage.py migrate

# 1 -- generate EsolatZone models
$
python manage.py shell
>>>
from azanlocator.gen_esolatzon import *
#return_csv() #kalau takde lagi kodzon.csv
generate_models()
quit()

# 2 -- generate esolat.db untuk generate models nanti
# SKIP KALAU DAH ADA esolat.db
$
cd azanlocator
python gen_esolatdb2017.py
# pastikan siap esolat.db

# 3 -- generate MasterSchedule
$
cd ..
python manage.py shell
>>>
from azanlocator.gen_masterschedule import *
from azanlocator.models import *
generate_models()
quit()

# 4 -- Configure SocialApp (facebook)
# -- buka Django admin, configure sites dan facebook app
# -- facebook app, 17rakaat, appid, secret
# -- site: localhost:8080 matching dengan facebook app
# -- quick test index.html: localhost:8000
# fix Django Admin login window
# https://stackoverflow.com/questions/9736975/django-admin-doesnotexist-at-admin
$ python manage.py shell
from django.contrib.sites.models import Site
Site.objects.create(pk=1, domain='localhost:8000', name='localhost:8000')
```

Psuedocode for proposed appflow in frontend (javascript)
```
# auto-register, note always check fingerprint if not using fb
# fingerprint for storing anon users who never fb login
# use ClientJS for fingerprint
if not rest-auth/user: # not logged in
    clientjs-get-fingerprint
    try:
      rest-auth/login # receive token here
    except no credentials:
      rest-auth/registration # also logged in, receive token here

# here must already login (even as anon)
drf-parse-times today
drf-parse-times tomorrow

# done. here user free to check other locations' times, etc.
# also user can fb login here.

```

Test curl
```
# register user
# TODO

# get token
curl  -X POST -d "username=qweqweqwe&password=qweqweqwe" http://localhost:8000/api-token-auth/ | jq -r '.token'

# request parsed time, 2 days before delta
curl -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsInVzZXJfaWQiOjgsImV4cCI6MTUwMTU2MjEyNCwib3JpZ19pYXQiOjE1MDE1NTU3NTgsInVzZXJuYW1lIjoicXdlcXdlcXdlIn0.rCxQWEKRow_PXnWbC1rXrZrw1c7rjrAvL1ssY4qNokk" -H "Content-Type: application/json" -X POST -d '{"lat":"1.0","lon":"103","day-delta":-2}' http://127.0.0.1:8000/request-parsed-times/

```