from django.urls import path
from .views.create_user import CreateUserView

app_name='user'

urlpatterns = [
    path('create', CreateUserView.as_view(), name='create')
]
