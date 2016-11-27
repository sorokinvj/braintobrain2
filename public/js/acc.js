


$(function() {
    var a = $("h3 > a, h4 > a");
    a.on("click", function(a) {
        var t = $(this);
        t.hasClass("article-headline-link") || (t.toggleClass("active"), $(t.attr("href")).toggleClass("active"), a.preventDefault())
    })
});

$(function() {
  if(!(jQuery.browser.mobile)) {
      console.log("NON MOBILE")
      $(".empty_cell, .cell:not(.cell.client)").on("click", function(e){
        $(this).toggleClass('excel_cell_empty');
      });
      $(".cell.client").on("click", function(e){
        $(this).toggleClass('excel_client_like').toggleClass('nohover');
      });
    }
});
