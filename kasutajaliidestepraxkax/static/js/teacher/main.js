

$(document).ready(function(){
    console.log("yo");
    window.location.hash = currentView;
    changeView(currentView);
});

$(".grades-link").click(function() {
    currentView = "grades";
    changeView(currentView);
});

$(".exercises-link").click(function() {
    currentView = "exercises";
   changeView(currentView);
});

$(".students-link").click(function() {
    currentView = "students";
    changeView(currentView);
});


$("#teacher-logout").click(function () {
    window.location.href = "login.html";
});


function changeView(view) {

  if (view === "grades") {
      $("#exercises").hide();
      $("#students").hide();
      $("#grades").show();
      loadGradesView();
      $(".exercises-link").removeClass("is-active");

      $(".students-link").removeClass("is-active");
      $(".grades-link").addClass("is-active");

  } else if (view === "exercises") {
      $("#grades").hide();
      $("#students").hide();
      $("#exercises").show();
      $(".grades-link").removeClass("is-active");

      $(".students-link").removeClass("is-active");
      $(".exercises-link").addClass("is-active");
  } else if (view === "students") {
      $("#grades").hide();
      $("#exercises").hide();
      $("#students").show();

      $(".grades-link").removeClass("is-active");
      $(".exercises-link").removeClass("is-active");
      $(".students-link").addClass("is-active");
  }
}
