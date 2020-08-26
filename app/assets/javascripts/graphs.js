document.addEventListener('turbolinks:load', () => {

  // 「折れ線」グラフのデータ
  let lineLabel = gon.chart_label
  let lineData = gon.chart_data

  // カレンダーの表示
  flatpickr('#date-form')
  const TODAY = new Date(new Date().setHours(0, 0, 0, 0))
  const A_MONTH_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, TODAY.getDate())

  // 選択できない日付データ
  const DISABLE_DATES = ['2019-12-10', '2019-12-20', '2019-12-30', '2020-01-10', '2020-1-20', '2020-01-30']

  // カレンダーの日本語化
  flatpickr.localize(flatpickr.l10ns.ja)

  // カレンダーの表示
  flatpickr('#date-form', {
    // スマートフォンでもカレンダーに「flatpickr」を使用
    disableMobile: true,
    // 1ヶ月前から本日まで選択可
    minDate: A_MONTH_AGO,
    maxDate: TODAY,
    // 選択できない日付
    disable: DISABLE_DATES
  })

  // 折れ線グラフのオプション
  const lineChartData = {
    labels: lineLabel,
    datasets: [{
      label: '体重(kg)',
      data: lineData,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      spanGaps: true
    }]
  }

  const lineChartOption = {
    title: {
      display: true,
      text: '折れ線グラフ'
    },
    tooltips: {
      callbacks: {
        // ホバー（スマホならタップ）時のラベル表示を変更
        title: function (tooltipItems) {
          return tooltipItems[0].xLabel.replace(/^(\d+).(\d+)$/, ' $1 月 $2 日')
        },
        label: function (tooltipItem) {
          return '体重: ' + tooltipItem.yLabel + 'kg'
        }
      }
    }
  }

  const lineChartContext = document.getElementById("line-chart").getContext('2d')
  new Chart(lineChartContext, {
    type: 'line',
    data: lineChartData,
    options: lineChartOption
  })

})