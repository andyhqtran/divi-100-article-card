jQuery(document).ready(function ($) {
  var $post = $('.et_pb_post');

  $post.each(function () {
    if (!$(this).hasClass('format-standard') | $(this).hasClass('has-post-thumbnail')) {
      $(this).addClass('article-card');
      var $excerpt = $(this).clone().children().remove().end().text(),
        $this = $(this),
        $content = $this.children('.post-content'),
        $post_meta = $this.children('.post-meta');

      // $this.addClass('article-card');

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

      // Append date
      $post_meta
        .children('.published')
        .appendTo(this);

      $this.children('.published').replaceWith(
        function (i, h) {
          return h.replace(/(\d+.\s)([\d\D]*)/g, '<div class="date"><span class="day">$1</span><span class="month">$2</span></div>');
        });

      if (!$(this).hasClass('format-quote') && !$(this).hasClass('format-link') && !$(this).hasClass('format-audio')) {
        $(this).children('.date').css('background-color', $('.category').css('color'));
      }

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

    } else {
      $(this).append('test')
    }
  });

});