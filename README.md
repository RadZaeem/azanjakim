# azanjakim

Kalau hilang database:

```
# 1 -- generate EsolatZone models
$ python manage.py shell
from azanlocator.gen_esolatzon import *
return_csv() #kalau takde lagi kodzon.csv
generate_models()
quit()

# 2 -- generate esolat.db untuk generate models nanti
$ cd azanlocator
$ python gen_esolatdb2017.py
# pastikan siap esolat.db

# 3 -- generate MasterSchedule
$ cd ..
$ python manage.py shell
from azanlocator.gen_masterschedule import *
from azanlocator.models import *
generate_models()
quit()

```

Psuedocode for proposed appflow in frontend (javascript)
```
# auto-register, note always check fingerprint if not using fb
# fingerprint for storing anon users who never fb login
# use ClientJS for fingerprint
if not rest-auth/user:
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