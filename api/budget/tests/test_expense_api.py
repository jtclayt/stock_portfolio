from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

EXPENSE_URL = reverse('budget:expense-list')

class PublicBudgetApiTests(TestCase):
    '''Test unauthenticated budget API'''
    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        res = self.client.get(EXPENSE_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
