var dates = [];
var netWorths = [10000, 70000, 30000, 40000, 10000, 20000, 90000];
//to be replaced with user specific api data
for (var i = 6; i >= 0; i--) {
    var day = moment().subtract(i, "days").format("MMM Do YY");
    dates.push(day);
}

$(document).ready(function() {
    //set the tablesorter plugin to initialise on market-table
    $("#market-table").tablesorter();
    //get the currencies from json object
    $.ajax({
        url: "/api/currencies",
        method: "GET"
    }).done(function(response) {
        var results = response;
        //add rows to table body
        for (var i = 0; i < results.length; i++) {
            var newRow = $("<tr>");
            var newIcon = $("<td>");
            var newSpan = $("<span>");
            var newImg = $("<img>");
            newImg.attr("src", results[i].base_url + results[i].image_url).attr("height", "35px").attr("width", "35px");
            newSpan.append(newImg);
            newIcon.append(newSpan);
            var newID = $("<td>");
            newID.append(results[i].coin_id);
            var newName = $("<td>");
            newName.append(results[i].coin_name);
            var newValue = $("<td>");
            newValue.append(10);
            newRow.append(newIcon);
            newRow.append(newID);
            newRow.append(newName);
            newRow.append(newValue);
            $("#market-table-body").append(newRow);
        }
        $("#market-table").trigger("update");
    });

    $("#portfolio-table").tablesorter();
    //get the currencies from json object
    $.ajax({
        url: "api/portfolio/:id",
        method: "GET"
    }).done(function(response) {
        var results = response;
        //add rows to table body
        for (var i = 0; i < results.length; i++) {
            var newRow = $("<tr>");
            var newIcon = $("<td>");
            var newSpan = $("<span>");
            var newImg = $("<img>");
            newImg.attr("src", results.userHoldings[i].coinIcon).attr("height", "35px").attr("width", "35px");
            newSpan.append(newImg);
            newIcon.append(newSpan);
            var newName = $("<td>");
            newName.append(results[i].coin_name);
            var newAmount = $("<td>");
            newAmount.append(results[i].userQty);
            var newValue = $("<td>");
            newValue.append(results[i].currentPrice);
            var totalValue = $("<td>");
            totalValue.append(results[i].currentValue);
            var newChange = $("<td>");
            newChange.append(results[i].valueChange);
            newRow.append(newIcon);
            newRow.append(newName);
            newRow.append(newAmount);
            newRow.append(newValue);
            newRow.append(totalValue);
            newRow.append(newChange);
            $("#portfolio-table-body").append(newRow);
        }
        $("#portfolio-table").trigger("update");
    });

    $("#trades-table").tablesorter();
    //get the currencies from json object
    $.ajax({
        url: "/api/currencies",
        //   "/api/user-last-trades/:id"
        method: "GET"
    }).done(function(response) {
        var results = response;
        //add rows to table body
        for (var i = 0; i < results.length; i++) {
            var newRow = $("<tr>");
            var newDate = $("<td>");
            newDate.append(results[i].updatedAt);
            var newCurrency = $("<td>");
            newCurrency.append(results[i].currency);
            var newType = $("<td>");
            newType.append(results[i].transaction_type)
            var newPrice = $("<td>");
            newPrice.append(results[i].price_paid);
            var newAmount = $("<td>");
            newAmount.append(results[i].amount);
            var newTotal = $("<td>");
            var total = results[i].price_paid * results[i].amount;
            newTotal.append(total);
            newRow.append(newDate);
            newRow.append(newCurrency);
            newRow.append(newType);
            newRow.append(newPrice);
            newRow.append(newAmount);
            newRow.append(newTotal);
            $("#trades-table-body").append(newRow);
        }
        $("#trades-table").trigger("update");
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
    // Cover Page Jquery
    //scroll down from top arrow
    $("#arrow").click(function() {
        $('html, body').animate({
            scrollTop: $("#feature-1").offset().top
        }, 2000);
    })
});