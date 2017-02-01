# azanjakim

Kalau hilang database:

```python
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

lepas tu jaga kodzon.csv esolat.db baik2
