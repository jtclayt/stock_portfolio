from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from ..serializers.user_serializer import UserSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
