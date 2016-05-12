/**
 *
 */
$("#exercise-list").ready(function() {
    populateExerciseList();

    $("#new-ex-name").keydown(function (e) {
        if (e.which == 13) {
            if (validateNewEx('new-ex-container')) {
                var name = $("#new-ex-name").val();
                if (name.trim() != 0) {
                    exercises.push(name);
                    $("#add-new-exercise-link").before(createExRow(name));
                    $("#new-ex-name").val("");
                    initEditClickListeners();
                }
            }
        }
    });

    initEditClickListeners();
});

/**
 *
 */
var oldExValue;
function initEditClickListeners() {
    console.log("init called");
    $(".edit-exercise").click(function () {
        if ($("#removable-element").length) {
            $("#cancel-edit").click();
        }

        oldExValue = $(this).next(".ex-name-span").text();
        console.log(oldExValue);

        $("#edit-exercise-field").val(oldExValue);
        $(this).next(".ex-name-span").replaceWith($("#hidden-text-field").clone(true).attr('id', 'removable-element'));
    });


    $("#cancel-edit").click(function () {
        $("#removable-element").replaceWith('<span class="ex-name-span">' + oldExValue + '</span>');
    });

    $("#delete-edit").click(function () {
        if (exercises.length === 1) {
            notie.alert(3, 'Ära päris kõiki ka eemalda, eks!', 2);
            return;
        }
        exercises.every(function(ex, i) {
            if (ex == oldExValue) {
                $("#removable-element").parents("li.mdl-list__item").remove();
                exercises.splice(i, 1);
                return false;
            } else {
                return true;
            }
        })
    });


    $("#save-edit").click(function () {
        var newVal = $("#edit-exercise-field").val();
        var index = exercises.indexOf(oldExValue);

        exercises[index] = newVal;
        $("#removable-element").replaceWith('<span class="ex-name-span">' + newVal + '</span>');
    });


    $("#edit-exercise-field").keydown(function (e) {
        if (e.which == 13) {
            if (validateNewEx('edit-exercise-field')) {
                $("#save-edit").click();
            }
        }
    });
}


/**
 *
 */
function populateExerciseList() {
    console.log("populate");
    for (var i = 0; i < exercises.length; i++) {
        $("#add-new-exercise-link").before(createExRow(exercises[i]));
    }
}


/**
 *
 * @param ex
 * @returns {string}
 */
function createExRow(ex) {
    // var row = '<li class="mdl-list__item">';
    // row += '<span class="mdl-list__item-primary-content">';
    // row += '<i class="material-icons mdl-list__item-icon edit-exercise">create</i>';
    // row += '<span class="ex-name-span">' + ex + '</span>';
    // row += '</span></li>';
    // return row;
}


/**
 *
 * @param id
 * @returns {boolean}
 */
function validateNewEx(id) {
    return !$("#" + id + "").hasClass("is-invalid");
}
