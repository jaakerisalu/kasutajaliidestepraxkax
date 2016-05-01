
var users = [
  {user: "opilane", matricule: "123456", password: "parool", isTeacher: false},
  {user: "opetaja", password: "parool", isTeacher: true}
]

$("#loginForm").submit(function(e) {

  e.preventDefault();

  var user = $("#username").val();
  var password = $("#password").val();

  var loginSuccessful = validateLogin(user, password);

  var teacher = isTeacher(user);

  if (loginSuccessful) {
    redirectUser(teacher);
    console.log("success");
  } else {
    $(".login-error span").removeClass("hidden");
    $("#loginForm #username").parent().addClass("is-invalid");
    $("#loginForm #password").parent().addClass("is-invalid");
  }
});


$("#register-link").click(function() {
    $("#login-section").addClass("hidden");
    $(".login-error span").addClass("hidden");
    $("#loginForm #username").parent().removeClass("is-invalid");
    $("#loginForm #password").parent().removeClass("is-invalid");
    $("#register-section").removeClass("hidden");
});

$("#login-page").click(function () {
    $("#login-section").removeClass("hidden");
    $(".login-error span").addClass("hidden");

    $("#register-section").addClass("hidden");
});


function validateLogin(user, pw) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].user === user && users[i].password === pw) {
      return true;
    }
  }

  return false;
}


function isTeacher(user) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].user === user) {
      return users[i].isTeacher;
    }
  }

  return false;
}


function redirectUser(isTeacher) {
  console.log(isTeacher);
  if (isTeacher) {
    window.location.href = "teacher.html";
  } else {
    window.location.href = "student.html";
  }
}
