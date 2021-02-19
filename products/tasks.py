from celery import shared_task
import csv
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status
from backend.celery import app


@shared_task
def bcreate(pk=None): #/api/products
    with open('SampleCSVFile_2kb.csv', 'r') as data:
        for line in csv.DictReader(data):
            data = line
            order_keys = ['name', 'phone', 'customer_id']
            item_keys = ['item_name', 'quantity', 'price']
            payment_keys = ['payment_method', 'card_number', 'bill_addr1', 'bill_addr2', 'state', 'city', 'zipcode']
            shipping_keys = ['ship_charge', 'bill_addr1', 'bill_addr2', 'state', 'city', 'zipcode']

            order_data = {your_key: data[your_key] for your_key in order_keys}
            # item_data = {your_key: data[your_key] for your_key in item_keys}
            # payment_data = {your_key: data[your_key] for your_key in payment_keys}
            # shipping_data = {your_key: data[your_key] for your_key in shipping_keys}
            print('order data ',order_data)

            serializer = OrderSerializer(data=order_data)
            if serializer.is_valid():
                device = serializer.save()
                print(device.order_id)
                # if valid data, save it
                serializer.save()
                Response(serializer.data, status=status.HTTP_201_CREATED)

