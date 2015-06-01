var window_size = window.matchMedia('(max-width: 800px)');
$(function($) {

  // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
  // var indexbottom = $('#headerwrap').offset().top + $('#headerwrap').height();



  // function scrollnav(wrapper, wrapperStyle){
    // we round here to reduce a little workload
  //   stop = Math.round($(window).scrollTop());
  //   if (stop > wrapper) {
  //       $('.navbar-nav').addClass(wrapperStyle);
  //       $('.navbar-default').addClass(wrapperStyle);
  //   } else {
  //       $('.navbar-nav').removeClass(wrapperStyle);
  //       $('.navbar-default').addClass(wrapperStyle);
  //   };
  // }

  // on scroll, 
  // $(window).on('scroll',function(){
  //     scrollnav(indexbottom, 'scrolled-index');

      // // we round here to reduce a little workload
      // stop = Math.round($(window).scrollTop());
      // if (stop > mainbottom) {
      //     $('.navbar-nav').addClass('scrolled');
      //     $('.navbar-default').addClass('scrolled');
      // } else {
      //     $('.navbar-nav').removeClass('scrolled');
      //     $('.navbar-default').addClass('scrolled');
      // }

  // });

  if (window.matchMedia('(max-width: 800px)').matches)
  {
    $('.beta img').click(function(){
    video = '<iframe src="'+ $(this).attr('data-video') +'"></iframe>';
    $(this).replaceWith(video);
  });
  } else {
    $('.beta img').click(function(){
    video = '<iframe width="746px" height="452px" src="'+ $(this).attr('data-video') +'"></iframe>';
    $(this).replaceWith(video);
    });
  }

  $('#sketching').videoBG({
    mp4:'sketching.mp4',
    ogv:'sketching.ogv',
    webm:'sketching.webm',
    poster:'sketching.jpg',
    scale:true,
    zIndex:0
  });
});

$(function() {
  
  // IE detect
  function iedetect(v) {

      var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
    return r.test(navigator.userAgent);
      
  }

  // For mobile screens, just show an image called 'poster.jpg'. Mobile
  // screens don't support autoplaying videos, or for IE.
  if(screen.width < 800 || iedetect(8) || iedetect(7) || 'ontouchstart' in window) {
  
    (adjSize = function() { // Create function called adjSize
      
      $width = $(window).width(); // Width of the screen
      $height = $(window).height(); // Height of the screen
      
      // Resize image accordingly
      $('#sketching').css({
        'background-image' : 'url(poster.jpg)', 
        'background-size' : 'cover', 
        'width' : $width+'px', 
        'height' : $height+'px'
      });
      
      // Hide video
      $('video').hide();
      
    })(); // Run instantly
    
    // Run on resize too
    $(window).resize(adjSize);
  }
  else {

    // Wait until the video meta data has loaded
    $('#sketching video').on('loadedmetadata', function() {
      
      var $width, $height, // Width and height of screen
        $vidwidth = this.videoWidth, // Width of video (actual width)
        $vidheight = this.videoHeight, // Height of video (actual height)
        $aspectRatio = $vidwidth / $vidheight; // The ratio the video's height and width are in
            
      (adjSize = function() { // Create function called adjSize
              
        $width = $(window).width(); // Width of the screen
        $height = $(window).height(); // Height of the screen
              
        $boxRatio = $width / $height; // The ratio the screen is in
              
        $adjRatio = $aspectRatio / $boxRatio; // The ratio of the video divided by the screen size
              
        // Set the container to be the width and height of the screen
        $('#sketching').css({'width' : $width+'px', 'height' : $height+'px'}); 
              
        if($boxRatio < $aspectRatio) { // If the screen ratio is less than the aspect ratio..
          // Set the width of the video to the screen size multiplied by $adjRatio
          $vid = $('#sketching video').css({'width' : $width*$adjRatio+'px'}); 
        } else {
          // Else just set the video to the width of the screen/container
          $vid = $('#sketching video').css({'width' : $width+'px'});
        }
                 
      })(); // Run function immediately
            
      // Run function also on window resize.
      $(window).resize(adjSize);
            
    });
  }
  
});