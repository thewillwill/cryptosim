//store the users current USD remaining balance;
var currentUSD;


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

    if ($("#usd-only").length > 0) {
      $.ajax({
          url:"/api/portfolio/1",
          method: "GET"
        }).done(function(response) {
          console.log(response);
          var usdBalance = 0;
          for (var i = 0; i < response.userHoldings.length; i++) {
            if (response.userHoldings[i].coinName == "USD") {
              usdBalance += response.userHoldings[i].currentValue;
              console.log('usdBalance', usdBalance)
            }
          }
          currentUSD = usdBalance;
          console.log('currentUSD', currentUSD);
          $("#usd-only").html(currencyFormat(currentUSD));
        });      
    }

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
                var $td3 = $("<td>").append(currencyFormat(results[i].marketCap));
                var $td4 = $("<td>").text(currencyFormat(results[i].price));

                var $td5 = $("<td>").append(results[i].volume24Hour);
                //get percentage change
                var pctChange = parseFloat(results[i].changePct24Hour).toFixed(2);
                //check if positive or negative and set class for CSS color styling
                if (pctChange >= 0) {
                    var pctChangeClass = "changePositive";
                } else {
                    pctChangeClass = "changeNegative";
                }
                var $td6 = $("<td>").append(pctChange + "%").addClass(pctChangeClass);

                //create the buy button with the coinID and current Price as data attributes
                var $td7 = $("<td>").append($("<btn>").attr({ "class": "btn btn-secondary buy-btn", 'data-coinID': results[i].key_id, 'data-price': results[i].price }).text("Buy"));
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
            url: "/api/portfolio/1", //TODO get userID from session storage
            method: "GET"
        }).done(function(response) {
            console.log('L62', 'response:', )

            //add rows to table body
            for (var i = 0; i < response.userHoldings.length; i++) {
                $("#networth").html(currencyFormat(response.currentNetWorth));
                $("#rank-networth").html(currencyFormat(response.currentNetWorth));


                console.log("userHolding[i]", response.userHoldings[i])
                var $row = $("<tr>");
                var $td1 = $("<td>").append($("<img>").attr({ "src": response.userHoldings[i].coinIcon, "class": "coin-icon" })).append(response.userHoldings[i].coinName);

                var $td2= $("<td>");
                $td2.append(response.userHoldings[i].userQty);
                var $td3 = $("<td>");
                $td3.append(currencyFormat(response.userHoldings[i].currentPrice));
                var $td4 = $("<td>");
                $td4.append(currencyFormat(response.userHoldings[i].currentValue));
                var $td5 = $("<td>");
                $td5.append(response.userHoldings[i].valueChange);
                var $td6 = $("<td>").append($("<btn>").attr({ "class": "btn btn-secondary sell-btn", 'data-coinID': response.userHoldings[i].coinName, 'data-price': response.userHoldings[i].currentPrice }).text("Sell"));
                $row.append($td1);
                $row.append($td2);
                $row.append($td3);
                $row.append($td4);
                $row.append($td5);
                $row.append($td6);
                $("#portfolio-table-body").append($row);
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
            for (var i = 0; i < response.length; i++) {
                var newRow = $("<tr>");
                var newDate = $("<td>");
                var time = response[i].updatedAt;
                time = time.replace("T", " ");
                time = time.replace(".000Z", "");
                newDate.append(time);
                var newCurrency = $("<td>");
                newCurrency.append(response[i].currency);
                var newType = $("<td>");
                newType.append(response[i].transactionType)
                var newPrice = $("<td>");
                newPrice.append(currencyFormat(response[i].pricePaid));
                var newAmount = $("<td>");
                newAmount.append(response[i].amount);
                var newTotal = $("<td>");
                //var total = response[i].pricePaid * response[i].amount;
                newTotal.append(currencyFormat(response[i].totalAmtUSD));
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
    // Market Page Buy Modals
    // ----------------------------

    $('body').on('click', '.buy-btn', function() {
        console.log("clicked on buy-btn for:", $(this).attr("data-coinID"));
        $("#buy-coinID").val($(this).attr("data-coinID"))
        $("#buy-ccPrice").val($(this).attr("data-price"))
        $("#buy-ccQuantity").val(0);
        $("#buy-ccQuantity").val(0);
        $("#buy-USDVAlue").val(0);
        $('#modal-buy').modal('show');

    });


    $('body').on('click', '#confirm-buy-order', function() {
        var ccPrice = parseFloat($("#buy-ccPrice").val());
        var USDValue = parseFloat($("#buy-USDValue").val());
        var coinID = $("#buy-coinID").val();
        var userID = parseFloat($("#buy-userID").val());
        var ccQuantity = parseFloat($("#buy-ccQuantity").val());
        console.log("clicked on confirm-purchase");
        var buyOrder = {
            "params": {
                "ccPrice": ccPrice,
                "USDValue": USDValue,
                "coinID": coinID,
                "userID": userID,
                "currentUSD": currentUSD - USDValue,
                "ccQuantity": ccQuantity
            }
        }
        console.log('buyOrder', buyOrder);
        // Send the POST request.
        $.ajax("/api/transaction/buy", {
            type: "POST",
            data: buyOrder
        }).then(
            function(data) {
                console.log("POST new buy request");
                $('#modal-buy').modal('hide');
                $("#purchaseResult").html(data);
                console.log("#modal-buy-confirm");
                $('#modal-buy-confirm').modal('show');
            }
        );

    });


    // Calculate Total Price of Buy Order
    // ----------------------------
    $("#buy-ccQuantity").keyup(function() {
        var qty = parseFloat($("#buy-ccQuantity").val());
        var price = parseFloat($("#buy-ccPrice").val())
        var total = qty * price;
        if (qty > 0 && price > 0) {
            $("#buy-USDValue").val(total);
        }
        else {
            $("#buy-USDValue").val(0);
        }
    });


    // Calculate Total Price of Buy Order
    // ----------------------------
    $("#buy-USDValue").keyup(function() {
        var total = parseFloat($("#buy-USDValue").val());
        var price = parseFloat($("#buy-ccPrice").val())
        var qty = total / price;

        if (total > 0 && price > 0) {
            $("#buy-ccQuantity").val(qty);
        }
        else {
            $("#buy-ccQuantity").val(0);
        }
    });


    $("#buy-ccQuantity").keyup(function() {
        var qty = parseFloat($("#buy-ccQuantity").val());
        var price = parseFloat($("#buy-ccPrice").val())
        var total = qty * price;
        if (qty > 0 && price > 0) {
            $("#buy-USDValue").val(total);
        }
        else {
            $("#buy-USDValue").val(0);
        }
    });


    // ----------------------------
    // Portfolio Page Sell Modals
    // ----------------------------

    $('body').on('click', '.sell-btn', function() {
        console.log("clicked on sell-btn for:", $(this).attr("data-coinID"));
        $("#sell-coinID").val($(this).attr("data-coinID"))
        $("#sell-ccPrice").val($(this).attr("data-price"))
        $("#sell-ccQuantity").val(0)
        $('#modal-sell').modal('show');

    });


    $('body').on('click', '#confirm-sell-order', function() {
        var ccPrice = parseFloat($("#sell-ccPrice").val());
        var USDValue = parseFloat($("#sell-USDValue").val());
        var coinID = $("#sell-coinID").val();
        var userID = parseFloat($("#sell-userID").val());
        var ccQuantity = parseFloat($("#sell-ccQuantity").val());
        var ccQuantity = parseFloat($("#sell-ccQuantity").val());
        console.log("clicked on confirm-sell");
        var sellOrder = {
            "params": {
                "ccPrice": ccPrice,
                "USDValue": USDValue,
                "coinID": coinID,
                "userID": userID,
                "currentUSD": currentUSD + USDValue,
                "ccQuantity": ccQuantity
            }
        }
        console.log('sellOrder', sellOrder);
        // Send the POST request.
        $.ajax("/api/transaction/sell", {
            type: "POST",
            data: sellOrder
        }).then(
            function(data) {
                console.log("POST new sell request");
                $('#modal-sell').modal('hide');
                $("#purchaseResult").html(data);
                console.log("#modal-sell-confirm");
                $('#modal-sell-confirm').modal('show');
            }
        );

    });

// Calculate Total Price of Buy Order
    // ----------------------------
    $("#sell-USDValue").keyup(function() {
        var total = parseFloat($("#sell-USDValue").val());
        var price = parseFloat($("#sell-ccPrice").val())
        var qty = total / price;

        if (total > 0 && price > 0) {
            $("#sell-ccQuantity").val(qty);
        }
        else {
            $("#sell-ccQuantity").val(0);
        }
    });


    $("#sell-ccQuantity").keyup(function() {
        var qty = parseFloat($("#sell-ccQuantity").val());
        var price = parseFloat($("#sell-ccPrice").val())
        var total = qty * price;
        if (qty > 0 && price > 0) {
            $("#sell-USDValue").val(total);
        }
        else {
            $("#sell-USDValue").val(0);
        }
    });


    // ----------------------------
    // Preferences Page
    // ----------------------------

    //check if preferences form exsists
    if ($('#preferencesForm').length) {

        //get the user info
        $.ajax({
            url: "/api/user/1", //need to dynamically get user id in the future
            method: "GET"
        }).done(function(res) {

            //populate the form fields
            $("#pref-name").attr({
                value: res[0].name
            });
            $("#pref-email").attr({
                value: res[0].email
            });
        });
    }

    //check for submit of user preferences form
    $("#pref-submit").click(function() {
        event.preventDefault();
        console.log("form submitted")
    })

});


function currencyFormat(value) {
    return "$" + parseFloat(value, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}