from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class BaseViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        '''Get objects for current user'''
        return self.queryset.filter(
            user=self.request.user
        ).order_by('-created_at').distinct()

    def perform_create(self, serializer):
        '''Save user when created'''
        serializer.save(user=self.request.user)
