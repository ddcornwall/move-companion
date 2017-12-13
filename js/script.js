
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
    var loc = street + ' , ' + city;
    $greeting.text('I want to live at ' + loc);
    var streetviewURL= "https://maps.googleapis.com/maps/api/streetview?size=300x200&location=" + loc;

    //This gets pushed to bottom.
    $("#image-container").append('<center> <img src = "' + streetviewURL + '"> </center> <p></p>');


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

//Put articles into HTML
  for (var i=0; i < items.length; i++) {
$(".article-list").append("<li> <a href=\"" + items[i].web_url + "\"" + "target=\"_blank\" >" + items[i].headline.main + "</a>" + "</br>" + items[i].byline.original + "</br>" + "Snippet: " + items[i].snippet + "</br>" + "Word count: " + items[i].word_count + "</li>");

}  // end for loop

}).fail(function() {  $nytElem.text("New York Times articles could not be loaded");});  // end getJSON

//Load Wikipedia articles
//create WikiURL
var wikiUrl="https://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json&callback=?"
console.log(wikiUrl);

//Let user know if wikipedia fails
var wikiRequestTimeout = setTimeout(function(){
$wikiElem.text("Failed to get wikipedia resources");
}, 4000);


$.ajax({
url: wikiUrl,
dataType: 'jsonp',
success: function (data) {
var entries = data;
  //Put articles into HTML
  //Wikipedia returns four nameless arrays: 1) title, 2) snippet, 3) URL
    for (var j=0; j < entries[1].length; j++)  {
  $("#wikipedia-links").append("<li> <a href=\"" + entries[3][j] + "\"" + "target=\"_blank\" >" + entries[1][j] + "</a>" + "</br>" + entries[2][j] + "</li>");
  }  // end for loop
//abort timeout if successful
clearTimeout(wikiRequestTimeout);

}
}
);

//Load Wikipedia
//$.ajax({
  //url: '//en.wikipedia.org/w/api.php',
  //data: { action: 'query', list: 'search', srsearch: 'Richard Feynman', format: 'json' },
  //dataType: 'jsonp',
  //success: function (x) {
    //console.log('title', x.query.search[0].title);

  //}
//});





    return false;

}; //end function load data

$('#form-container').submit(loadData);
