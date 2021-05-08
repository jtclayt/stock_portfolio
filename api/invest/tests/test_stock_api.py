from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from ..models.stock import Stock

STOCK_URL = reverse('invest:stock-list')


def stock_detail_url(id: int) -> str:
    '''Helper function for getting the detail url for a stock'''
    return f'${STOCK_URL}{id}/'


def sample_stock(user: get_user_model(), **params) -> Stock:
    '''Help function for creating a stock'''
    defaults = {
        'symbol': 'MSFT',
        'name': 'Microsoft'
    }
    defaults.update(params)
    return Stock.objects.create(user=user, **defaults)


class PublicStockTests(TestCase):
    '''Test unauthenticated stock API'''
    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        res = self.client.get(STOCK_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateStockTests(TestCase):
    '''Test authenticated stock API'''
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user('testuser', 'test')
        self.client.force_authenticate(self.user)

    def test_get_stocks(self):
        '''Test that an auth user can retrieve created stock data'''
        sample_stock(self.user)
        sample_stock(self.user, symbol='HD')

        res = self.client.get(STOCK_URL)
        stocks = Stock.objects.all()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['results']), len(stocks))

    def test_get_stock_limited_to_user(self):
        '''Stocks should only be able to be retrieved by creator'''
        other_user = get_user_model().objects.create_user('otheruser', 'test')
        sample_stock(user=other_user, symbol='GME')
        sample_stock(user=self.user)
        sample_stock(user=self.user, symbol='HD')

        res = self.client.get(STOCK_URL)
        stocks = Stock.objects.filter(user=self.user)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['results']), len(stocks))

        for stock in res.data['results']:
            self.assertEqual(stock['user_id'], self.user.id)

    def test_create_stock(self):
        '''Test auth user can create a new stock'''
        payload = {'symbol': 'msft', 'name': 'Microsoft'}

        res = self.client.post(STOCK_URL, payload)
        new_stock = Stock.objects.get(id=res.data['id'])

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIsNotNone(new_stock)
        self.assertEqual(new_stock.symbol, payload['symbol'].upper())
        self.assertEqual(new_stock.name, payload['name'])
        self.assertEqual(new_stock.user, self.user)

    def test_no_duplicate_symbols_for_one_user(self):
        '''Only one stock should be able to be created per symbol'''
        sample_stock(self.user)
        payload = {'symbol': 'msft', 'name': 'Microsoft'}

        res = self.client.post(STOCK_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
