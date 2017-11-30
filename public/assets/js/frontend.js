var dates = [];
var price = [10000, 70000, 30000, 40000, 10000, 20000, 90000]; /*subject to change*/
for (var i = 6; i >= 0; i--) {
    var day = moment().subtract(i, "days").format("MMM Do YY");
    dates.push(day);
    console.log(dates);
    $("#tres").append(dates);
}

var ctx = document.getElementById("summaryChart").getContext('2d');
var summaryChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        /*x-axis, uses array of last 7 days*/
        datasets: [{
            label: 'Profit and Loss Summary',
            data: price,
            /*y-axis, to be replaced with the current total value of user*/
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    steps: 2000,
                    max: 100000
                }
            }]
        }
    }
});