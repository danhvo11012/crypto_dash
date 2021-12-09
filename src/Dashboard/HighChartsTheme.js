import { lightTheme } from "../Shared/Styles";

export default {
    colors: [
        '#61d936',
        '#552ccb',
        '#1163c9', 
        '#04A1EE', 
        '#08C6E0', 
        '#146B9E',
        '#F376C1', 
        '#1B2839'],

    chart: {
        backgroundColor: lightTheme ? 'white' : '#061a44',
        borderColor: '#000000',
        borderWidth: 0,
        className: 'dark-container',
        plotBackgroundColor: lightTheme ? 'white' : '#061a44',
        plotBorderColor: '#CCCCCC',
        plotBorderWidth: 0
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
    },

    yAxis: {
        gridLineWidth: 0,
        title: {
            text: 'Price'
        }
    },

    xAxis: {
        gridLineColor: '#333333',
        gridLineWidth: 0,
        accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
        }
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    credits: {
        enabled: false
    },

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