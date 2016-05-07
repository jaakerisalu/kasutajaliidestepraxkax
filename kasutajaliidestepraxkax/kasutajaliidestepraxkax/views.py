from django.views.generic import TemplateView
from kasutajaliidestepraxkax.models import Student


class TeacherView(TemplateView):
    template_name = "teacher.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Teed andmebaasi päringu ja kõik muu infi mis sa kaasa tahad panna siin

        students = Student.objects.all()

        # def students(self):
        #     return Student.objects.all()

        context.update({
            'students': students,
            # mingi_muutuja_mida_vaja: mingi_meetod()
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
