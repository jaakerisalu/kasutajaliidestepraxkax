var grades = [{"id":1,"Ülesanne":"ante","Hinne":4,"Kuupäev":"9/16/2015"},
{"id":2,"Ülesanne":"sapien in","Hinne":3,"Kuupäev":"3/22/2015"},
{"id":3,"Ülesanne":"rutrum rutrum","Hinne":3,"Kuupäev":"10/19/2015"},
{"id":4,"Ülesanne":"risus","Hinne":2,"Kuupäev":"4/29/2015"},
{"id":5,"Ülesanne":"placerat","Hinne":2,"Kuupäev":"10/1/2015"},
{"id":6,"Ülesanne":"ullamcorper augue","Hinne":5,"Kuupäev":"12/10/2015"},
{"id":7,"Ülesanne":"auctor","Hinne":5,"Kuupäev":"10/8/2015"},
{"id":8,"Ülesanne":"leo","Hinne":2,"Kuupäev":"1/16/2016"},
{"id":9,"Ülesanne":"malesuada in","Hinne":2,"Kuupäev":"5/13/2015"},
{"id":10,"Ülesanne":"donec","Hinne":4,"Kuupäev":"6/8/2015"},
{"id":11,"Ülesanne":"erat","Hinne":4,"Kuupäev":"8/14/2015"},
{"id":12,"Ülesanne":"turpis","Hinne":1,"Kuupäev":"4/2/2015"},
{"id":13,"Ülesanne":"leo","Hinne":5,"Kuupäev":"7/12/2015"},
];


$(document).ready(function() {
  for (var i = 0; i < grades.length; i++) {
    var row = "<tr>";
    row += '<td class="mdl-data-table__cell--non-numeric">' + grades[i].Ülesanne + "</td>";
    row += '<td class="mdl-data-table__cell--non-numeric">' + grades[i].Hinne + "</td>";
    row += '<td class="mdl-data-table__cell--non-numeric">' + grades[i].Kuupäev + "</td>";
    row += "</tr>"

    $("#grade-table tbody").append(row);
  }
});
