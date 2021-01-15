from django.contrib.auth import get_user_model
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    '''Base serializer for users'''

    class Meta:
        model = get_user_model()
        fields = [
            'url', 'id', 'username', 'first_name', 'last_name', 'email',
            'last_login', 'date_joined'
        ]
        read_only_fields = ('id',)
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        print(user)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user
