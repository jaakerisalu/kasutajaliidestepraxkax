
from django.http import HttpResponse
from django.views.generic import TemplateView
from kasutajaliidestepraxkax.models import Student
from kasutajaliidestepraxkax.models import HomeWork
from kasutajaliidestepraxkax.models import GradeCategory
from kasutajaliidestepraxkax.models import Grade


class TeacherView(TemplateView):
    template_name = "teacher.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Teed andmebaasi päringu ja kõik muu infi mis sa kaasa tahad panna siin

        students = Student.objects.all()
        homeworks = HomeWork.objects.all()
        grade_categories = GradeCategory.objects.filter(homework=homeworks[0])

        temp = Grade.objects.filter(category__homework__name='HW1')
        print(temp)

        context.update({
            'students': students,
            'homeworks': homeworks,
            'categories': grade_categories,
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
