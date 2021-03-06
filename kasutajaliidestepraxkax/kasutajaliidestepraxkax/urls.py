from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.views.generic.base import TemplateView
from kasutajaliidestepraxkax.views import TeacherView, StudentView, add_grade, get_grade_modal_data

from accounts import views

admin.autodiscover()

urlpatterns = [
    url(r'', include('accounts.urls')),
    url(r'^$', views.login, name='login'),
    url(r'^teacher/$', login_required(TeacherView.as_view()), name='teacher'),
    url(r'^student/$', login_required(StudentView.as_view()), name='student'),
    url(r'^add-grade/$', login_required(add_grade), name='add_grade'),
    url(r'^get-grade-modal-content/$', login_required(get_grade_modal_data), name='get_content'),

    url(r'^tagauks/', include(admin.site.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
