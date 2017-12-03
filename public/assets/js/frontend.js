var dates = [];
var netWorths = [];
//to be replaced with user specific api data
for (var i = 6; i >= 0; i--) {
    var day = moment().subtract(i, "days").format("MMM Do YY");
    dates.push(day);
}

$(document).ready(function() {
    // ----------------------------
    // Market Page
    // ----------------------------
    if ($('#market-table').length > 0) {
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
                var $td7 = $("<td>").append($("<btn>").attr({ "class": "btn btn-secondary buy-btn", 'data-coin-id': results[i].key_id }).text("Buy"));
                $row.append($td1).append($td2).append($td3).append($td4).append($td5).append($td6).append($td7);
                $("#market-table-body").append($row);
            }
            $("#market-table").trigger("update");
        });
    }

    // ----------------------------
    // Portfolio Page
    // ----------------------------


    if ($('#portfolio-table').length > 0) {
        $("#portfolio-table").tablesorter();

        console.log("------------ getting portfolio data ------------");
        //get the currencies from json object
        $.ajax({
            url: "api/portfolio/1",    //TODO get userID from session storage
            method: "GET"
        }).done(function(response) {
          console.log('L62', 'response:', )

            //add rows to table body
            for (var i = 0; i < response.userHoldings.length; i++) {
                console.log("userHolding[i]",response.userHoldings[i])
                var newRow = $("<tr>");
                var newIcon = $("<td>");
                var newSpan = $("<span>");
                var newImg = $("<img>");
                newImg.attr("src", response.userHoldings[i].coinIcon).attr("height", "35px").attr("width", "35px");
                newSpan.append(newImg);
                newIcon.append(newSpan);
                var newName = $("<td>");
                newName.append(response.userHoldings[i].coinName);
                var newAmount = $("<td>");
                newAmount.append(response.userHoldings[i].userQty);
                var newValue = $("<td>");
                newValue.append(response.userHoldings[i].currentPrice);
                var totalValue = $("<td>");
                totalValue.append(response.userHoldings[i].currentValue);
                var newChange = $("<td>");
                newChange.append(response.userHoldings[i].valueChange);
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
    }

    if ($('#trades-table').length > 0) {

        // Build the Portofolio Historical Net Worth Chart
        $("#trades-table").tablesorter();
        //get the currencies from json object
        $.ajax({
            url: "/api/user-last-trades/1", //TODO get userID from session storage
            method: "GET"
        }).done(function(response) {
            console.log(response);
            //add rows to table body
            for (var i = 0; i < response.length; i++) {
                var newRow = $("<tr>");
                var newDate = $("<td>");
                newDate.append(response[i].updatedAt);
                var newCurrency = $("<td>");
                newCurrency.append(response[i].currency);
                var newType = $("<td>");
                newType.append(response[i].transactionType)
                var newPrice = $("<td>");
                newPrice.append(response[i].pricePaid);
                var newAmount = $("<td>");
                newAmount.append(response[i].amount);
                var newTotal = $("<td>");
                //var total = response[i].pricePaid * response[i].amount;
                newTotal.append(response[i].totalAmtUSD);
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
    }

    if ($('#summaryChart').length > 0) {
        $.ajax({
            url: "/api/portfolio/1",
            method: "GET"
        }).done(function(response) {
            console.log(response.averageNetWorths);
            netWorths = response.averageNetWorths;
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
        });
       
    }
    // ----------------------------
    // Cover Page
    // ----------------------------


    // Cover Page Jquery
    //scroll down from top arrow
    $("#arrow").click(function() {
        $('html, body').animate({
            scrollTop: $("#feature-1").offset().top
        }, 2000);
    })




    // ----------------------------
    // Market Page Buy Modal
    // ----------------------------

    $('body').on('click', '.buy-btn', function() {
        console.log("clicked on buy-btn");
        $('.modal-buy').modal('show')
        $('#buy-content').append($(".buy-btn").attr("data-coin-id"));
    });

    // ----------------------------
    // DAVE - this is the code that creates the buy-object data and sends it to /api/transaction/buy route
    // ----------------------------


    $('body').on('click', '#confirm-order', function() {
        var ccPrice = parseInt($("#ccPrice").val());
        var USDValue = parseInt($("#USDValue").val());
        var coinID = $("#coinID").val();
        var userID = parseInt($("#userID").val());
        var currentUSD = parseInt($("#currentUSD").val());
        var ccQuantity = parseInt($("#ccQuantity").val());
        console.log("clicked on confirm-purchase");
        var buyOrder = {
            "params": {
                "ccPrice": ccPrice,
                "USDValue": USDValue,
                "coinID": coinID,
                "userID": userID,
                "currentUSD": currentUSD,
                "ccQuantity": ccQuantity
            }
        }
        console.log('buyOrder', buyOrder);
        // Send the POST request.
        $.ajax("/api/transaction/buy", {
            type: "POST",
            data: buyOrder
        }).then(
            function() {
                console.log("POST new buy request");
                $('.modal-buy').modal('hide')
                $("#purchaseResult").html(data);
                $('.modal-confirm').modal('show')
            }
        );

    });

    // ----------------------------
    // Preferences Page
    // ----------------------------

    //check if preferences form exsists
    if ($('#preferencesForm').length) {

        //get the user info
        $.ajax({
            url: "/api/user/1",              //need to dynamically get user id in the future
            method: "GET"
        }).done(function(res) {

            //populate the form fields
            $("#pref-name").attr({value: res[0].name});
            $("#pref-email").attr({value: res[0].email});
        });
    }

    //check for submit of user preferences form
    $("#pref-submit").click(function() {
       event.preventDefault();
       console.log("form submitted")
    })


});
