
// Cover Page Jquery

//scroll down from top arrow
$("#arrow").click(function() {
    $('html, body').animate({
        scrollTop: $("#feature-1").offset().top
    }, 2000);
})



$(document).ready(function() {
    var queryURL = "/api/currencies";
    // Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
            // Storing an array of results in the results variable
            var results = response;
            console.log(response);
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                var newBody = $("<tbody>");
                var newRow = $("<tr>");
                var newIcon = $("<td>");
                var newSpan = $("<span>");
                var newImg = $("<img>");
                newImg.attr("src", results[i].base_url + results[i].image_url);
                newSpan.append(newImg);
                newIcon.append(newSpan);
                var newID = $("<td>");
                newID.append(results[i].coin_id);
                var newName = $("<td>");
                newName.append(results[i].coin_name);
                var newValue = $("<td>");
                newValue.append(3);
                newBody.append(newRow);
                newBody.append(newIcon);
                newBody.append(newID);
                newBody.append(newValue);
                $("#market-table").append(newBody);
                // Only taking action if the photo has an appropriate rating
                /*if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div>");
                    // Storing the result item's rating
                    var rating = results[i].rating;
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);
                    // Creating an image tag
                    var personImage = $("<img>");
                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    personImage.attr("src", results[i].images.fixed_height.url);
                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                }*/
            }
        });
})