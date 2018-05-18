const dashTable = document.getElementById('volumetric-dashboard')
const columnHeads = ['Name', 'Zone type', 'Result', 'Status']

let showData = async () => {
  let rawResponse = await fetch(`/test/data.json`)
  let data = await rawResponse.json()
  let tableHead = columnHeads.map((columnHead) => {
    return `<th>${columnHead}</th>`
  })

  let tableBody = data.map((dataRow) => {
    let resultText = `${ (dataRow.total !== -1)
      ? dataRow.total
      : "??"} `
    resultText += `<br>(expected : ${dataRow.expected_min} ~ ${dataRow.expected_max})`

    let status = ''
    if (dataRow.test_status === 'ok') {
      status = '✅'
      status += (dataRow.is_known_failure === "yes")
        ? " 😍 "
        : "✅";
    }
    if (dataRow.test_status === 'ko') {
      status += (dataRow.is_known_failure === "yes")
        ? "📉"
        : "❎❎";
    }
    if (dataRow.test_status === 'skip') {
      status = '🤔'
    }

    return `<tr>
  <td>${dataRow.name}</td>
  <td>${dataRow.zone_type}</td>
  <td>${resultText}</td>
  <td>${status}</td>
</tr>`
  })
  dashTable.innerHTML = `<thead>${tableHead.join('\n')}</thead><tbody>${tableBody.join('\n')}</tbody>`
  sorttable.makeSortable(dashTable)

}

showData()
