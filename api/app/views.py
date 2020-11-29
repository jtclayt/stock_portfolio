from django.shortcuts import render, HttpResponse

def index(request):
    return HttpResponse('This django app is working!')
