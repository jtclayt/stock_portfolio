from django.urls import path
from .views.create_user import CreateUserView
from .views.create_token import CreateTokenView
from .views.manage_user import ManageUserView

app_name='user'

urlpatterns = [
    path('create', CreateUserView.as_view(), name='create'),
    path('token', CreateTokenView.as_view(), name='token'),
    path('me', ManageUserView.as_view(), name='me')
]
