var timeoutId;
var $videoBgAspect = $(".videobg-aspect");
var $videoBgWidth = $(".videobg-width");
var videoAspect = $videoBgAspect.outerHeight() / $videoBgAspect.outerWidth();

function videobgEnlarge() {
  console.log('resize');
  windowAspect = ($(window).height() / $(window).width());
  if (windowAspect > videoAspect) {
    $videoBgWidth.width((windowAspect / videoAspect) * 100 + '%');
  } else {
    $videoBgWidth.width(100 + "%")
  }
}

$(window).resize(function() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(videobgEnlarge, 100);
});

$(function() {
  videobgEnlarge();
});
