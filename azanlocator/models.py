from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

class DailyTimes(model.Models):
    subuh   = models.DateTimeField()
    zuhur   = models.DateTimeField()
    asar    = models.DateTimeField()
    maghrib = models.DateTimeField()
    isha    = models.DateTimeField()

    currentDate = models.DateField()
    zone = models.ForeignKey('Zone',
                             on_delete=models.CASCADE,)

class MonthlyTimes(model.Models):

    zone = models.ForeignKey('Zone',
                             on_delete=models.CASCADE,)



class Zone(models.Model):
    zoneName   = models.CharField(max_length=20)
    stateName  = models.CharField(max_length=20)
    ipAddress  = models.CharField(max_length=20)

    todayTimes = models.ForeignKey(DailyTimes,
                             on_delete=models.CASCADE,)
    tomorrowTimes = models.ForeignKey(DailyTimes,
                             on_delete=models.CASCADE,)

    montlyTimes =