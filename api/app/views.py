from django.shortcuts import render, HttpResponse

def index(request):
    return HttpResponse('The django app is working!')
