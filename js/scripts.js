jQuery(document).ready(function ($) {
  var $post = $('.et_pb_post');

  $post.each(function () {
    if (!$(this).hasClass('et_pb_no_thumb') | !$(this).hasClass('format-standard')) {
      var excerpt = $(this).clone().children().remove().end().text();

      $(this).append('<div class="excerpt">' + excerpt + '</div>');

      $(this).contents().filter(function () {
        return (this.nodeType == 3);
      }).remove();

      $(this).children('.post-meta').children('.published').appendTo(this);
      $(this).children('.post-meta').children('.author').appendTo(this);
      $(this).children('.post-meta').children('a').addClass('category').appendTo(this);

      var comments = $(this).children('.post-meta').text().replace(/[^a-zA-Z0-9 ]/g, "").replace("by", "").trim();
      $(this).children('.post-meta').html(comments);
      $('<div class="comments">' + comments + '</div>').appendTo(this);
      $(this).children('.post-meta').remove();
    }
  });
});