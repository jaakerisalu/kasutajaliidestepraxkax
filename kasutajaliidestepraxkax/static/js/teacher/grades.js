/**
 *
 */
$(document).ready(function() {
   initAddGradeListeners();
});

/**
 *
 */
function loadGradesView() {

    $("#grades-table-body").empty();

    // addExercisesToTable();

    // addTableRows();

    initGradeListeners();

    initRowListeners();
}


/**
 * Listening exercise name change in grades table
 */
function initGradeListeners() {
    $("#ex-select").change(function(change) {
        var count = 0;
        console.log("change ex");
        $("#grades-table-body td#ex-name").each(function(cell){
            var grade = students[count][$("#ex-select option:selected").text()];
            if (grade !== undefined) {
                $(this).html(grade);
            } else {
                $(this).html("0");
            }
            count++;
        });
    });
}

/**
 * Listeners for grade adding modal
 */
function initAddGradeListeners() {

    $("#grade-modal-open").click(function() {
        openGradeAddingModal();
    });


    // initialize autocomplete
    var input = document.getElementById("find-student");
    var awesomplete = new Awesomplete(input);
    awesomplete.list = createStudentStringList();


    $("#find-student").on("awesomplete-selectcomplete", function () {
        addChip($("#find-student").val());
    });


    $(".remove-chip").click(function () {
        console.log("remove");
        $(this).parent().remove();
    });


    $("#add-grade-form").submit(function(e) {
        e.preventDefault();

        console.log("submit");

        var errors = getErrorsFromGradeForm();
        console.log(errors);
        if (errors.length === 0) {
            addGrades();
            addTableRows();
            initRowListeners();
            $(".custom-modal").css("display", "none");
        } else {
            errors.forEach(function (entry) {
               $("#add-grade-form #" + entry).closest("div.mdl-textfield").addClass("is-invalid");
            });
        }
    });

    // Modal field listeners

    // Check modal inputs to see if they're filled or not
    $("#add-grade-form #grade").keyup(function(){
        if ($(this).val().trim().length != 0) {
            if (!$(this).parent().hasClass("is-filled")) {
                $(this).parent().addClass("is-filled");
            }
        } else if ($(this).parent().hasClass("is-filled")) {
            $(this).parent().removeClass("is-filled");
        }
    });
}


/**
 *
 */
function initRowListeners() {
    $("#grades-table-body .grade-row").click(function () {
        openGradeAddingModal();

        var nameString = $(this).find(".fname-column").text() + " ";
        nameString += $(this).find(".lname-column").text() + " ";
        nameString += $(this).find(".matricule-column").text();

        $("#add-grade-form #find-student").val(nameString);
        $("#add-grade-form .find-student-container").addClass('is-focused');
        addChip(nameString);
        $("#add-grade-form .custom-chip .remove-chip").unbind("click");

        $("#find-student").val(nameString);
        $("#find-student").attr("disabled", "disabled");


        $("#add-grade-form #exercise").val($('#ex-select option:selected').text());
        $("#add-grade-form #exercise").attr("disabled", "disabled");

        $("#add-grade-form #grade").val($(this).find(".grade-column").text());
        $("#add-grade-form #grade").parent().addClass('is-focused');
    });
}


/**
 *
 */
function addTableRows() {
    $("#grades-table-body").empty();
    var selectedEx = $('#ex-select option:selected').text();

    for (var i = 0; i < students.length; i++) {
        var line = '<tr class="grade-row">';
        line += '<td class="mdl-data-table__cell--non-numeric fullwidth fname-column">' + students[i].first_name + '</td>';
        line += '<td class="mdl-data-table__cell--non-numeric fullwidth lname-column">' + students[i].last_name + '</td>';
        line += '<td class="mdl-data-table__cell--non-numeric fullwidth matricule-column">' + students[i].matricule + '</td>';
        line += '<td class="mdl-data-table__cell--non-numeric fullwidth grade-column" id="ex-name">'
            + (students[i][selectedEx] === undefined ? 0 : students[i][selectedEx]) + '</td>';
        line += "</tr>";
        $("#grades-table-body").append(line);
    }
}

