from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

class DailyTimes(models.Model):
    subuh   = models.DateTimeField()
    zuhur   = models.DateTimeField()
    asar    = models.DateTimeField()
    maghrib = models.DateTimeField()
    isha    = models.DateTimeField()

    currentDate = models.DateField()

class MonthlyTimes(models.Model):
    todayTimes = models.ForeignKey(DailyTimes,
                             on_delete=models.CASCADE,)

    def __str__(self):
        pass

    def parseTable(self):
        pass



class Zone(models.Model):
    zoneName   = models.CharField(max_length=20)
    stateName  = models.CharField(max_length=20)
    ipAddress  = models.CharField(max_length=20)

    monthlyTimes =  models.ForeignKey(MonthlyTimes,
                             on_delete=models.CASCADE,)