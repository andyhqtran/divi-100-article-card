jQuery(document).ready(function ($) {
  var $post = $('.et_pb_post');

  $post.each(function () {
    if (!$(this).hasClass('et_pb_no_thumb') | !$(this).hasClass('format-standard')) {

      var $excerpt = $(this).clone().children().remove().end().text(),
        $this = $(this),
        $post_meta = $this.children('.post-meta');

      // Append excerpt
      $this
        .append('<div class="excerpt">' + $excerpt + '</div>');

      // Remove text
      $this
        .contents()
        .filter(function () {
          return (this.nodeType == 3);
        })
        .remove();

      // Append category
      $post_meta
        .children('a')
        .addClass('category')
        .appendTo(this);

      // Append author
      $post_meta
        .children('.author')
        .appendTo(this);

      // Remove special characters
      var comments = $post_meta.text().replace(/[^a-zA-Z0-9 ]/g, "").replace("by", "").trim();
      $post_meta
        .html(comments);

      // Append comment
      $('<div class="comments">' + comments + '</div>')
        .appendTo(this);

      // Remove Post Meta
      $post_meta
        .remove();

    }
  });
});