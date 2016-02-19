jQuery(document).ready(function ($) {
  var $post = $('.et_pb_post');

  $post.each(function () {
    if (!$(this).hasClass('et_pb_no_thumb') | !$(this).hasClass('format-standard')) {

      var $excerpt = $(this).clone().children().remove().end().text(),
        $this = $(this),
        $content = $this.children('.post-content'),
        $post_meta = $this.children('.post-meta');

      $this
        .append('<div class="post-content"></div>');

      // Append excerpt
      $this
        .children('.post-content')
        .append('<div class="excerpt">' + $excerpt + '</div>');

      // Remove text
      $this
        .contents()
        .filter(function () {
          return (this.nodeType == 3);
        })
        .remove();

      $post_meta
        .children('.published')
        .appendTo(this);

      // Append category
      $post_meta
        .children('a')
        .addClass('category')
        .appendTo($this.children('.post-content'));

      // Append author
      $post_meta
        .children('.author')
        .appendTo($this.children('.post-content'));

      // Remove special characters
      var comments = $post_meta.text().replace(/[^a-zA-Z0-9 ]/g, "").replace("by", "").trim();
      $post_meta
        .html(comments);

      // Append comment
      $('<div class="comments">' + comments + '</div>')
        .appendTo($this.children('.post-content'));

      // Remove Post Meta
      $post_meta
        .remove();

    }
  });
});