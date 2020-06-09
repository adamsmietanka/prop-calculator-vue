const submit = $('#prop-submit')

submit.click(function(event){
    let formData = new FormData(document.getElementById('prop-form'));

    send_form(formData);
    event.preventDefault();
});

function draw_charts(data) {
    // console.log(data);
    let graph1 = data['1'];
    let graph2 = data['2'];
    if (submit.val() === 'Update') {
        let layout1 = document.getElementById('chart1').layout;
        let layout2 = document.getElementById('chart2').layout;
        Plotly.newPlot("chart1", graph1.data, layout1);
        Plotly.newPlot("chart2", graph2.data, layout2);
    } else {
        submit.val('Update');
        Plotly.plot("chart1", graph1, {});
        Plotly.plot("chart2", graph2, {});
    }
}

function prepare_table(data) {
    let table = document.querySelector("table");
    let data_header = Object.keys(data[0]);

    generateTable(table, data);
    generateTableHead(table, data_header);
}

function generateTable(table, data) {
    table.innerHTML = "";
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function send_form(formData) {
    $.ajax({
        url: '/prop-data',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.hasOwnProperty("error")) {
                $('.toast').toast('show');
            }
            else {
                $('.text-column').hide();
                data = JSON.parse(data)
                draw_charts(data);
                prepare_table(data.table);
            }
        },
        error: function(data) {
        }
    });
}

$(function hideInput() {
    $('input:radio[name="blade_type"]').change(function() {
        if ($(this).val() === 'var') {
            $('#angle-input').hide();
            $('#speed-input').hide();
            $('#power-coefficient-input').show();
        } else {
            $('#angle-input').show();
            $('#speed-input').show();
            $('#power-coefficient-input').hide();
        }
    });
});