/**
 * Goes through students mock data and creates list of {<firstname> <lastname> <matricule>} strings
 *
 * @returns {Array}
 */
function createStudentStringList() {
    var list = [];
    students.forEach(function(entry) {
       var res = entry.first_name + " " + entry.last_name + " " + entry.matricule;
        list.push(res);
    });
    return list;
}

/**
 * Creates dropdown values for grade adding modal
 * @returns {string}
 */
function getExerciseOptions() {
    var options = "";
    exercises.forEach(function(entry) {
        options += '<option value="' + entry +'">' + entry + '</option>';
    });

    return options;
}

/**
 * Adds exercise selection to grades table
 */
function addExercisesToTable() {
    $("#ex-select").empty();

    var options = getExerciseOptions();
    if (options !== "") {
        console.log("focused");
        $("#grades-table-head .select-container").addClass("is-focused");
    } else {
        $("#grades-table-head .select-container").removeClass("is-focused");
    }

    $("#grades-table-head #ex-select").append(options);
}

/**
 * 1) At least one chip
 * 2) exercise not empty
 * 3) grade not empty
 */
function getErrorsFromGradeForm() {
    var errors = [];

    if (!$("#add-grade-form .custom-chip").length) {
        errors.push("find-student");
    }

    if ($(".select-container #exercise").val() === "") {
        errors.push("exercise");
    }

    if ($("#add-grade-form #grade").val().trim().length === 0) {
        errors.push("grade");
    }

    return errors;
}


/**
 * Add grades to mock data
 */
function addGrades() {

    var $students = $("#add-grade-form").find(".custom-chip");
    var matricules = [];
    for (var i = 0; i < $students.length; i++) {
        matricules.push($($students[i]).text().split(" ")[2].trim());
    }
    console.log(matricules);

    console.log($([1]).text());

    var exercise = $(".select-container #exercise").val();
    var grade = $("#add-grade-form #grade").val();

    matricules.forEach(function(entry) {
       var index = findStudentIndexByMatricule(entry);
        if (index >= 0) {
            console.log("add", students[index], exercise);
            students[index][exercise] = grade;
            console.log(students[index]);
        }
    });
}


/**
 *
 * @param matricule
 * @returns {number}
 */
function findStudentIndexByMatricule(matricule) {
    for (var i = 0; i < students.length; i++) {
        if (students[i].matricule == matricule) {
            return i;
        }
    }
    return -1;
}


/**
 *
 */
function clearGradeAddingModal() {
    $("#add-grade-form").find(".custom-chip").remove();
    $("#add-grade-form #grade").val("");
    $("#add-grade-form #find-student").val("");
    $("#add-grade-form #find-student").attr("disabled", false);
    $("#add-grade-form #exercise").attr("disabled", false);

    $("#add-grade-form #find-student").closest("div.mdl-textfield").removeClass("is-invalid");
    $("#add-grade-form #exercise").closest("div.mdl-textfield").removeClass("is-invalid");
    $("#add-grade-form #grade").closest("div.mdl-textfield").removeClass("is-invalid");


}


/**
 *
 */
function openGradeAddingModal() {
    clearGradeAddingModal();

    $("#grade-modal--add").css("display", "block");

    $("#exercise").empty();

    var options = getExerciseOptions();
    if (options !== "") {
        console.log("focused");
        $(".select-container").addClass("is-focused is-filled");
    } else {
        $(".select-container").removeClass("is-focused");
    }
    $("#exercise").append(options);
}


/**
 *
 * @param text
 */
function addChip(text) {
    var $chip = $(".custom-chip.hidden").clone(true);
    console.log($chip);

    $($chip).prepend('<span>' + text + '</span>');
    $($chip).removeClass("hidden");
    $("#add-grade-form").prepend($chip);
    $("#find-student").val("");
}


