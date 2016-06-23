jQuery(document).ready(function ($) {
  if (!$('.divi-100-article-card').length) {
    return false;
  } else {
    $('.et_pb_blog_grid').find('.et_pb_post').each(function() {
      var $this = $(this);

      /**
       * Adds article-card class to div
       */
      $this
        .addClass('article-card');

      /**
       * Creates content div and appends to post
       */
      $this
        .append('<div class="article-card__content" />');

      /**
       * Post variables
       */
      var postContent = $this.find('.article-card__content');
      var postMeta = $this.children('.post-meta');

      /**
       * Excerpt variables
       */
      var excerpt = $this.clone().children().remove().end().text().trim();
      var excerptWrap = $('<div class="article-card__excerpt" />');

      if ($this.children('p').not('p.post-meta').length > 0) {
        excerpt = $this.children('p').not('p.post-meta').text();
        $this.children('p').not('p.post-meta').remove();
      }

      /**
       * Check if excerpt is over 100 characters
       */
      if (excerpt.length > 80) {
        excerpt = excerpt.substring(0, 80).split(" ").slice(0, -1).join(" ") + "..."
      }

      /**
       * Creates category div based off post-meta children
       */
      postMeta
        .children('a')
        .addClass('article-card__category')
        .appendTo(postContent);

      /**
       * Appends excerpt to content div
       */
      excerptWrap
        .text(excerpt)
        .appendTo(postContent);

      /**
       * Creates meta div and appends to content
       */
      postContent
        .append('<div class="article-card__meta" />');

      /**
       * Removes old text from post
       */
      $this
        .contents()
        .filter(function () {
          return (this.nodeType == 3);
        })
        .remove();

      /**
       * Creates date div based off .published
       */
      $(this).find('.published').text(function() {
        return $(this).text().slice(0, -6);
      });

      $this
        .find('.published')
        .appendTo(this)
        .replaceWith(function (i, text) {
          return (
            text
              .replace(/([a-zA-Z]+)([\d\D]*)/g,
                '<div class="article-card__date">\
                  <span class="article-card__day">$2</span>\
                  <span class="article-card__month">$1</span>\
                </div>'
              )
          );
        });

        /**
         * Removes comma, spaces from day
         */
        $this
          .find('.article-card__day')
          .text(function() {
            return $(this)
                    .text()
                    .replace(/\,/g, '')
                    .trim();
          });

      /**
       * Add article-card__title class to title
       */
      $this
        .find('.entry-title')
        .addClass('article-card__title')
        .prependTo(postContent);

      /**
       * Appends author to content div
       */
      $this
        .find('.author')
        .addClass('article-card__author')
        .appendTo($this.find('.article-card__meta'));


      /**
       * Get existing comment and appends it to post comment
       */
      var comments = postMeta.text().replace(/[^a-zA-Z0-9 ]/g, "").replace("by", "").trim();

      if (comments) {
        $('<span class="article-card__comments">' + comments + '</span>')
          .appendTo($this.find('.article-card__meta'));
      }

      /**
       * Remove old post-meta div
       */
      postMeta.remove();

      /**
       * If .post-content exist, then append contents to excerpt
       */
      if ($(this).find('.post-content').length > 0) {
        $(this)
          .find('.post-content p')
          .appendTo($(this)
          .find('.article-card__excerpt'));
      }

      /**
       * Hide excerpt by default on desktop
       */
      if ($(window).width() > 768) {
        $this
          .children()
          .children('.article-card__excerpt')
          .hide();
      }

      /**
       * Get outer height of content div and applies a padding to card
       */
      function postModuleSize() {
        var postContentHeight = postContent.outerHeight();

        $this.css({
          'padding-bottom': postContentHeight
        });
      }

      setTimeout(postModuleSize, 100);

      /**
       * Recall getPostContentSize() on window resize
       */
      $(window).resize(function() {
        postModuleSize();
      });

      /**
       * Handle animations on desktop
       */
      if ($(window).width() > 768) {

        /**
         * Prevents loading incorrect state
         */
        setTimeout(function() {
          $this.on('hover', function () {
            $this.find('.article-card__excerpt').stop().animate({
              height: "toggle",
              opacity: "toggle"
            }, 200);
          });
        });
      }
    });
  }
});