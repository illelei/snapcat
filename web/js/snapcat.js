function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

var code = getURLParameter('code');

if (code == null) {
  window.location = 'auth.html';
}
else {

  // params1 = {
  //   'grant_type'   : 'authorization_code',
  //   'client_id'    : 'AXOnvX51jUW6VxV47j78FvOCypa6zecN',
  //   'client_secret': 'XXXXX',
  //   'redirect_uri' : 'http://94.136.40.103/~getsnapc.at/web-version/',
  //   'code'         : code
  // };

  // var token;

  // $.ajax({
  //   url     : "http://www.eyeem.com/api/v2/oauth/token",
  //   type    : "POST",
  //   data    : params1,
  //   success : function(response) {
  //     token = response['access_token'];
  //   },
  //   error   : function(jqXHR, textStatus, errorMessage) {
  //     console.log(errorMessage);
  //     alert('We got no access token.');
  //   }
  // });

  var photoIndex       = 0;

  var video            = document.querySelector("#video-element");
  var localMediaStream = null;

  var latestSnapcat    = null;
  var latestExit       = null;

  var makeItStawwwp    = false;
  var running          = false;

  var mouse            = $('.a');

  var blobFiles        = [];

  var latestGridRow    = false;

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, videoError);
  }

  function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
  }

  function videoError(e) {
    errorDiv = $('<div>', {"id": 'video-error'}).html('Please allow SnapCat to use the camera of your device. [<a href="JavaScript:window.location.reload()">Reload</a>]');
    $('body').append(errorDiv);
  }

  function startCatMode() {
    if (running == false) {
      $(document).on('keyup', function(e) {
        now = new Date().getTime();
        if (e.keyCode == 27 /* esc */) {
          exitCatMode(now);
        }
        else {
          snapcat(now);
        }
      });
      $('.make-it-stawwwp').attr('src', 'images/make-it-stawwwp.png')
      $('header').animate({height: $(window).height()});
      running = true;
      makeItStawwwp = false;
      animateDiv();
    }
  }

  function exitCatMode(whatTimeIsIt) {
    $(document).off('keyup');
    $('.make-it-stawwwp').attr('src', 'images/snapcatlogowhite.png');
    latestExit = whatTimeIsIt;
    running = false;
    mouse.fadeOut();
    makeItStawwwp = true;
    $('header').animate({height: '60px'});
  }

  function snapcat(now) {
    if ((latestSnapcat == 'undefined' || now - latestSnapcat > 500) && (latestExit == 'undefined' || now - latestExit > 1000)) {
      latestSnapcat = now;
      if (localMediaStream) {
        latestSnapcat = new Date().getTime();
        var canvas = $('<canvas>', {
          "style" : "display:none",
          "id"    : "canvas"
        });
        $('#canvases').append(canvas);
        var ctx = canvas.get(0).getContext("2d");
        // var ctx = canvas.get().getContext('2d');
        canvas.get(0).width  = video.videoWidth  || video.width;
        canvas.get(0).height = video.videoHeight || video.height;
        ctx.drawImage(video, 0, 0);
        // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
        var div = $('<div>', {
          'class' : 'container span4',
          'id'    : 'snapshot-' + photoIndex
        });

        var purl = canvas.get(0).toDataURL('image/webp');

        if (canvas.get(0).toBlob) {
          canvas.get(0).toBlob(function (blob) {
              console.log('We got a blob object! That took me two hours!');
              blobFiles[photoIndex] = blob;
            },
            'image/jpeg'
          );
        }

        if (photoIndex % 3 == 0 || latestGridRow == false) {
          gridRow = $('<div>', {
            "class" : "row-fluid"
          });
          latestGridRow = gridRow;
          $('#padding').prepend(gridRow);
        }

        var imgRow = $('<div>', {
          "class" : "row-fluid"
        }).html('<div class="span12"><img src="' + purl + '" class = "span12"></div>');
        div.append(imgRow);

        var buttonRow = $('<div>', {
          "class" : "row-fluid button-row"
        })
        var shareButton = $('<button>', {
          "data-photo-url"   : purl,
          "data-photo-index" : photoIndex,
          "class"            : "js_action btn btn-eyeem-primary"
        }).text('share');

        buttonRow.append(shareButton);
        div.append(buttonRow);

        latestGridRow.prepend(div);
        photoIndex++;
      }
      initActionButtons();
    }
  }

  /* cat game */

  function makeNewPosition() {
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];
  }

  function animateDiv() {
    var newq = makeNewPosition();
    var oldq = $('.a').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    mouse.fadeIn();
    mouse.animate({ top: newq[0], left: newq[1] }, speed, function(){
      if (makeItStawwwp == false) {
        animateDiv();
      }
    });
  };

  function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 1.5;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;
  }

  /* LISTENERS */

  $('.js_icon').on('click tap touch', function(e) {
    $this = $(this);
    $('.icon_active').removeClass('icon_active');
    $this.addClass('icon_active');
    var icon = $this.attr('data-icon') != undefined ? $this.attr('data-icon') : '';
    $('.a').attr('src', 'images/icon-' + icon + '.png');
    startCatMode();
  });

  $('.make-it-stawwwp').on('click tap touch', function(e) {
    if (running) {
      exitCatMode();
    }
    else {
      startCatMode();
    }
  });

}