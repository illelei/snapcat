// Trigger Eyeem_Actions on Action Buttons
var initActionButtons = function() {
  $('.js_action').off('click tap touch'); // after each ajax call, we re-init the buttons and we don't want the click events bound twice.
  $('.js_action').on('click tap touch', function(e) {
    executeAction($(this));
  });
}

var upload = function(photoIndex, action_button) {

  replaceSpan = $('<span>').html('<img src="images/shared.png">');
  action_button.replaceWith(replaceSpan);

  var fd = new FormData();
  fd.append("photo", blobFiles[photoIndex]);
  fd.append('access_token', code);
  fd.append('client_id', 'AXOnvX51jUW6VxV47j78FvOCypa6zecN');

  $.ajax({
    url         : "http://www.eyeem.com/api/v2/photos",
    type        : "POST",
    data        : fd,
    processData : false,
    contentType : false,
    success     : function(response) {
      console.log(response);
      replaceSpan.append($('<a>', {
        "href" : response['photo']['webUrl'],
        "target": "_blank"
      }).html('&nbsp; &nbsp; <button class="btn btn-eyeem-green">view on EyeEm</button>'));
    },
    error       : function(jqXHR, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var executeAction = function(action_button) {
  var photoIndex = action_button.attr('data-photo-index') != undefined ? action_button.attr('data-photo-index') : '';
  upload(photoIndex, action_button);
}
