var _ = require('lodash');

export default function highChartsConfig(historicalData) {

  return {
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010
      }
    },

    title: {
      text: ''
    },

    xAxis: {
      type: 'datetime'
    },

    series: historicalData,

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  }
}