
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //testing putting js into html
    //$(".content .value").html("World!");

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
  'fl': "headline,byline,snippet,web_url,word_count",
  'fq': "glocations:(" + city  + ")",
    'sort': "newest"
});
console.log(url);
$.getJSON( url, function( data ) {
  var items = data.response.docs;

  $nytHeaderElem.text("New York Times Articles About " + city);

  for (var i=0; i < items.length; i++) {
//Put articles into HTML
$(".article-list").append("<li> <a href=\"" + items[i].web_url + "\"" + "target=\"_blank\" >" + items[i].headline.main + "</a>" + "</br>" + items[i].byline.original + "</br>" + "Snippet: " + items[i].snippet + "</br>" + "Word count: " + items[i].word_count + "</li>");

}  // end for loop

}).fail(function() {  $nytHeaderElem.text("New York Times Articles could not be loaded");});  // end getJSON


//}); stray code?




    return false;

}; //end function load data

$('#form-container').submit(loadData);
