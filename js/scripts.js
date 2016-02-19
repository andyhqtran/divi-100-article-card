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

      // Append category
      $post_meta
        .children('a')
        .addClass('category')
        .appendTo($this.children('.post-content'));

      // Append author
      $post_meta
        .children('.author')
        .prependTo($this.children('.post-content'));

      $this
        .children('.entry-title')
        .prependTo($this.children('.post-content'));

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

      if (!$(this).hasClass('format-quote') && !$(this).hasClass('format-link') && !$(this).hasClass('format-audio')) {
        var $accent_color = $('.author a').css('color');
        $(this).children('.date').css('background-color', $accent_color);
        $(this).children().children('a.category').css('background-color', $accent_color);
      }

      setTimeout(function () {
        var $new_height = $this.outerHeight(false);
        var $excerpt_height = $this.children().children('.excerpt').outerHeight();

        $this.css({
          'height': $new_height - $excerpt_height
        })

        $this.children('.post-content').css('position', 'absolute');

        $this.children().children('.excerpt').hide();
      }, 1);

      $(this).children('.post-content').hover(function () {
        $(this).children('.excerpt').animate({
          height: "toggle",
          opacity: "toggle"
        });
      });



    } else {
      $(this).append('test')
    }
  });

});