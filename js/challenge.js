/*
Challenge
------------------------------------------------------------------------------
1. Replace the button click event with a form submit event
2. Stop the form from submitting (use preventDefault method)
3. Retrieve the value the visitor typed in the input field (select the field and use jQuery's val() method)
*/

$('form').submit(function(e) {
  e.preventDefault();

  var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  var animalType = $('#search').val();
  var submitBtn = $('#submit');
  var photosDiv = $('#photos');

  submitBtn.prop('disabled', true).val("Searching...");

  var flickrOptions = {
    tags: animalType,
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
    photosDiv.html(photoHTML);
    submitBtn.prop('disabled', false).val("Search");

    // check if the Items array is empty (no results)
    if (data.items.length === 0) {
      photosDiv.text("Your search didn't return any result this time. Please try again using a different keyword.");
    }
  }
  $.getJSON(flickrAPI, flickrOptions, displayPhotos);
});
