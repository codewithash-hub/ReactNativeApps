from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from services.views import ServiceViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Auth
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
