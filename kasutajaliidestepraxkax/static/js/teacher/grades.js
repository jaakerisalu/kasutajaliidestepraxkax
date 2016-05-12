/**
 *
 */
$(document).ready(function() {
   initAddGradeListeners();
    console.log("doc ready")
});

/**
 *
 */
function loadGradesView() {
    sumRows();

    initGradeListeners();

    // initRowListeners();
}

/**
 * Calculate the grade totals per row
 */
function sumRows() {
    $('.grades-table-body tr').each(function(){
        var total = 0;
        $('.calc', $(this)).each(function() {
            total += parseFloat($(this).html());
        });
        $(this).find('.total').html(total);
    });
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


    $("#find-student").on("awesomplete-selectcomplete", function () {
        addChip($("#find-student").val());
    });


    $(".remove-chip").click(function () {
        console.log("remove");
        $(this).parent().remove();
        var lookfor = $(this).parent().find(".chip-text").text().split(" ").join("-");
        console.log(lookfor);
        $("#add-grade-form #" + lookfor).remove();
    });


    $("#add-grade-form").submit(function(e) {
        // e.preventDefault();

        console.log("submit");

        var errors = getErrorsFromGradeForm();
        if (errors.length === 0) {
            // addGrades();
            // addTableRows();
            // initRowListeners();
            $(".custom-modal").css("display", "none");
            // return true;
        } else {
            errors.forEach(function (entry) {
               $("#add-grade-form #" + entry).closest("div.mdl-textfield").addClass("is-invalid");
            });

            return false;
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


    $(".grades-table-body tr").click(function () {
        openGradeAddingModal();

        var nameString = $(this).find(".fname-column").text() + " ";
        nameString += $(this).find(".lname-column").text() + " ";
        nameString += $(this).find(".matricule-column").text();
        //
        $("#add-grade-form #find-student").val(nameString);
        $("#add-grade-form .find-student-container").addClass('is-focused');
        addChip(nameString);
        // $("#add-grade-form .custom-chip .remove-chip").unbind("click");

        $(this).find($("td[class$='_grade']")).each(function (i, el) {

            var className = $(el).attr("class").split(" ")[2];
            var catName = className.split("_")[0];

            if (modalReady) {
                console.log("#add-grade-form #" + catName, $(el).text());

                $("#add-grade-form").find("#Style").val(3);
            } else {
                setTimeout(function () {
                    if (modalReady) {
                        $("#add-grade-form").find("#" + catName).val($(el).text());
                        $("#add-grade-form #" + catName).parent().addClass('is-focused');

                    }
                }, 200);
            }


        });
        $("#add-grade-form").append('<input type="hidden" id="form-type" name="form-type" value="EDIT"/>');

        //
        // $("#find-student").val(nameString);
        // $("#find-student").attr("disabled", "disabled");
        //
        //
        // $("#add-grade-form #exercise").val($('#ex-select option:selected').text());
        // $("#add-grade-form #exercise").attr("disabled", "disabled");
        //
        // $("#add-grade-form #grade").val($(this).find(".grade-column").text());
        // $("#add-grade-form #grade").parent().addClass('is-focused');
    });
}

function stateChange() {

}


/**
 *
 */
function initRowListeners() {
    console.log("initRowListeners");
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
 * 1) At least one chip
 * 2) exercise not empty
 * 3) grade not empty
 */
function getErrorsFromGradeForm() {
    var errors = [];

    if (!$("#add-grade-form .custom-chip").length) {
        errors.push("find-student");
    }
    //
    // if ($(".select-container #exercise").val() === "") {
    //     errors.push("exercise");
    // }
    //
    // if ($("#add-grade-form #grade").val().trim().length === 0) {
    //     errors.push("grade");
    // }

    $("#add-grade-form").find(".add-grade-field").each(function() {
        if (this.value.length == 0) {
            errors.push($(this).attr("id"));
        }
    });

    return errors;
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

    $("#form-type").remove();

    $("#add-grade-form .subgrade").empty();

}


/**
 *                                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input class="mdl-textfield__input" type="number" id="grade" name="grade"
                                               min="0">
                                        <label class="mdl-textfield__label" for="grade">Hinne</label>
                                        <span class="mdl-textfield__error">Hinne peab olema nullist suurem number.</span>
                                    </div>
 */
function openGradeAddingModal() {
    modalReady = false;
    clearGradeAddingModal();

    var currentTab = getCurrentTab();

    $.get("/get-grade-modal-content/?ex=" + currentTab, function (data) {
        createModalFields(data);
    }).done(function() {
        modalReady = true;
    });

    $(".custom-modal .ex-name").text(currentTab);
    var hiddenInput = '<input type="hidden" name="ex_name" value="' + currentTab + '"/>';
    $("#add-grade-form").append(hiddenInput);

    $("#grade-modal--add").css("display", "block");

    console.log("modal valmis")
    //
    // $("#exercise").empty();
    //
    // var options = getExerciseOptions();
    // if (options !== "") {
    //     console.log("focused");
    //     $(".select-container").addClass("is-focused is-filled");
    // } else {
    //     $(".select-container").removeClass("is-focused");
    // }
    // $("#exercise").append(options);
}

function createModalFields(data) {

    for (var i = 0; i < data.length; i++) {
        var field = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused">';
        field += '<input class="add-grade-field mdl-textfield__input" type="number" id="' + data[i].fields.name +'" name="grade_' + data[i].fields.name +'"min="0">';
        field += '<label class="mdl-textfield__label" for="' + data[i].fields.name +'">' + data[i].fields.name +'</label>';
        field += '<span class="mdl-textfield__error">Hinne peab olema nullist suurem number.</span>';

        $("#add-grade-form .subgrade").append(field);
    }
}


function getCurrentTab() {
    return $(".grade-tabs a.is-active").text();
}


/**
 *
 * @param text
 */
function addChip(text) {
    var $chip = $(".custom-chip.hidden").clone(true);
    console.log($chip);

    $($chip).prepend('<span class="chip-text">' + text + '</span>');

    $($chip).removeClass("hidden");
    $("#add-grade-form").prepend($chip);
    $("#find-student").val("");

    var hiddenInput = '<input type="hidden" name="student" id="' + text.split(" ").join("-") + '" value="' + text + '"/>';
    $("#add-grade-form .subgrade").append(hiddenInput);
}


