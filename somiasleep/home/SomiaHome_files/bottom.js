$(document).ready(function () {
  if (getCookie('subscribe') != 'true') {
    setTimeout(function () {
      $('#anketa').modal('show')
      $('#anketa').on('shown.bs.modal', function (e) {
        setCookie('subscribe', 'true', {expires: 604800, path: '/'})
      })
      if (getCookie('subscribe2') != 'true') {
        setTimeout(function () {
          $('#anketa2').modal('show')
          $('#anketa2').on('shown.bs.modal', function (e) {
            setCookie('subscribe2', 'true', {expires: 604800, path: '/'})
          })
        }, 60000);
      }
    }, 10000);
  }
  /*if (getCookie('subscribe2') != 'true' && getCookie('subscribe') == 'true') {
    setTimeout(function () {
      $('#anketa2').modal('show')
      $('#anketa2').on('shown.bs.modal', function (e) {
        setCookie('subscribe2', 'true', {expires: 604800, path: '/'})
      })
    }, 60000);
  }*/
  $('.h_cover .bg').length && $('.h_cover .bg').parallax({offsetX: "0%", offsetY: 40, speedFactor: 0.1});
});

$(document).ready(function () {
  let pictureCount = $('.box_container_img picture').length;
  let scrollResolution = 100;
  let currentScrollPosition = 0;
  animatePillow();

  function animatePillow() {
    const animatedBlock = document.getElementById('somia_animated');
    if (!animatedBlock) return;
    if ($(window).width() < 525) {
      var currentScrollPosition = window.pageYOffset - animatedBlock.offsetHeight;
      skip = 18;
    } else if ($(window).width() < 1000) {
      var currentScrollPosition = window.pageYOffset - animatedBlock.offsetHeight + 230;
      skip = 22;
    } else if ($(window).width() < 1440) {
      var currentScrollPosition = window.pageYOffset - animatedBlock.offsetHeight + 430;
      skip = 22;
    } else {
      var currentScrollPosition = window.pageYOffset - animatedBlock.offsetHeight + 630;
      skip = 21;
    }
    //console.log(currentScrollPosition);
    var imageIndex = Math.round(currentScrollPosition / scrollResolution - skip);
    //console.log(imageIndex);
    //console.log(imageIndex + "  " + pictureCount);
    if (imageIndex < 0) {
      imageIndex = 0;
    }

    if (imageIndex >= pictureCount) {
      imageIndex = pictureCount - 1;
    }

    $(".box_container_img picture").hide();
    $(".box_container_img picture").eq(imageIndex).show();

    $(".box_container_img picture").removeClass('active');
    $(".box_container_img picture").eq(imageIndex).addClass('active');
  }

  $(window).bind('scroll', function () {
    animatePillow();
  });

});
