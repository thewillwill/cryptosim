var dates = [];
var price = [1, 7, 6, 4, 10, 2, 7];
for (var i = 6; i >= 0; i--) {
    var day = moment().subtract(i, "days").format("MMM Do YY");
    dates.push(day);
    console.log(dates);
}
