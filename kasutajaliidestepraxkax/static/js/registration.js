
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms, 5 second for example
var $input = $('#registrationForm input');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});


//on keydown, clear the countdown
$input.on('keydown', function (e) {
  clearTimeout(typingTimer);
  if (e.keyCode !== 13) {
    $("#register-submit").prop("disabled", true);
  }
});


function doneTyping() {
  validateFields(getFilledFields());
  enableSubmit();
}


function enableSubmit() {
  var fields = getFilledFields();
  var areAllFieldsFilled = fields.indexOf(0) === -1;

  if ($("#registrationForm div").hasClass("is-invalid") || !areAllFieldsFilled) {
    // TODO:
  } else {
    $("#register-submit").prop("disabled", false);
  }
}


function validateFields(fields) {
  for (var i = 0; i < fields.length; i++) {
    if (fields[0] > 0) checkUserExist();
    if (fields[1] > 0) checkMatricule();
    if (fields[2] > 0) checkPasswordLength();
    if (fields[3] > 0) checkPasswordMatch();
  }
}


function getFilledFields() {
  var inputLengths = [];

  inputLengths[0] = $("#user-reg").val().trim().length;
  inputLengths[1] = $("#matricule").val().trim().length;
  inputLengths[2] = $("#pw-reg").val().length;
  inputLengths[3] = $("#password-confirm").val().length;

  return inputLengths;
}


function checkPasswordMatch () {
  if ($("#pw-reg").val() !== $("#password-confirm").val()) {
    $("#password-confirm").parent().addClass("is-invalid");
  } else {
    $("#password-confirm").parent().removeClass("is-invalid");
  }
}


function checkPasswordLength() {
  if ($("#pw-reg").val().length < 4) {
    $("#pw-reg").parent().addClass("is-invalid");
  }
}


function checkUserExist() {
  var username = $("#user-reg").val();

  for (var i = 0; i < users.length; i++) {
    if (users[i].user === username) {
      $("#user-reg").parent().addClass("is-invalid");
      return false;
    }
  }
}


function checkMatricule() {
  if (!(/^\d+$/.test($("#matricule").val())) || $("#matricule").val().length !== 6) {
    $("#matricule").parent().addClass("is-invalid");
  }
}


$("#registrationForm").submit(function(e) {
  e.preventDefault();

  console.log("aaa");
  registerUser();
  notie.alert(1, 'Registreerimine edukas!', 1.5);

  $("#register-section").addClass("hidden");
  $("#login-section").removeClass("hidden");
});


function registerUser() {
  var user = $("#user-reg").val();
  var pw = $("#pw-reg").val();
  var matricule = $("#matricule").val();

  users.push({
    user: user, matricule: matricule, password: pw, isTeacher: false
  });
}
