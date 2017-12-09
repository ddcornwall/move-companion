
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

  for (var i=0; i < items.length; i++) {
  console.log(items[i].headline.main);
  console.log(items[i].byline.original);
  console.log(items[i].snippet);
  console.log(items[i].web_url);
  console.log(items[i].word_count);

//Put articles into HTML
$(".article-list").append("<li> <a href=/"" + items[i].web_url + "/">" + items[i].headline.main + "</li>");
// $(".article-list").append("<li>" + items[i].headline.main + "</li>" );


//put listing into html
//function myFunction() {
//    var para = document.createElement("LI");
//    var t = document.createTextNode("items[i].headline.main");
//    para.appendChild(t);
//    document.getElementById("nytimes-articles").appendChild(para);};
}  // end for loop

});  // end getJSON


//    items.push( "<li id='" + key + "'>" + val + "</li>" );
//}); stray code?



//  $( "<ul/>", {
//    "class": "article-list",
//    html: items.join( "" )
//  }).appendTo( "body" );
//};



    return false;

}; //end function load data

$('#form-container').submit(loadData);
