from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:create')
# TOKEN_URL = reverse('user:token')
TEST_USER_DATA = {'username': 'testuser', 'password': 'password', 'name': 'Test User'}


class PublicUserApiTests(TestCase):
    '''Test the public enpoints for users API'''

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create(**TEST_USER_DATA)

    def test_create_valid_user_success(self):
        payload = {'username': 'createtest', 'password': '1password!'}
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    def test_user_already_exists(self):
        res = self.client.post(CREATE_USER_URL, TEST_USER_DATA)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
