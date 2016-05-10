from django.conf.urls import patterns, url
from django.contrib.auth.views import logout_then_login

from accounts.forms import PasswordResetForm, SetPasswordForm

from django.contrib.auth import views
from accounts.views import RegistrationView

from .views import login

urlpatterns = patterns('accounts.views',
    url(r'^login/$', login, name='login'),
    url(r'^logout/$', logout_then_login, name='logout'),
)

# Password reset
urlpatterns += patterns('django.contrib.auth.views',
    url(r'^account/password_reset/$', 'password_reset', name='password_reset',
        kwargs={'password_reset_form': PasswordResetForm}),
    url(r'^account/password_reset/done/$', 'password_reset_done', name='password_reset_done',),
    url(r'^account/reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        'password_reset_confirm', name='password_reset_confirm', kwargs={'set_password_form': SetPasswordForm}),
    url(r'^account/reset/done/$', 'password_reset_complete', name='password_reset_complete'),


    url(r'^register/$', RegistrationView.as_view(), name='register'),
    url(r'^register/done/$', views.password_reset_done, {'template_name': 'registration/initial_done.html', }, name='register-done'),

    url(r'^register/password/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.password_reset_confirm, {
                                'template_name': 'registration/initial_confirm.html',
                                'post_reset_redirect': 'login',
                            }, name='register-confirm'),
    url(r'^register/complete/$', views.password_reset_complete, {'template_name': 'registration/initial_complete.html', }, name='register-complete'),
)
