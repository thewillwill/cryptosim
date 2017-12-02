var dates = [];
var netWorths = [10000, 70000, 30000, 40000, 10000, 20000, 90000];
//to be replaced with user specific api data
for (var i = 6; i >= 0; i--) {
    var day = moment().subtract(i, "days").format("MMM Do YY");
    dates.push(day);
    $("#tres").append(dates);
}

$(document).ready(function() {


    // ----------------------------
    // Market Page 
    // ----------------------------

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
            //insert the icon and name
            var $td1 = $("<td>").append($("<img>").attr({ "src": results[i].base_url + results[i].image_url, "class": "coin-icon" })).append(results[i].coin_name);
            var $td2 = $("<td>").append(results[i].symbol);
            var marketCapFormated = '$' + parseFloat(results[i].marketCap, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
            var $td3 = $("<td>").append(marketCapFormated);
            var priceFormated = '$' + parseFloat(results[i].price, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
            var $td4 = $("<td>").text(priceFormated);

            var $td5 = $("<td>").append(results[i].volume24Hour);
            //get percentage change           
            var pctChange = parseInt(results[i].changePct24Hour).toFixed(2);
            //check if positive or negative and set class for CSS color styling
            if (pctChange >= 0) {
                var pctChangeClass = "changePositive";
            } else {
                pctChangeClass = "changeNegative";
            }
            var $td6 = $("<td>").append(pctChange + "%").addClass(pctChangeClass);
            //create the buy button with the coinID as a data attribute
            var $td7 = $("<td>").append($("<btn>").attr({"class":"btn btn-secondary buy-btn",'data-coin-id': results[i].key_id, "data-toggle": "modal", "data-target": "modal-buy"}).text("Buy"));
            $row.append($td1).append($td2).append($td3).append($td4).append($td5).append($td6).append($td7);
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

 $(".buy-btn").click(function() {
        $('html, body').animate({
            scrollTop: $("#feature-1").offset().top
        }, 2000);
    })




    // ----------------------------
    // Cover Page 
    // ----------------------------

    //scroll down from Top arrow
    $("#arrow").click(function() {
        $('html, body').animate({
            scrollTop: $("#feature-1").offset().top
        }, 2000);
    })

});