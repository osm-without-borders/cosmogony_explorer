const dashTable = document.getElementById('volumetric-dashboard')
const columnHeads = ['Name', 'Zone type', 'Result', 'Status']

let showData = async () => {

  let tableBody = data.map((dataRow) => {
    let resultText = (`${ (dataRow.total !== -1)
      ? dataRow.total
      : " - "} `) + `<p class="result__expected">(expected : ${dataRow.expected_min} ~ ${dataRow.expected_max})</p>`

    let isSuccess = true

    let status = ''
    if (dataRow.test_status === 'ok') {
      status = ico('check')
      status += (dataRow.is_known_failure === "yes")
        ? ico('umbrella')
        : ico('check')
    }
    if (dataRow.test_status === 'ko') {
      isSuccess  = false
      status += (dataRow.is_known_failure === "yes")
        ? ico('x') + '<br><span class="status_detail">known failure</span>'
        : ico('x')
    }
    if (dataRow.test_status === 'skip') {
      status = ico('cloud-off') + '<br><span class="status_detail">skipped</span>'
    }

    return `<tr class="${isSuccess ? 'ok_column' : 'ko_column'}">
  <td class="result__name">${dataRow.name}</td>
  <td>${dataRow.zone_type}</td>
  <td class="result__monitor">${resultText}</td>
  <td>${status}</td>
</tr>`
  })
  dashTable.innerHTML = `<thead>${tableHead.join('\n')}</thead><tbody>${tableBody.join('\n')}</tbody>`
  sorttable.makeSortable(dashTable)

}

function ico(name) {
  return `<span class="icon-${name}"></span>`
}

showData()
