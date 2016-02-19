jQuery(document).ready(function ($) {
  $('.divi-100-article-card').find('.et_pb_post').each(function () {
    var $this = $(this),
      $standardFormat = $this.hasClass('format-standard'),
      $hasThumbnail = $this.hasClass('has-post-thumbnail'),
      $audioFormat = $this.hasClass('format-audio'),
      $linkFormat = $this.hasClass('format-link'),
      $quoteFormat = $this.hasClass('format-quote');


    // Check if module has thumbnail
    if (!$standardFormat | $hasThumbnail) {

      // Add 'article-card' to current module
      $this.addClass('article-card');

      // Creates post content and appends it to module
      $this.append('<div class="post-content"></div>');

      var $excerpt = $(this).clone().children().remove().end().text(),
        $excerpt_wrap = $('<div class="excerpt">'),
        $post_content = $this.find('.post-content'),
        $post_meta = $this.children('.post-meta');

      // Append excerpt to post content
      $excerpt_wrap.text($excerpt).appendTo($post_content);

      // Removes old text from modules
      $this.contents().filter(function () {
        return (this.nodeType == 3);
      }).remove();

      // Append date
      $this.find('.published').appendTo(this)
        .replaceWith(function (i, h) {
          return h.replace(/(\d+.\s)([\d\D]*)/g, '<div class="date"><span class="day">$1</span><span class="month">$2</span></div>');
        });

      // Append category
      $post_meta.children('a').addClass('category').appendTo($post_content);

      // Append author to post content
      $this.find('.author').appendTo($post_content);

      // Prepend title to post content
      $this.children('.entry-title').prependTo($post_content);

      // Remove special characters
      var comments = $post_meta.text().replace(/[^a-zA-Z0-9 ]/g, "").replace("by", "").trim();

      // Remove Post Meta
      $post_meta.remove();

      // Append comment
      $('<span class="comments">' + comments + '</span>').appendTo($post_content);

      // Apply accent color to date and category block
      if (!$quoteFormat && !$linkFormat && !$audioFormat) {
        var $accent_color = $('.author a').css('color');

        $this.find('.date').css('background-color', $accent_color);
        $this.find('a.category').css('background-color', $accent_color);
      }

      // Delay by 1ms
      setTimeout(function () {
        var $new_height = $this.height();

        $this.css({
          'height': $new_height
        });

        $post_content.css({
          'position': 'absolute',
          'font-size': '12px'
        });

        var $short_text = $post_content.children('.excerpt').text().trim().substring(0, 100).split(" ").slice(0, -1).join(" ") + "...";

        $post_content.children('.excerpt').text($short_text);
      }, 1);

      // Hide excerpt
      $this.children().children('.excerpt').hide();

      // Toggle animate height & opacity on hover
      $(this).children('.post-content').hover(function () {
        $(this).children('.excerpt').stop().animate({
          height: "toggle",
          opacity: "toggle"
        });
      });
    }
  });
});