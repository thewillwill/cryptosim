var dates = [];
var netWorths = [10000, 70000, 30000, 40000, 10000, 20000, 90000];
//to be replaced with user specific api data
for (var i = 6; i >= 0; i--) {
    var day = moment().subtract(i, "days").format("MMM Do YY");
    dates.push(day);
    $("#tres").append(dates);
}

$(document).ready(function() {
    //set the tablesorter plugin to initialise on market-table
    $("#market-table").tablesorter();

    //get the currencies json object
    var queryURL = "/api/currencies";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response;

        //add rows to table
        for (var i = 0; i < results.length; i++) {
            var $row = $("<tr>");
            var $td1 = $("<td>").append($("<img>").attr({"src": results[i].base_url + results[i].image_url, "class": "coin-icon"})).append(results[i].coin_name);
            var $td2 = $("<td>").append(results[i].symbol);
            var $td3 = $("<td>").append("$" + results[i].price);
            var pctChange = parseInt(results[i].changePct24Hour).toFixed(2);
            if (pctChange >=0) {
                var pctChangeClass = "changePositive";
            }
            else { 
                pctChangeClass = "changeNegative";
            }
            var $td4 = $("<td>").append(pctChange + "%").addClass(pctChangeClass);

            $row.append($td1);
            $row.append($td2);
            $row.append($td3);
            $row.append($td4);
            $("#market-table-body").append($row);

        }
        console.log('after for loop: ');
        $("#market-table").trigger("update");
        console.log('after trigger(update) ');


    });


    if ($('#summaryChart').length > 0) {
        var ctx = document.getElementById("summaryChart").getContext('2d');
        var summaryChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Profit and Loss Summary',
                    data: netWorths,
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
                responsive: true,
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            steps: 2000

                        }
                    }]
                }
            }
        });
    }



    console.log('$', "#portfolio-table");
    $("#portfolio-table").tablesorter();

    // Cover Page Jquery
    //scroll down from top arrow
    $("#arrow").click(function() {
        $('html, body').animate({
            scrollTop: $("#feature-1").offset().top
        }, 2000);
    })

});
