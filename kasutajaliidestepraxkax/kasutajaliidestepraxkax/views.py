
from django.http import HttpResponse
from django.views.generic import TemplateView
from kasutajaliidestepraxkax.models import Student
from kasutajaliidestepraxkax.models import HomeWork
from kasutajaliidestepraxkax.models import GradeCategory
from kasutajaliidestepraxkax.models import Grade
from django.http import HttpResponseRedirect


class LoggedInMixin(object):
    """ A mixin requiring a user to be logged in. """
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return HttpResponseRedirect("/student")

        return super(LoggedInMixin, self).dispatch(request, *args, **kwargs)


class TeacherView(LoggedInMixin, TemplateView):
    template_name = "teacher.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

# Teed andmebaasi päringu ja kõik muu infi mis sa kaasa tahad panna siin

        students = Student.objects.all()
        homeworks = HomeWork.objects.all()
        grade_categories = GradeCategory.objects.filter(homework=homeworks[0])

        context.update({
            'students': students,
            'homeworks': homeworks,
        })

        return context


class StudentView(TemplateView):
    template_name = "student.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Teed andmebaasi päringu ja kõik muu infi mis sa kaasa tahad panna siin

        # students = Student.objects.filter(active=True)
        # context.update({
        #     students: students,
        #     mingi_muutuja_mida_vaja: mingi_meetod()
        # })

        return context
