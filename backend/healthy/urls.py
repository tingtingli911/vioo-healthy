"""
URL configuration for healthy project.
"""
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse

def hello_world(request):
    return JsonResponse({'message': 'Hello World', 'status': 'success'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/hello/', hello_world, name='hello'),
]
