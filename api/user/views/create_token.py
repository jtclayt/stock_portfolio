from django.test.signals import clear_serializers_cache
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from ..serializers.token import AuthTokenSerializer


class CreateTokenView(ObtainAuthToken):
    '''Create a new auth token for a user'''
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
