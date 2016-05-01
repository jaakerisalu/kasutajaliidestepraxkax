/**
 *
 * @param student
 * @param index
 * @returns {string}
 */
function createTableRow(student) {
    console.log("create");
    var line = '<tr id="row' + student.matricule + '">';
    line += '<td id="table-firstname-col" class="mdl-data-table__cell--non-numeric fullwidth">' + student.first_name + '</td>';
    line += '<td id="table-lastname-col" class="mdl-data-table__cell--non-numeric fullwidth">' + student.last_name + '</td>';
    line += '<td id="table-matricule-col" class="mdl-data-table__cell--non-numeric fullwidth">' + student.matricule + '</td>';
    line += '<td class="mdl-data-table__cell--non-numeric fullwidth delete-column">' +
        '<span class="glyphicon glyphicon-trash delete-student" data-del="' + student.matricule  + '"></span></td>';
    line += "</tr>";

    return line;
}


/**
 *
 */
function clearAddStudentForm() {
    $("#add-firstname").val("");
    $("#add-lastname").val("");
    $("#add-matricule").val("");
}


/**
 *
 */
function clearEditStudentForm() {
    $("#edit-firstname").val("");
    $("#edit-lastname").val("");
    $("#edit-matricule").val("");
    $(".modal-submit-button").html("Lisa");
}


/**
 *
 */
$("#students-table-body").ready(function() {
    for (var i = 0; i < students.length; i++) {
        $("#students-table-body").append(createTableRow(students[i], i));
    }

    initListeners();
});


/**
 *
 */
function initListeners() {
    $("#add-student-form").submit(function(e) {
        e.preventDefault();

        var firstname = $("#add-firstname").val();
        var lastname = $("#add-lastname").val();
        var matricule = $("#add-matricule").val();

        var errors = checkEmptyValues("add");
        console.log(errors);
        if (errors.length > 0) {
            errors.forEach(function (entry) {
                $("#add-student-form #add-" + entry).closest("div.mdl-textfield").addClass("is-invalid");
            });

        } else {
            students.push({
                first_name: firstname,
                last_name: lastname,
                matricule: matricule,
                lab1: 0,
                lab2: 0,
                hw1: 0
            });

            clearAddStudentForm();
            $(".custom-modal").css("display", "none");
            console.log(students[students.length - 1]);

            $("#students-table-body").append(createTableRow(students[students.length - 1], students.length));
        }

    });


    $("#edit-student-form").submit(function(e) {
        e.preventDefault();

        var firstname = $("#edit-firstname").val();
        var lastname = $("#edit-lastname").val();
        var matricule = $("#edit-matricule").val();

        var errors = checkEmptyValues("edit");
        console.log(errors);
        if (errors.length > 0) {

            errors.forEach(function (entry) {
                console.log(entry, ("#add-student-form #edit-" + entry));
                $("#edit-student-form #edit-" + entry).closest(".mdl-textfield").addClass("is-invalid");
            });

        } else {
            students[editableIndex].first_name = firstname;
            students[editableIndex].last_name = lastname;
            students[editableIndex].matricule = matricule;

            $($editableField).find("#table-firstname-col").text(firstname);
            $($editableField).find("#table-lastname-col").text(lastname);
            $($editableField).find("#table-matricule-col").text(matricule);

            clearEditStudentForm();
            $(".custom-modal").css("display", "none");
        }

    });


    $("#add-modal-open").click(function() {
        $(".modal-submit-button").html("Lisa");
        $("#custom-modal--add").css("display", "block");
    });


    $(".custom-modal-close").click(function() {
        $(".custom-modal").css("display", "none");
    });


    $(window).click(function(e) {
        if ($(e.target).is($(".custom-modal"))) {
            $(".custom-modal").css("display", "none");
        }
    });

    $(".delete-student").click(function(e) {
        e.stopPropagation();
        const studentId = $(this).data("del");
        const proceed = confirm("Oled sa kindel?");
        if (proceed) {
            students.every(function(entry, i) {
                if (entry.matricule == studentId) {
                    console.log("Deleting " + entry.first_name);
                    $("#row" + studentId).remove();
                    students.splice(i, 1);
                    return false
                } else {
                    return true
                }
            });
        }
    });


    $("#students-table-body tr").click(function() {
        var matricule = $(this).find("td#table-matricule-col").text();
        console.log(matricule);
        editStudent(matricule, this);
    });


// FILTER
    $("#search-input").bind('keyup', function(){
        console.log("up");
        var _this = this;
        // Show only matching TR, hide rest of them
        $.each($("#students-table-body tr"), function() {
            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });
}


/**
 *
 */
function checkEmptyValues(prefix) {
    var errors = [];
    if ($("#" + prefix +"-firstname").val().trim() == "") {
        errors.push("firstname");
    }

    if ($("#" + prefix +"-lastname").val().trim() == "") {
        errors.push("lastname");
    }

    if ($("#" + prefix +"-matricule").val().trim() == "") {
        errors.push("matricule");
    }

    return errors;
}


/**
 *
 * @param matricule
 * @param elem
 */
function editStudent(matricule, elem) {
    students.every(function(entry, i) {
        console.log(entry.matricule.toString(), matricule);
        if (entry.matricule == matricule) {
            openEditModal(i, elem);
            return false;
        } else {
            return true;
        }
    });

}

// Check modal inputs to see if they're filled or not
$("#edit-firstname, #edit-lastname, #edit-matricule").keyup(function(){
    if ($(this).val().trim().length != 0) {
        if (!$(this).parent().hasClass("is-filled")) {
            $(this).parent().addClass("is-filled");
        }
    } else if ($(this).parent().hasClass("is-filled")) {
        $(this).parent().removeClass("is-filled");
    }
});


/**
 *
 * @param index
 * @param elem
 */
function openEditModal(index, elem) {

    editableIndex = index;
    $editableField = elem;

    $("#custom-modal--edit").css("display", "block");

    $("#edit-firstname").val(students[index].first_name);
    $("#edit-firstname").parent().addClass("is-focused is-filled");

    $("#edit-lastname").val(students[index].last_name);
    $("#edit-lastname").parent().addClass("is-focused is-filled");

    $("#edit-matricule").val(students[index].matricule);
    $("#edit-matricule").parent().addClass("is-focused is-filled");

    $(".modal-submit-button").html("Muuda");
}

