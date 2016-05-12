from __future__ import unicode_literals

from django.db import models
from accounts.models import User


class Student(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    matricule = models.PositiveIntegerField()

    user = models.ForeignKey(User, null=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

    def get_subgrades(self):
        """
            Gets a list of all subgrades the student has grades in
        """
        return [g.category for g in self.grades.all()]


class HomeWork(models.Model):
    """
        This would be a homework that can have any number of subgrades
    """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    def get_students(self):
        # Return all students who have any grades done current homework
        return set([g.student for grade in self.subgrades.all() for g in grade.grades.all()])


class GradeCategory(models.Model):
    """
        This would be a subgrade category, eg if you have a homework called HW1
        You could have GradeCategories Style, Presentation and Correctness
                                         |          |               |
        And they would have values       5          7              19

        So you can declare the different grades one homework should have and all students
        can get grades tied to the categories
    """
    name = models.CharField(max_length=255)
    homework = models.ForeignKey(HomeWork, related_name="subgrades")

    def __str__(self):
        return self.name + " - " + str(self.homework.name)


class Grade(models.Model):
    """
        This would be a subgrade for a homework, the total can be calculated based on these
        summed by student and does not need to be held in the DB
    """
    value = models.PositiveSmallIntegerField()  # Vb ta tahab ntx 20 punkti anda, see lubab kuni 32k
    student = models.ForeignKey(Student, related_name="grades")
    category = models.ForeignKey(GradeCategory, related_name="grades")

    def __str__(self):
        return str(self.student.first_name) + " " + str(self.student.last_name) \
               + " [" + str(self.category.homework) + " - " + str(self.category.name) + ": " + str(self.value) + "]"

    class Meta:
        unique_together = ("student", "category")  # Every student can have one grade per category
