fetch(`data_volumetric.json`).then((r) => r.json()).then((data) => {
  var table = document.getElementById('volumetric-dashboard');

  var col = ['name', 'zone_type', 'result', 'status']

  for (var i = 0; i < data.length; i++) {
    var result_text = `${ (data[i]['total'] != -1)
      ? data[i]['total']
      : "??"} `
    result_text += `<br>(expected : ${data[i]['expected_min']} ~ ${data[i]['expected_max']})`

    var status = ''
    if (data[i]['test_status'] == 'ok') {
      status = '✅'
      status += (data[i]['is_known_failure'] == "yes")
        ? " 😍 "
        : "✅";
    }
    if (data[i]['test_status'] == 'ko') {
      status += (data[i]['is_known_failure'] == "yes")
        ? "📉"
        : "❎❎";
    }
    if (data[i]['test_status'] == 'skip') {
      status = '🤔'
    }

    var tr = table.insertRow(-1);
    tr.insertCell(-1).innerHTML = data[i]['name']
    tr.insertCell(-1).innerHTML = data[i]['zone_type']
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = result_text;
    tr.insertCell(-1).innerHTML = status

  }
  var header = table.createTHead();
  var trh = header.insertRow(0);
  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = col[i];
    trh.appendChild(th);
  }

})