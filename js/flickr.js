// event handler for the button
$('button').click(function() {
  $('button').removeClass('selected');
  $(this).addClass('selected');

  var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  // ?jsoncallback=? this is a query that tells Flickr we are making a JSONp request
  // the question mark (?) at the end of the URL lets you get around the security limitation

  // we need to send different data depending on what kind of button is clicked (Dog, Cat, Moose)
  // the .text() method gets all of the text inside the HTML element
  // For example: When the Dog button is clicked, the variable animalType will hold the value of "Dog" and so on.
  // We need to send this word to Flickr, to tell it's server which pictures we want
  var animalType = $(this).text();

  // flickrOptions: jQuery expects the data to be in the format of a JavaScript object
  var flickrOptions = {
    tags: animalType, // remember this is the button the user clicked (var animalType)
    format: "json"
  };

  // when Flicker returns its list of photos to the page, this function displayPhotos will run
  // the data argument represents the JSON data returned by jQuery (you can name the argument the way you want)
  // items is the name of the object returned by FLickr's JSON feed
  function displayPhotos(data) {
    var photoHTML = '<ul>';
    // loop through each photo returned by the FLickr feed
    $.each( data.items, function(i, photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image" target="_blank">';
        photoHTML += '<img src="' + photo.media.m +'"></a></li>';
    });
    photoHTML += '</ul>';
    $('#photos').html(photoHTML);
  }

  $.getJSON(flickrAPI, flickrOptions, displayPhotos);
  // the basic structure of jQuery's getJSON() method.
  // It takes three arguments:
  // First: The URL to the resource (in this case that's the Flickr's public photo feed)
  // Second: The data we want to send along with the URL (this data will affect what information Flickr will return it)
  // Third: This is the callback function
});
