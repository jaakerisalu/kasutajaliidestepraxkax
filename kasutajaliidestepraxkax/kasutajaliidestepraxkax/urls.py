from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.views.generic.base import TemplateView
from kasutajaliidestepraxkax.views import TeacherView, StudentView

from accounts import views

admin.autodiscover()

urlpatterns = [
    url(r'', include('accounts.urls')),
    url(r'^$', views.login, name='login'),
    url(r'^teacher/$', login_required(TeacherView.as_view()), name='teacher'),
    url(r'^student/$', login_required(StudentView.as_view()), name='student'),

    url(r'^tagauks/', include(admin.site.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
