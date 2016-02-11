from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic

from django.template import loader

from .models import *

class IndexView(generic.ListView):
    template_name = 'azanlocator/index.html'
    model = DailyTimes


    def __init__(self):
        super(IndexView, self).__init__()
        d = DailyTimes()
        d.updateLatest()

    def get_queryset(self):
        return DailyTimes.objects


def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)