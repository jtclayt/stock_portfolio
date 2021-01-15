from django.contrib.auth import get_user_model
from rest_framework import viewsets, generics
from rest_framework import permissions
from ..serializers.user import UserSerializer


class RegisterUserViewSet(generics.CreateAPIView):
    '''Register a new user to system'''
    serializer_class = UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    '''
    API endpoint for users to be viewed/edited.
    '''
    queryset = get_user_model().objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class ManageUserViewSet(generics.RetrieveUpdateAPIView):
    '''Manage auth user'''
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
