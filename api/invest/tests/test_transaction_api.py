from datetime import datetime as dt
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from pytz import timezone
from rest_framework import status
from rest_framework.test import APIClient

from ..models.stock import Stock
from ..models.transaction import Transaction

TRANSACTION_URL = reverse('invest:transaction-list')


def stock_detail_url(id: int) -> str:
    '''Helper function for getting the detail url for a transaction'''
    return f'${TRANSACTION_URL}{id}/'


def sample_transaction(user: get_user_model(), stock: Stock, **params) -> Transaction:
    '''Help function for creating a transaction'''
    defaults = {
        'shares_traded': '10',
        'trade_price': '200',
        'is_buy': True,
        'is_dividend': False,
        'trade_date': timezone('US/Pacific').localize(dt.now()),
        'stock': stock
    }
    defaults.update(params)
    return Transaction.objects.create(user=user, **defaults)


class PublicTransactionTests(TestCase):
    '''Test unauthenticated stock API'''
    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        res = self.client.get(TRANSACTION_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateStockTests(TestCase):
    '''Test authenticated stock API'''
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user('testuser', 'test')
        self.client.force_authenticate(self.user)
        self.stock = Stock.objects.create(
            symbol='MSFT',
            name='Microsoft',
            user=self.user
        )

    def test_get_stocks(self):
        '''Test that an auth user can retrieve created stock data'''
        sample_transaction(self.user, self.stock)
        sample_transaction(self.user, self.stock)

        res = self.client.get(TRANSACTION_URL)
        transactions = Transaction.objects.all()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['results']), len(transactions))
