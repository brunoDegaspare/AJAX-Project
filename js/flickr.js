// event handler for the button
$('button').click(function() {
  $('button').removeClass('selected');
  $(this).addClass('selected');

  var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  var animalType = $(this).text();

  // flickrOptions: jQuery expects the data to be in the format of a JavaScript object
  var flickrOptions = {
    tags: animalType, // remember this is the button the user clicked (var animalType)
    format: "json"
  };

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

});
