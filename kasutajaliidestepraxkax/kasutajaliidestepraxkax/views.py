from django.core import serializers
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

        students = Student.objects.all()
        homeworks = HomeWork.objects.all()

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


def add_grade(request):
    if request.method == 'POST':
        values = [name for name, value in request.POST.items() if name.startswith('grade_')]

        if "form-type" not in request.POST:
            for s in request.POST.getlist('student'):
                for val in values:
                    s_list = s.split(" ")
                    student = Student.objects.filter(matricule=s_list[2]).first()
                    category = GradeCategory.objects.get(name=val.split("_")[1], homework__name=request.POST['ex_name'])
                    grade = Grade(student=student, category=category, value=request.POST[val])

                    if not Grade.objects.filter(student=student, category=category).exists():
                        grade.save()
        else:
            for s in request.POST.getlist('student'):
                for val in values:
                    s_list = s.split(" ")
                    student = Student.objects.get(matricule=s_list[2])
                    category = GradeCategory.objects.get(name=val.split("_")[1], homework__name=request.POST['ex_name'])
                    if Grade.objects.filter(student=student, category=category).exists():
                        Grade.objects.get(student=student, category=category).value = request.POST[val]
                    else:
                        g = Grade(student=student, category=category, value=request.POST[val])
                        g.save()

    return HttpResponseRedirect("/teacher")


def get_grade_modal_data(request):
    data = {}

    if request.method == 'GET':
        if request.GET['ex']:
            ex = request.GET.get('ex')

            print(ex)

            categories = GradeCategory.objects.filter(homework__name=ex)

            data = serializers.serialize('json', categories)

    return HttpResponse(data, content_type='application/json')


