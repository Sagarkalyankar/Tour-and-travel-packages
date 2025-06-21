"""
URL configuration for Tour_Agency project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from Yatraapp.views import *
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/',home,name='home'),
    # path('register/',register,name='register'),
    path('register_user/',register_user,name='register_user'),
    # path('registerUSer/',registerUser,name='registerUSer'),
    # path('login/',login,name='login'),
    path('api/auth/login_user/',login_user,name='login_user'),
    path('login_admin/',login_admin,name='login_admin'),
    # path('loginUser/',loginUser,name='loginUser'),
    path('package/<int:id>/', package_details,name='package'),
    path('book/<int:id>/', book_package,name='book'),
    path('api/admin/bookings/', bookings,name='bookings'),
    path('api/admin/getMessages', getMessages, name='getMessages'),
    # path('booking-success/', booking_success,name='booking-success'),
    # path('manage_packages/', manage_packages,name='manage_packages'),
    path('add_package/', add_package,name='add_package'),
    path('api/admin/users/',users,name='users'),
    path('user_profile/', user_profile,name='add_package'),
    path('user_bookings/', user_bookings,name='user_bookings'),
    path('edit_package/<int:package_id>/', edit_package,name='edit_package'),
    path('delete_package/<int:package_id>/', delete_package,name='delete_package'),
    path('contact/', submit_contact_message, name='contact-message'),
    # path('add_package_page/', add_package_page),
    # path('give_edit_package/<int:package_id>/', give_edit_package,name='give_edit_package'),
    # path('edit_package/<package_id>/', edit_package, name='edit_package'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
