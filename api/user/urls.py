from django.urls import path, include
from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .views.user import UserViewSet, RegisterUserViewSet, ManageUserViewSet

app_name = 'user'

router = DefaultRouter()
router.register('users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterUserViewSet.as_view(), name='register'),
    path('me/', ManageUserViewSet.as_view(), name='me')
]
