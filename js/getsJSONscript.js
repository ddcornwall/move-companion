
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

        // load streetview

    // YOUR CODE GOES HERE!
    var street = $("#street").val();
    var city = $("#city").val();
    var loc = street + ',' + city;
    $greeting.text('I want to live at ' + loc);
    var streetviewURL= "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + loc;

    $body.append('<img class="bgimg" src = "' + streetviewURL + '">');

// load New York Times
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "c353bf1d863d49d58b41e9834e85b260",
  'fq': "glocations:(" + city  + ")",
    'sort': "newest"
});
console.log(url);
$.getJSON(url, function (data) {
console.log(data);
});



    return false;

};

$('#form-container').submit(loadData);
