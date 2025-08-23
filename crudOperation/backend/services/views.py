from django.shortcuts import render
from rest_framework import viewsets
from .models import Services
from .serializers import ServiceSerializer

# Create your views here.
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all().order_by('-created_at')
    serializer_class = ServiceSerializer