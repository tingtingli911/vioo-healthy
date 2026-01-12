from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('info/', views.user_info, name='user_info'),
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
]
