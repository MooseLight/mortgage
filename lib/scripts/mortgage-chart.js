function RenderMortgageChart(yearsArray, principalRemainingArray, InterestPaidArray){
    var ctx = document.getElementById('myChart').getContext('2d');
    
    var chartData = {
        labels: yearsArray,
        datasets: [
            {
                label: 'Principal Remaining',
                data: principalRemainingArray,
                backgroundColor: 'rgba(255, 0, 0, 0.5)'
            },
            {
                label: 'Interest Paid',
                data: InterestPaidArray,
                backgroundColor: 'rgba(0, 0, 255, 0.2)'
            }
        ]
    };

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            maintainAspectRatio : true,
            responsive: true
        }
    });
}