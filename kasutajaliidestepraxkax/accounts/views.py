from django.contrib.auth.views import login as django_login

from accounts.forms import LoginForm

from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from django.views.generic import CreateView
from accounts.forms import RegistrationForm, PasswordResetForm
from accounts.models import User


def login(request):
    if request.user.is_authenticated():
        if request.user.is_staff:
            return HttpResponseRedirect("/teacher")
        else:
            return HttpResponseRedirect("/student")

    return django_login(request, template_name='accounts/login.html', authentication_form=LoginForm)


class RegistrationView(CreateView):
    form_class = RegistrationForm
    model = User

    def form_valid(self, form):
        obj = form.save(commit=False)
        # obj.set_password(User.objects.make_random_password())
        obj.save()

        # This form only requires the "email" field, so will validate.
        reset_form = PasswordResetForm(self.request.POST)
        reset_form.is_valid()  # Must trigger validation
        # Copied from django/contrib/auth/views.py : password_reset
        opts = {
            'use_https': self.request.is_secure(),
            'email_template_name': 'registration/verification.html',
            'subject_template_name': 'registration/verification_subject.txt',
            'request': self.request,
            # 'html_email_template_name': provide an HTML content template if you desire.
        }
        # This form sends the email on save()
        reset_form.save(**opts)

        return redirect('login')
