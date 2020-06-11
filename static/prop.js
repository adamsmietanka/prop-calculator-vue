const submit = $('#prop-submit');

function draw_charts(graphs) {
    if ($('#chart1').html() === '') {
        Plotly.plot("chart1", graphs['1']);
        Plotly.plot("chart2", graphs['2']);
    } else {
        const layout1 = document.querySelector('#chart1').layout;
        const layout2 = document.querySelector('#chart2').layout;
        Plotly.newPlot("chart1", graphs['1'].data, layout1);
        Plotly.newPlot("chart2", graphs['2'].data, layout2);
    }
}

function prepare_table(data) {
    let table = document.querySelector("#prop-table");
    let data_header = Object.keys(data[0]);

    generateTable(table, data);
    generateTableHead(table, data_header);
}

function generateTable(table, data) {
    table.innerHTML = "";
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            if (element.hasOwnProperty(key)) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
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
        success: (data) => {
            submit.val('Update');
            if (data.hasOwnProperty("error"))
                $('.toast').toast('show');
            else {
                $('#landing').hide();
                $('#prop-data').show();
                data = JSON.parse(data);
                draw_charts(data);
                prepare_table(data.table);
            }
        }
    });
}

submit.on('click', (event) => {
    submit.val('Computing...');
    let formData = new FormData(document.querySelector('#prop-form'));

    send_form(formData);
    event.preventDefault();
});
