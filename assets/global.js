$.cookie = function (key, value, options) {
   if (
      arguments.length > 1 &&
      (!/Object/.test(Object.prototype.toString.call(value)) ||
         value === null ||
         value === undefined)
   ) {
      options = $.extend({}, options);
      if (value === null || value === undefined) {
         options.expires = -1;
      }
      if (typeof options.expires === "number") {
         var days = options.expires,
            t = (options.expires = new Date());
         t.setDate(t.getDate() + days);
      }
      value = String(value);
      return (document.cookie = [
         encodeURIComponent(key),
         "=",
         options.raw ? value : encodeURIComponent(value),
         options.expires ? "; expires=" + options.expires.toUTCString() : "",
         options.path ? "; path=" + options.path : "",
         options.domain ? "; domain=" + options.domain : "",
         options.secure ? "; secure" : "",
      ].join(""));
   }
   options = value || {};
   var decode = options.raw
      ? function (s) {
           return s;
        }
      : decodeURIComponent;
   var pairs = document.cookie.split("; ");
   for (var i = 0, pair; (pair = pairs[i] && pairs[i].split("=")); i++) {
      if (decode(pair[0]) === key) return decode(pair[1] || "");
   }
   return null;
};
if (typeof Shopify === "undefined") {
   Shopify = {};
}
if (!Shopify.formatMoney) {
   Shopify.formatMoney = function (cents, format) {
      var value = "",
         placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
         formatString = format || this.money_format;
      if (typeof cents == "string") {
         cents = cents.replace(".", "");
      }

      function defaultOption(opt, def) {
         return typeof opt == "undefined" ? def : opt;
      }

      function formatWithDelimiters(number, precision, thousands, decimal) {
         precision = defaultOption(precision, 2);
         thousands = defaultOption(thousands, ",");
         decimal = defaultOption(decimal, ".");
         if (isNaN(number) || number == null) {
            return 0;
         }
         number = (number / 100.0).toFixed(precision);
         var parts = number.split("."),
            dollars = parts[0].replace(
               /(\d)(?=(\d\d\d)+(?!\d))/g,
               "$1" + thousands
            ),
            cents = parts[1] ? decimal + parts[1] : "";
         return dollars + cents;
      }
      switch (formatString.match(placeholderRegex)[1]) {
         case "amount":
            value = formatWithDelimiters(cents, 2);
            break;
         case "amount_no_decimals":
            value = formatWithDelimiters(cents, 0);
            break;
         case "amount_with_comma_separator":
            value = formatWithDelimiters(cents, 2, ".", ",");
            break;
         case "amount_no_decimals_with_comma_separator":
            value = formatWithDelimiters(cents, 0, ".", ",");
            break;
      }
      return formatString.replace(placeholderRegex, value);
   };
}
window.novtheme = window.novtheme || {};
if ($("html").hasClass("lang-rtl")) {
   var rtl = true;
} else {
   var rtl = false;
}
var body = $("body");
var sidebarOverlay = $(".sidebar-overlay");
var currentWidth = $(window).width();
var responsive_mobile = currentWidth < 768;
var isClickEventAttached = false;
novtheme.init = function () {
   novtheme.toggleMobileStyles();
   novtheme.eventBlockCart();
   novtheme.VerticalThumbnailProductDetail();
   novtheme.ThumbnailProductDetail();
   novtheme.RelatedProduct();
   novtheme.load_canvas_menu();
   novtheme.NovTogglePage();
   novtheme.Countdown();
   novtheme.goToTop();
   novtheme.MenuSidebar();
   novtheme.HideShowPassword();
   novtheme.NovSearchToggle();
   novtheme.searchTrendWidth();
   novtheme.searchTrend();
   novtheme.SearchAutoComplete();
   novtheme.tooltip();
   novtheme.Nov_iframe_video();
   novtheme.MegaMenuSlider();
   novtheme.LoadmoreByButton();
   novtheme.Mainmenu();
   novtheme.CollectionPage();
   novtheme.CollectionPageLoadmore();
   novtheme.NovAccordion();
   novtheme.RunParallax();
   novtheme.LookBook();
   novtheme.Language();
   novtheme.CartExtent();
   novtheme.AddActive();
   novtheme.ProductStickyAddToCart();
   novtheme.Header_mobile();
   novtheme.Copy();
   novtheme.StickyHeader();
   novtheme.ProductSingleSlider();
   novtheme.SlideShowParallax();
   novtheme.BtnSlider();
   novtheme.NavDropdownMobile();
   novtheme.NumberAnimate();
   novtheme.FakeOrder();
   novtheme.CookieGDPR();
   novtheme.VerticalMenu();
};
//Tooltip, activated by hover event
novtheme.tooltip = function () {
   body.tooltip({
      selector: "[data-toggle='tooltip']",
      container: "body",
   });
};
novtheme.swapChildren = function (obj1, obj2) {
   var temp = obj2.children().detach();
   obj2.empty().append(obj1.children().detach());
   obj1.append(temp);
};
novtheme.toggleMobileStyles = function () {
   if (responsive_mobile) {
      $("*[id^='_desktop_']").each(function (idx, el) {
         var target = $("#" + el.id.replace("_desktop_", "_mobile_"));
         if (target) {
            novtheme.swapChildren($(el), target);
         }
      });
   } else {
      $("*[id^='_mobile_']").each(function (idx, el) {
         var target = $("#" + el.id.replace("_mobile_", "_desktop_"));
         if (target) {
            novtheme.swapChildren($(el), target);
         }
      });
   }
};
novtheme.toggleSticky = function (action) {
   if (action == true) {
      $("*[class^='contentsticky_']").each(function (idx, el) {
         var target = $(
            "." +
               el.classList["0"].replace("contentsticky_", "contentstickynew_")
         );
         if (target.length) {
            novtheme.swapChildren($(el), target);
         }
      });
   } else {
      $("*[class^='contentstickynew_']").each(function (idx, el) {
         var target = $(
            "." +
               el.classList["0"].replace("contentstickynew_", "contentsticky_")
         );
         if (target.length) {
            novtheme.swapChildren($(el), target);
         }
      });
   }
};
novtheme.StickyHeader = function () {
   const $siteHeader = $(".site-header");
   if ($siteHeader.hasClass("sticky-header")) {
      const headerHeight = $siteHeader.outerHeight();
      const $headerCenter = $(".header-center");
      const $headerSticky = $("#header-sticky");
      const centerHeight = $headerCenter.outerHeight();

      let isHeaderSticky = false;
      let prevScroll = $(window).scrollTop();

      $(window).on("scroll", function () {
         const scrollTop = $(this).scrollTop();
         if (scrollTop < prevScroll && scrollTop > headerHeight) {
            if (!isHeaderSticky) {
               $headerSticky.addClass("sticky-header-active");
               $headerCenter.css("height", centerHeight);
               novtheme.toggleSticky(true);
               isHeaderSticky = true;
            }
         } else {
            if (isHeaderSticky) {
               $headerSticky.removeClass("sticky-header-active");
               $headerCenter.css("height", "auto");
               novtheme.toggleSticky(false);
               isHeaderSticky = false;
            }
         }
         prevScroll = scrollTop;
      });
   }
};
novtheme.load_canvas_menu = function () {
   var $main_menu = $(".site-nav-mobile");
   if ($(window).width() < 1200) {
      if ($("#canvas-main-menu").length < 1 && $main_menu.length > 0) {
         var $menu = $main_menu.parent().clone();
         $menu.attr("id", "canvas-main-menu");
         $($menu).find(".menu").removeAttr("id");
         $(".canvas-menu").append($menu);
         $menu.mmenu({
            offCanvas: false,
            navbar: {
               title: false,
            },
         });
      }
      $(".mm-next").click(function () {
         $(".navmenu-product .grid--view-items").slick("refresh");
      });
   }
};
novtheme.Header_mobile = function () {
   var mobileMenu = $("#mobile_menu"),
      mobilesearch = $("#mobile_search"),
      showMegamenu = $("#show-megamenu"),
      mobileBtnSearch = $(".mobile-btn_search");
   showMegamenu.click(function () {
      if ($(this).hasClass("act")) {
         $(this).removeClass("act");
         body.css("overflow", "auto");
         sidebarOverlay.add(mobileMenu).removeClass("act");
         sidebarOverlay.css("z-index", "99");
      } else {
         $(this).addClass("act");
         body.css("overflow", "hidden");
         sidebarOverlay.add(mobileMenu).addClass("act");
         sidebarOverlay.css("z-index", "100");
      }
      mobileBtnSearch.add(mobilesearch).removeClass("act");
   });
   mobileBtnSearch.click(function () {
      if ($(this).hasClass("act")) {
         $(this).removeClass("act");
         mobilesearch.removeClass("act");
      } else {
         $(this).addClass("act");
         mobilesearch.addClass("act");
      }
      body.css("overflow", "auto");
      sidebarOverlay.add(showMegamenu).add(mobileMenu).removeClass("act");
   });
   var height = $(".site-header").outerHeight();
   var height_promotion = 0;
   if ($(".section-promotion-bar").length > 0) {
      var height_promotion = $(".section-promotion-bar").outerHeight();
   }
   mobileMenu.css("padding-top", height + height_promotion);
   $(".promotion-close").click(function () {
      mobileMenu.css("padding-top", height);
   });
};
novtheme.Copy = function () {
   $(".copy-btn").click(function () {
      const el = $(this);
      const copy = el.data("copy");
      const copied = el.data("copied");
      const input = el.siblings("input")[0];
      input.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      el.text(copied);
      setTimeout(() => el.text(copy), 2500);
   });
};
novtheme.VerticalThumbnailProductDetail = function () {
   var proTemplateScroll = $(".product-template__scroll");
   var proFeaturedImage = proTemplateScroll.find(".proFeaturedImage");
   if (currentWidth > 991 && $(".template-product").length > 0) {
      $(window).on("mousewheel DOMMouseScroll wheel", function (e) {
         proFeaturedImage.find(".item.act").each(function () {
            var item = $(this),
               p = item.data("position"),
               hd = item.height() / 2,
               srt = $(window).scrollTop(),
               y = e.originalEvent.deltaY,
               offset_top = item.offset().top;
            if (y > 0) {
               if (p < proFeaturedImage.find(".item").length) {
                  var npd = p + 1;
               } else {
                  var npd = p;
               }
               if (srt > offset_top + hd) {
                  item.removeClass("act");
                  proFeaturedImage
                     .find('.item[data-position="' + npd + '"]')
                     .addClass("act");
                  $(".thumbItem").removeClass("active");
                  $('.thumbItem[data-position="' + npd + '"]').addClass(
                     "active"
                  );
               }
            } else {
               if (p > 1) {
                  var npu = p - 1;
               } else {
                  var npu = p;
               }
               if (srt < offset_top - hd) {
                  item.removeClass("act");
                  proFeaturedImage
                     .find('.item[data-position="' + npu + '"]')
                     .addClass("act");
                  $(".thumbItem").removeClass("active");
                  $('.thumbItem[data-position="' + npu + '"]').addClass(
                     "active"
                  );
               }
            }
            proTemplateScroll
               .find(".thumb_vertical_slick")
               .slick("slickGoTo", p);
         });
      });
      proTemplateScroll.find(".thumbItem").click(function () {
         var p = $(this).data("position");
         proTemplateScroll.find(".thumbItem").removeClass("active");
         $(this).addClass("active");
         proFeaturedImage.find(".item").removeClass("act");
         proFeaturedImage
            .find('.item[data-position="' + p + '"]')
            .addClass("act");
         var ost = proFeaturedImage.find(".item.act").offset().top;
         $("body,html").animate({ scrollTop: ost - 60 }, "normal");
      });
   }
   if (currentWidth < 992) {
      $(
         ".product-template__scroll .proFeaturedImage, .product-template__imggrid .proFeaturedImage"
      )
         .slick({
            slide: ".item",
            infinite: false,
            arrows: false,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
         })
         .on("afterChange", function (e, o) {
            $("iframe").each(function () {
               $(this)[0].contentWindow.postMessage(
                  '{"event":"command","func":"' + "stopVideo" + '","args":""}',
                  "*"
               );
            });
            proFeaturedImage
               .find(".slick-slide:not(.slick-active) video")
               .trigger("pause");
         });
      proFeaturedImage.on("afterChange", function (event, slick, currentSlide) {
         $("#productThumbs .thumb_slick").slick("slickGoTo", currentSlide);
         $("#productThumbs .thumb_slick")
            .find(".slick-slide")
            .removeClass("active");
         $("#productThumbs .thumb_slick")
            .find('.slick-slide[data-slick-index="' + currentSlide + '"]')
            .addClass("active");
      });

      $(".product-template__scroll .thumb_slick").on(
         "click",
         ".thumbItem",
         function (event) {
            event.preventDefault();
            $(".thumb_slick").find(".slick-slide").removeClass("active");
            $(this).addClass("active");
            var goToSingleSlide = $(this).data("slick-index");
            $(".product-template__scroll .proFeaturedImage").slick(
               "slickGoTo",
               goToSingleSlide
            );
         }
      );
      $("variant-radios label").click(function () {
         setTimeout(function () {
            var dindex = $(
               ".product-template__scroll .proFeaturedImage, .product-template__imggrid .proFeaturedImage"
            )
               .find(".item.act")
               .attr("data-slick-index");
            $(
               ".product-template__scroll .proFeaturedImage, .product-template__imggrid .proFeaturedImage"
            ).slick("slickGoTo", dindex);
         }, 300);
      });
   }
};
novtheme.ThumbnailProductDetail = function () {
   var $FeaturedImage = $(".FeaturedImage_slick");
   var $ThumbImage = $("#productThumbs .thumb_slick");
   var dots = $FeaturedImage.data("dots"),
      nav = $FeaturedImage.data("nav"),
      draggable = $FeaturedImage.data("draggable"),
      fade = $FeaturedImage.data("fade"),
      items = $FeaturedImage.data("items"),
      items_lg = $FeaturedImage.data("items_lg"),
      items_md = $FeaturedImage.data("items_md"),
      items_sm = $FeaturedImage.data("items_sm"),
      items_xs = $FeaturedImage.data("items_xs"),
      qtyItem = $ThumbImage.find(".item").length;
   if (qtyItem < 20) {
      var dotXs = true;
   } else {
      var dotXs = false;
   }
   $FeaturedImage.slick({
      slide: ".item",
      nextArrow:
         '<div class="arrow-next"><i class="zmdi zmdi-chevron-right"></i></div>',
      prevArrow:
         '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left"></i></div>',
      slidesToShow: items,
      slidesToScroll: items,
      dots: dots,
      arrows: nav,
      fade: false,
      adaptiveHeight: true,
      infinite: false,
      useTransform: true,
      speed: 500,
      cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
      rtl: rtl,
      draggable: draggable,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: items_lg,
               slidesToScroll: items_lg,
               vertical: vertical_lg,
               verticalSwiping: vertical_lg,
            },
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: items_md,
               slidesToScroll: items_md,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: items_sm,
               slidesToScroll: items_sm,
               dots: false,
            },
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: items_xs,
               slidesToScroll: items_xs,
               dots: dotXs,
            },
         },
      ],
   });

   var autoplay = $ThumbImage.data("autoplay"),
      autoplaytimeout = $ThumbImage.data("autoplaytimeout"),
      infinite = $ThumbImage.data("loop"),
      dots = $ThumbImage.data("dots"),
      nav = $ThumbImage.data("nav"),
      loop = $ThumbImage.data("loop"),
      fade = $ThumbImage.data("fade"),
      vertical = $ThumbImage.data("vertical"),
      vertical_lg = $ThumbImage.data("vertical_lg"),
      vertical_md = $ThumbImage.data("vertical_md"),
      vertical_sm = $ThumbImage.data("vertical_sm"),
      items = $ThumbImage.data("items"),
      items_lg = $ThumbImage.data("items_lg"),
      items_md = $ThumbImage.data("items_md"),
      items_sm = $ThumbImage.data("items_sm"),
      items_xs = $ThumbImage.data("items_xs");
   if (vertical == true) {
      rtl = false;
   }
   $ThumbImage
      .on("init", function (event, slick) {
         $(this).find(".slick-slide.slick-current").addClass("active");
      })
      .slick({
         nextArrow:
            '<div class="arrow-next"><i class="zmdi zmdi-chevron-right"></i></div>',
         prevArrow:
            '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left"></i></div>',
         slide: ".item",
         infinite: infinite,
         slidesToShow: items,
         slidesToScroll: items,
         dots: dots,
         arrows: nav,
         rtl: rtl,
         vertical: vertical,
         verticalSwiping: vertical,
         focusOnSelect: false,
         responsive: [
            {
               breakpoint: 1200,
               settings: {
                  slidesToShow: items_lg,
                  slidesToScroll: items_lg,
                  vertical: vertical_lg,
                  verticalSwiping: vertical_lg,
               },
            },
            {
               breakpoint: 992,
               settings: {
                  slidesToShow: items_md,
                  slidesToScroll: items_md,
                  vertical: vertical_md,
                  verticalSwiping: vertical_md,
               },
            },
            {
               breakpoint: 768,
               settings: {
                  slidesToShow: items_sm,
                  slidesToScroll: items_sm,
                  vertical: vertical_sm,
                  verticalSwiping: vertical_sm,
               },
            },
            {
               breakpoint: 576,
               settings: {
                  slidesToShow: items_xs,
                  slidesToScroll: items_xs,
                  vertical: false,
                  verticalSwiping: false,
               },
            },
         ],
      });
   $FeaturedImage.on("afterChange", function (event, slick, currentSlide) {
      $ThumbImage.slick("slickGoTo", currentSlide);
      $ThumbImage.find(".slick-slide.active").removeClass("active");
      $ThumbImage
         .find('.slick-slide[data-slick-index="' + currentSlide + '"]')
         .addClass("active");
      $FeaturedImage
         .find(".slick-slide:not(.slick-active) iframe")
         .each(function () {
            $(this)[0].contentWindow.postMessage(
               '{"event":"command","func":"' + "stopVideo" + '","args":""}',
               "*"
            );
         });
      $FeaturedImage
         .find(".slick-slide:not(.slick-active) video")
         .trigger("pause");
      // Type thumb grid
      $(".thumbgrid .thumbItem").removeClass("active");
      $('.thumbgrid .thumbItem[data-position="' + currentSlide + '"]').addClass(
         "active"
      );
   });
   $ThumbImage.on("click", ".slick-slide", function (event) {
      event.preventDefault();
      $ThumbImage.find(".slick-slide.active").removeClass("active");
      $(this).addClass("active");
      var goToSingleSlide = $(this).data("slick-index");
      $FeaturedImage.slick("slickGoTo", goToSingleSlide);
   });
   // Type thumb grid
   $(".thumbgrid .thumbItem").on("click", function (event) {
      event.preventDefault();
      var position = $(this).data("position");
      $FeaturedImage.slick("slickGoTo", position);
   });
   $("variant-radios label").click(function () {
      setTimeout(function () {
         var dindex = $FeaturedImage.find(".item.act").attr("data-slick-index");
         $FeaturedImage.slick("slickGoTo", dindex);
      }, 300);
   });

   if (responsive_mobile) {
      $(".thumbgrid .thumblist").slick({
         infinite: false,
         arrows: false,
         dots: false,
         slidesToShow: 4,
         slidesToScroll: 4,
      });
   }
};
novtheme.RelatedProduct = function () {
   var $this = $(".slick-relatedproduct");
   var nav = $($this).data("nav");
   var dots = $($this).data("dots");
   var loop = $($this).data("loop");
   var items = $($this).data("items");
   var lg = $($this).data("lg");
   var md = $($this).data("md");
   var sm = $($this).data("sm");
   var xs = $($this).data("xs");
   $($this).on("init", function (slick) {
      var classPattern = /col-[a-z]{2,}-\d+|col-\d+/g;
      $($this)
         .find(".slick-slide")
         .each(function () {
            var currentClasses = $(this).attr("class");
            var newClasses = currentClasses.replace(classPattern, "");
            $(this).attr("class", newClasses);
         });
   });
   $($this).slick({
      nextArrow:
         '<div class="arrow-next"><i class="zmdi zmdi-chevron-right"></i></div>',
      prevArrow:
         '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left"></i></i></div>',
      infinite: loop,
      slidesToShow: items,
      slidesToScroll: items,
      rtl: rtl,
      dots: dots,
      arrows: nav,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: lg,
               slidesToScroll: lg,
            },
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: md,
               slidesToScroll: md,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: sm,
               slidesToScroll: sm,
               dot: false,
               arrows: false,
            },
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: xs,
               slidesToScroll: xs,
               arrows: false,
               dot: false,
            },
         },
      ],
   });
};
novtheme.Countdown = function () {
   function startCountdown($countdown, showDays, restartCountdown) {
      var finalDate = $countdown.data("countdown");
      var showDays = showDays || false;
      var restartCountdown = restartCountdown || false;
      var finalDateGetTime = new Date(finalDate).getTime();
      var NewfinalDate = "";
      var now = new Date();
      if (finalDateGetTime - now.getTime() < 0 && restartCountdown == true) {
         NewfinalDate = new Date(
            now.getTime() +
               (86400 -
                  now.getHours() * 60 * 60 -
                  now.getMinutes() * 60 -
                  now.getSeconds()) *
                  1000
         );
      } else {
         NewfinalDate = finalDate;
      }
      var dayString = showDays
         ? '<div class="item-time"><span class="data-number">%D</span><span class="name-time">' +
           theme.strings.days +
           "</span></div>"
         : "";
      var countdown_format =
         dayString +
         '<div class="item-time"><span class="data-number">%H</span><span class="name-time">' +
         theme.strings.hours +
         "</span></div>" +
         '<div class="item-time"><span class="data-number">%M</span><span class="name-time">' +
         theme.strings.minutes +
         "</span></div>" +
         '<div class="item-time"><span class="data-number">%S</span><span class="name-time">' +
         theme.strings.seconds +
         "</span></div>";
      $countdown
         .countdown(NewfinalDate, function (event) {
            $countdown.html(event.strftime(countdown_format));
         })
         .on("finish.countdown", function () {
            if (restartCountdown) {
               startCountdown($countdown, showDays, restartCountdown);
            }
         });
   }

   $("[data-countdown]").each(function () {
      var showDays = $(this).data("show-days") || false;
      var restartCountdown = $(this).data("restart") || false;
      startCountdown($(this), showDays, restartCountdown);
   });
};
novtheme.eventBlockCart = function (e) {
   $(".cart_canvas .header-cart").click(function () {
      sidebarOverlay.addClass("act");
      $("#desktop_cart").addClass("active");
      $("[nov-item-act], [nov-btn-act]").removeClass("act");
      if (responsive_mobile) {
         body.addClass("open-canvans-cart");
         $("#show-megamenu, #mobile_menu").removeClass("act");
      }
   });
   $(".close_cart").click(function () {
      sidebarOverlay.removeClass("act");
      $("#desktop_cart").removeClass("active");
      $(".cart_extend").removeClass("act");
      $(".extend--label__item").removeClass("act");
      $(".cart_extend--label").removeClass("act");
      $("[nov-item-act], [nov-btn-act]").removeClass("act");
      if (responsive_mobile) {
         body.removeClass("open-canvans-cart");
      }
   });
};
novtheme.NovTogglePage = function () {
   $('.nov-toggle-page[data-target="#mobile-pageaccount"]').on(
      "click",
      function (e) {
         var target = $(this).data("target");
         $(target).hasClass("active")
            ? ($(target).removeClass("active"),
              sidebarOverlay.removeClass("act").css("z-index", "99"))
            : ($(target).addClass("active"),
              sidebarOverlay.addClass("act").css("z-index", "999"));
         e.preventDefault();
      }
   );
   $(".mobile-boxpage .close-box").on("click", function (e) {
      $(this).parents(".mobile-boxpage").removeClass("active");
      sidebarOverlay.removeClass("act");
      e.preventDefault();
   });
};
novtheme.HideShowPassword = function () {
   $(".hide_show_password").show();
   $(".hide_show_password span").addClass("show");
   $(".hide_show_password span").click(function () {
      if ($(this).hasClass("show")) {
         $(this).html('<i class="zmdi zmdi-eye"></i>');
         $('input[name="customer[password]"]').attr("type", "text");
         $(this).removeClass("show");
      } else {
         $(this).html('<i class="zmdi zmdi-eye-off"></i>');
         $('input[name="customer[password]"]').attr("type", "password");
         $(this).addClass("show");
      }
   });
   $('form button[type="submit"]').on("click", function () {
      $(".hide_show_password span").text("Show").addClass("show");
      $(".hide_show_password")
         .parent()
         .find('input[name="customer[password]"]')
         .attr("type", "password");
   });
   $(".login_switch").on("click", function () {
      if ($(this).hasClass("login-btn")) {
         $(".login_switch_register--toggle").css("transform", "translate(0)");
         $("#p_login").slideDown();
         $("#p_register").slideUp();
      } else {
         if (rtl == true) {
            $(".login_switch_register--toggle").css(
               "transform",
               "translate(-100%)"
            );
         } else {
            $(".login_switch_register--toggle").css(
               "transform",
               "translate(100%)"
            );
         }
         $("#p_login").slideUp();
         $("#p_register").slideDown();
      }
   });
};
novtheme.NovSearchToggle = function () {
   $(".search-button").on("click", function (e) {
      $(this).parent(".site-header__search").hasClass("search-active")
         ? $(this)
              .removeClass("active")
              .parent(".site-header__search")
              .removeClass("search-active")
         : $(this)
              .addClass("active")
              .parent(".site-header__search")
              .addClass("search-active");
      e.stopPropagation();
   });
   $(document).on("click", function (event) {
      if ($(event.target).is(".site-header__search input") == !1) {
         $(".site-header__search").removeClass("search-active");
         $(".search-button").removeClass("active");
      }
   });
   var words = $(".search-header__input").attr("placeholder"),
      arrayString = ["" + words + ""],
      part,
      i = 0,
      offset = 0,
      len = 1,
      forwards = true,
      skip_count = 0,
      skip_delay = 15,
      speed = 70;
   var wordflick = function () {
      setInterval(function () {
         if (forwards) {
            if (offset >= arrayString[i].length) {
               ++skip_count;
               if (skip_count == skip_delay) {
                  forwards = false;
                  skip_count = 0;
               }
            }
         } else {
            if (offset == 0) {
               forwards = true;
               i++;
               offset = 0;
               if (i >= len) {
                  i = 0;
               }
            }
         }
         part = arrayString[i].substr(0, offset);
         if (skip_count == 0) {
            if (forwards) {
               offset++;
            } else {
               offset--;
            }
         }
         $(".search-w__animate").text(part);
      }, speed);
   };
   wordflick();
   $(".search-w__animate").click(function () {
      $(".search-header__input").focus();
   });
};
novtheme.searchTrend = function () {
   var searchForms = $('form[action="/search"]').each(function () {
      var input = $(this).find('input[name="q"]');
      var searchTrend = $(this).find(".search_trend");
      var Height =
         ($(this).parents(".header-search__parent").outerHeight() -
            $(this).outerHeight()) /
         2;
      var offSetTrend = input.position().top + input.outerHeight() + Height;
      var offSet =
         input.position().top +
         input.innerHeight() +
         searchTrend.innerHeight() +
         Height -
         10;
      var offSetleft = $(this).offset().left * -1;
      var width = $(window).width();
      var searchInput = $(".search-header__input");
      var isSearchTrendVisible = false;
      if ($(this).find(".search-results__block").length == 0) {
         $('<div class="search-results__block"></div>')
            .css({ position: "absolute", top: offSet })
            .appendTo($(this))
            .hide();
      }
      if (currentWidth > 767) {
         $(this)
            .find(".search-results__block")
            .css({ width: width, left: offSetleft });
      } else {
         $(this).find(".search-results__block").css({ width: "100%", left: 0 });
      }
   });
};
novtheme.searchTrendWidth = function () {
   var searchForms = $('form[action="/search"]').each(function () {
      var input = $(this).find('input[name="q"]');
      var searchTrend = $(this).find(".search_trend");
      var Height =
         ($(this).parents(".header-search__parent").outerHeight() -
            $(this).outerHeight()) /
         2;
      var offSetTrend = input.position().top + input.outerHeight() + Height;
      var offSet =
         input.position().top +
         input.innerHeight() +
         searchTrend.innerHeight() +
         Height -
         10;
      var offSetleft = $(this).offset().left * -1;
      var width = $(window).width();

      if (currentWidth > 767) {
         searchTrend.css({ top: offSetTrend, width: width, left: offSetleft });
      } else {
         searchTrend.css({ top: offSetTrend, width: width, left: 0 });
      }
   });
};
novtheme.SearchAutoComplete = function () {
   var currentAjaxRequest = null;
   var searchForms = $('form[action="/search"]')
      .css("position", "relative")
      .each(function () {
         var input = $(this).find('input[name="q"]');

         $(this)
            .find(".search-results__block")
            .append('<ul class="search-results"></ul>');
         input.attr("autocomplete", "off").bind("keyup change", function () {
            var term = $(this).val();
            if (term.length > 0) {
               $(".search-w__animate").hide();
               $(".btn-search__clear-text").removeClass("hide");
               $(".search-header__content .icon").hide();
            } else {
               $(".search-w__animate").show();
               $(".btn-search__clear-text").addClass("hide");
               $(".search-header__content .icon").show();
            }
            $(".btn-search__clear-text").click(function () {
               $(".search-w__animate").show();
               $(".search-header__input").val("");
               $(".search-header__content .icon").show();
               $(this).addClass("hide");
            });
            var form = $(this).closest("form");
            var searchURL = "/search?type=product&q=" + term;
            var resultsListBlock = form.find(".search-results__block");
            var resultsList = form.find(".search-results");
            if (term.length > 3 && term != $(this).attr("data-old-term")) {
               $(this).attr("data-old-term", term);
               if (currentAjaxRequest != null) currentAjaxRequest.abort();
               currentAjaxRequest = $.getJSON(
                  searchURL + "&view=result",
                  function (data) {
                     resultsList.empty();
                     if (data.results_count == 0) {
                        // resultsList.html('<li><span class="title">No results.</span></li>');
                        // resultsList.fadeIn(200);
                        resultsListBlock.hide();
                     } else {
                        $.each(data.results, function (index, item) {
                           var link = $(
                              '<a class="text-center w-100"></a>'
                           ).attr("href", item.url);
                           link.append(
                              '<div class="thumbnail"><img src="' +
                                 item.thumbnail +
                                 '" class="w-100" /></div>'
                           );
                           link.append(
                              '<div class="title">' + item.title + "</div>"
                           );
                           link.append(
                              '<div class="price">' + item.price + "</div>"
                           );
                           link.wrap("<li></li>");
                           resultsList.append(link.parent());
                        });
                        if (data.results_count > 4) {
                           resultsListBlock.find(".search-see_all").remove();
                           resultsList.after(
                              '<div class="search-see_all"><a class="see_all btn" href="' +
                                 searchURL +
                                 '">' +
                                 theme.strings.results_all +
                                 " (" +
                                 data.results_count +
                                 ")</a></div>"
                           );
                        } else {
                           resultsListBlock.find(".search-see_all").remove();
                        }
                        resultsListBlock.fadeIn(200);
                     }
                  }
               );
            }
         });
      });
   $("body").bind("click", function () {
      $(".search-results__block").hide();
   });
};
novtheme.goToTop = function () {
   $(window).scroll(function () {
      if ($(window).scrollTop() >= $(window).height()) {
         $("#_desktop_back_top").fadeIn(500);
      } else {
         $("#_desktop_back_top").fadeOut(100);
      }
   });
   $("#_desktop_back_top").click(function () {
      $("body,html").animate({ scrollTop: 0 }, "normal");
   });
};
novtheme.PopupNewletter = function () {
   var popupSubscribe = $("#popup-subscribe");
   var date = new Date();
   var minutes = 60;
   date.setTime(date.getTime() + minutes * 60 * 1000);
   if (
      $.cookie("popupNewLetterStatus") != "closed" &&
      body.outerWidth() > 768
   ) {
      popupSubscribe.modal({
         show: !0,
      });
   }
   if (
      $.cookie("popupNewLetterStatus") != "closed" &&
      popupSubscribe.data("sm") == true &&
      responsive_mobile
   ) {
      popupSubscribe.modal({
         show: !0,
      });
   }
   $("input.no-view").change(function () {
      if ($("input.no-view").prop("checked") == 1) {
         $.cookie("popupNewLetterStatus", "closed", {
            expires: date,
            path: "/",
         });
      } else {
         $.cookie("popupNewLetterStatus", "", {
            expires: date,
            path: "/",
         });
      }
   });
   if (popupSubscribe.hasClass("promotion")) {
      popupSubscribe.click(function () {
         $.cookie("popupNewLetterStatus", "closed", {
            expires: date,
            path: "/",
         });
      });
   }
};
novtheme.MenuSidebar = function () {
   $(".categories__sidebar .hasSubCategory a").each(function (index) {
      if ($(this).hasClass("active")) {
         $(this).parent().children(".collapse").collapse("show");
      }
   });
};
novtheme.Nov_iframe_video = function () {
   var $videoSrc,
      modalVideo = $("#ModalVideo"),
      video = $("#video");
   $(".icon_play").click(function () {
      $videoSrc = $(this).data("src");
   });
   modalVideo.on("shown.bs.modal", function (e) {
      video.attr("src", $videoSrc);
   });
   modalVideo.on("hide.bs.modal", function (e) {
      video.attr("src", "");
   });
   $(".btn-video__play").each(function () {
      var id = $(this).data("id");
      $(this).click(function () {
         $(this).fadeOut();
         $('.bg-video__cover[data-id="' + id + '"]').fadeOut();
         $('video[data-id="' + id + '"]').trigger("play");
      });
      if (currentWidth < 992) {
         $('video[data-id="' + id + '"]').trigger("play");
      }
   });
};
novtheme.MegaMenuSlider = function () {
   var megaSlider = $(".megamenu-product-slider");
   var autoplay = megaSlider.data("autoplay");
   megaSlider.slick({
      autoplay: autoplay,
      autoplaySpeed: 2000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      rtl: rtl,
   });
};
novtheme.SliderSyncing = function () {
   var arrows = $(".nov-slick-for").data("nav");
   var dots = $(".nov-slick-for").data("dots");
   $(".nov-slick-for").slick({
      nextArrow:
         '<div class="arrow-next"><i class="zmdi zmdi-long-arrow-right"></i></div>',
      prevArrow:
         '<div class="arrow-prev"><i class="zmdi zmdi-long-arrow-left"></i></div>',
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: arrows,
      dots: dots,
      asNavFor: ".nov-slick-nav",
      rtl: rtl,
   });
   $(".nov-slick-nav").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      asNavFor: ".nov-slick-for",
      rtl: rtl,
   });
};
novtheme.LoadmoreByButton = function () {
   var moreButon = $(".btn_loadmore");
   var data = $(moreButon).parents(".grid--view-items");
   $(moreButon).each(function () {
      var btnHandle = $(this).attr("btn-handle");
      var nextUrl = $(this).attr("link");
      body.on("click", "." + btnHandle + "", function () {
         $.ajax({
            url: nextUrl,
            type: "GET",
            dataType: "html",
            beforeSend: function () {
               $("." + btnHandle).addClass("loading");
            },
         }).done(function (data) {
            $(".product__loadmore-" + btnHandle).append(
               $(data)
                  .find(".product__loadmore-" + btnHandle)
                  .html()
            );
            var m = $(".pagination__bar" + btnHandle + "").data("max");
            var dataitem = $(".product__loadmore-" + btnHandle);
            AnimateLoadmore(dataitem);
            if ($(".jdgm-widget").length) {
               jdgm.customizeBadges();
            }
            nextUrl = $(data).find(".btn_loadmore").attr("link");
            var n = $(".product__loadmore-" + btnHandle).find(".item").length;
            $(".pagination__count" + btnHandle + " .count").text(n);
            $(".pagination__bar" + btnHandle + " .progress").css(
               "width",
               (n / m) * 100 + "%"
            );
            if (n < m) {
               $("." + btnHandle).removeClass("loading");
            } else {
               $("." + btnHandle).remove();
            }
         });
      });
   });
   function AnimateLoadmore(el) {
      var xxl = el.data("xxl"),
         xl = el.data("xl"),
         lg = el.data("lg"),
         md = el.data("md"),
         sm = el.data("sm"),
         xs = el.data("xs");
      el.find(".item").each(function () {
         index = $(this).index() + 1;
         if ($(document).width() > 1439) {
            var n = xxl;
         }
         if ($(document).width() < 1440 && $(document).width() > 1199) {
            var n = xl;
         }
         if ($(document).width() < 1200 && $(document).width() > 991) {
            var n = lg;
         }
         if ($(document).width() < 992 && $(document).width() > 767) {
            var n = lg;
         }
         if ($(document).width() < 768 && $(document).width() > 575) {
            var n = sm;
         }
         if ($(document).width() < 576) {
            var n = xs;
         }
         var modulo = Math.round((index % n) * 0.3);
         $(this).attr("data-wow-duration", modulo + "s");
         if (index % n == 0) {
            var modulo0 = (index % n) + n * 0.3;
            $(this).attr("data-wow-duration", modulo0 + "s");
         }
      });
   }
};
novtheme.Mainmenu = function () {
   $(".site-nav--btn").click(function () {
      var mobileMenu = $("#mobile_menu");
      if ($(this).hasClass("act")) {
         $(this).removeClass("act");
         sidebarOverlay.add(mobileMenu).removeClass("act");
      } else {
         $(this).addClass("act");
         sidebarOverlay.add(mobileMenu).addClass("act");
      }
      $(".mobile-btn_search, #mobile_search").removeClass("act");
   });
   /*if($(document).width() < 1200 && $(document).width() > 767 ) {
        $('.site-nav--btn').click(function(){
            var mobileMenu = $('#mobile_menu');
            if ($(this).hasClass('act')) {
                $(this).removeClass('act');
                sidebarOverlay.add(mobileMenu).removeClass('act');
            } else {
                $(this).addClass('act');
                sidebarOverlay.add(mobileMenu).addClass('act');
            }
            $('.mobile-btn_search, #mobile_search').removeClass('act');
        });
        // Show sub menu canvas tablet
        $('.parent--lv1 .site-nav__link--main').click(function(e){
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).parent().find('.nav-dropdown--lv1').slideUp(300);
                $(this).find('.site-nav--direc i').addClass('zmdi-chevron-down').removeClass('zmdi-chevron-up');
            } else {
                $('.nav-dropdown--lv1').slideUp(300);
                $('.site-nav__link--main').removeClass('active');
                $(this).addClass('active');
                $(this).parent().find('.nav-dropdown--lv1').slideDown(300);
                $('.site-nav__link--main .site-nav--direc i').addClass('zmdi-chevron-down').removeClass('zmdi-chevron-up');
                $(this).find('.site-nav--direc i').addClass('zmdi-chevron-up').removeClass('zmdi-chevron-down');
            }
            $('#AccessibleNav .grid--view-items').slick('refresh');
        });

        // Show sub children menu canvas tablet
        $('.parent--lv2 .site-nav__link--second').click(function(e){
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).parent().find('.nav-dropdown--lv2').slideUp(300);
                $(this).find('.site-nav--direc i').addClass('zmdi-chevron-down').removeClass('zmdi-chevron-up');
            } else {
                $('.nav-dropdown--lv2').slideUp(300);
                $('.site-nav__link--second').removeClass('active');
                $(this).addClass('active');
                $(this).parent().find('.nav-dropdown--lv2').slideDown(300);
                $('.site-nav__link--second .site-nav--direc i').addClass('zmdi-chevron-down').removeClass('zmdi-chevron-up');
                $(this).find('.site-nav--direc i').addClass('zmdi-chevron-up').removeClass('zmdi-chevron-down');
            }
        });
    }*/
};
novtheme.CollectionPage = function () {
   var gridlistToggle = $(".gridlist-toggle"),
      collectionContent = $(".collection__product-content"),
      item = gridlistToggle.find("a");
   if (localStorage.getItem("view_collection")) {
      item.removeClass("active");
      if (
         gridlistToggle.find(
            '[data-type="' + localStorage.getItem("view_collection") + '"]'
         ).length > 0
      ) {
         gridlistToggle
            .find(
               '[data-type="' + localStorage.getItem("view_collection") + '"]'
            )
            .addClass("active");
         collectionContent.attr(
            "data-grid",
            localStorage.getItem("view_collection")
         );
      } else {
         gridlistToggle.find("a:first-child").addClass("active");
         collectionContent.attr(
            "data-grid",
            gridlistToggle.find("a:first-child").data("type")
         );
      }
   }
   item.click(function (e) {
      e.preventDefault();
      var typeview = $(this).data("type");
      if (!$(this).hasClass("active")) {
         collectionContent.attr("data-grid", typeview);
         item.removeClass("active");
         $(this).addClass("active");
      }
      localStorage.setItem(
         "view_collection",
         collectionContent.attr("data-grid")
      );
   });
   if ($(window).width() < 992) {
      collectionContent.attr("data-grid", "grid-3");
      item.removeClass("active");
      gridlistToggle.find("#grid-3").addClass("active");
      $(".collection-topsidebar .facets__label").addClass("act");
   }
   if ($(window).width() < 768) {
      collectionContent.attr("data-grid", "grid-2");
      item.removeClass("active");
      gridlistToggle.find("#grid-2").addClass("active");
   }
   // Click filter sort by
   var sortBy = $('[name="sort_by"]'),
      text = sortBy.find('[selected="selected"]').text(),
      val = sortBy.find('[selected="selected"]').attr("value"),
      sortbyFilter = $("[data-sortby-filter]"),
      sortbyItem = sortbyFilter.find("[data-sortby-item]");
   sortbyFilter.find(".sort-by__label").text(text);
   sortbyFilter.find('[value="' + val + '"]').addClass("act");
   sortbyItem.click(function () {
      var valuesort = $(this).attr("value");
      var newtext = $(this).text();
      sortbyItem.removeClass("act");
      $(this).addClass("act");
      sortbyFilter.find(".sort-by__label").text(newtext);
      sortBy.val(valuesort);
      const form = document.querySelector("facet-filters-form");
      form.onSubmitHandlerSortBy(event, form.querySelector("form"));
   });
   if (!isClickEventAttached) {
      $(".collection__category-seemore").click(function () {
         $(".collection__category-item.hide").slideToggle(300);
      });
      isClickEventAttached = true;
   }
};
novtheme.CollectionPageLoadmore = function () {
   var product_grid = $(".collection__grid-loadmore"),
      next_url = product_grid.data("next-url"),
      btnLoadmore = $(".collection__btn-loadmore");
   if (next_url) {
      btnLoadmore.click(function () {
         CollectionLoadmore();
      });
   }
   function CollectionLoadmore() {
      $.ajax({
         url: next_url,
         type: "GET",
         dataType: "html",
         beforeSend: function () {
            btnLoadmore.addClass("loading");
         },
      }).done(function (next_page) {
         var new_page = $(next_page).find(".collection__grid-loadmore"),
            new_url = new_page.data("next-url"),
            m = $(".pagination__bar").data("max");
         next_url = new_url;
         if (typeof next_url !== "undefined") {
            btnLoadmore.removeClass("loading");
         } else {
            btnLoadmore.remove();
         }
         product_grid.append(new_page.html());
         var n = product_grid.find(".product--item").length;
         $(".pagination__count .count").text(n);
         $(".pagination__bar .progress").css("width", (n / m) * 100 + "%");
         jdgm.customizeBadges();
         Currency.convertAll(
            shopCurrency,
            $("#currencies span.selected").attr("data-currency")
         );
      });
   }
};
novtheme.NovAccordion = function () {
   var title = $(".nov-accordion__title"),
      content = $(".nov-accordion__content");
   title.each(function () {
      if (responsive_mobile) {
         $(this).removeClass("act");
         $(this).parent().find(content).hide();
      }
      if ($(this).hasClass("act")) {
         $(this).parent().find(content).show();
      }
      $(this).click(function () {
         if ($(this).hasClass("act")) {
            $(this).removeClass("act");
            $(this).parent().find(content).slideUp();
         } else {
            $(this).parents(".nov-accordion").find(title).removeClass("act");
            $(this).parents(".nov-accordion").find(content).slideUp();
            $(this).addClass("act");
            $(this).parent().find(content).slideDown();
         }
      });
   });
};
novtheme.RunParallax = function () {
   var winHeight = $(window).height();
   if ($(".block__parallax").length) {
      $(".block__parallax").each(function () {
         var Event = false,
            offset_top = $(this).offset().top,
            distance = offset_top - winHeight;
         $(window).on("scroll", function () {
            var currentPosition = $(document).scrollTop();
            if (currentPosition > distance && Event === false) {
               Event = true;
               novtheme.Parallax();
            }
         });
      });
   }
};
novtheme.Parallax = function () {
   $(window).scroll(function () {
      $(".nov_block__parallax").each(function () {
         var winHeight = $(window).height(),
            currentPosition = $(window).scrollTop(),
            offset_top = $(this).offset().top;
         if (currentPosition - offset_top < 0) {
            var scrolled = (offset_top - currentPosition) * 0.1;
            $(this)
               .find(".itemY_parallax")
               .css("transform", "translateY(" + scrolled + "px)");
         } else {
            var scrolled = (currentPosition - offset_top) * 0.1;
            $(this)
               .find(".itemY_parallax")
               .css("transform", "translateY(-" + scrolled + "px)");
         }
      });
   });
};
novtheme.LookBook = function () {
   $(".nov-content-lookbook").each(function () {
      var el = $(this),
         $Carousel = el.find(".Lookbook__carousel"),
         btn = el.find(".lb_btn"),
         number = el.find(".number-lookbook");
      btn.click(function () {
         if ($Carousel.not(".owl-loaded")) {
            $Carousel.owlCarousel({
               navText: [
                  '<i class="zmdi zmdi-chevron-left"></i>',
                  '<i class="zmdi zmdi-chevron-right"></i>',
               ],
               nav: true,
               dots: false,
               items: 1,
               margin: 10,
               stagePadding: 0,
               animateIn: "fadeInDown",
               animateOut: "fadeOutRight",
               lazyLoad: true,
               mouseDrag: true,
               touchDrag: true,
               autoHeight: true,
               rtl: rtl,
               responsive: {
                  0: {
                     nav: false,
                  },
                  1200: {
                     nav: true,
                  },
               },
            });
            $Carousel.on("changed.owl.carousel", function (event) {
               var position = event.item.index;
               number.removeClass("active");
               number
                  .parent()
                  .find("[data-position=" + position + "]")
                  .addClass("active");
            });
         }
      });
      number.click(function () {
         var position = $(this).data("position");
         number.removeClass("active");
         $(this).addClass("active");
         $Carousel.trigger("to.owl.carousel", position);
      });
   });
   $(".Look__content").each(function () {
      var el = $(this);
      xl = el.data("xl");
      el.find(".btn_loadmore").click(function () {
         var s = el.find(".item.show").length + xl;
         el.find(".item.hide").each(function () {
            var p = $(this).data("position");
            if (p <= s) {
               $(this)
                  .slideDown("700", "linear")
                  .removeClass("hide")
                  .addClass("show");
               if (el.find(".item.hide").length == 0) {
                  el.find(".btn_loadmore").parent().hide();
                  el.parents(".distance").removeClass("h_sm");
               }
            }
         });
      });
   });
   if ($(".item-lookbook").length > 0) {
      $(".item-lookbook").each(function () {
         var el = $(this),
            el_c = $(this).children(".content-lookbook"),
            t = el.position().top,
            l = el.position().left,
            ew = el.outerWidth(),
            h = el.offsetParent().height(),
            w = el.offsetParent().width(),
            c = el_c.width();
         if (w / 2 < l) {
            el_c.css("right", (ew - 40) / 2 + 40);
            if (w - l + c > w) {
               el_c.css("margin-right", (w - l + c - w) * -1);
            }
         } else {
            el_c.css("left", (ew - 40) / 2 + 40);
            if (l + ew + c > w) {
               el_c.css("margin-left", (l + ew + c - w) * -1);
            }
         }
         if (h / 2 < t) {
            if ($(window).width > 575) {
               el_c.css("bottom", "60px");
            } else {
               el_c.css("bottom", "35px");
            }
         } else {
            if ($(window).width > 575) {
               el_c.css("top", "60px");
            } else {
               el_c.css("top", "35px");
            }
         }
      });
   }
};
novtheme.Language = function () {
   var flag = $(".nov-language").find(".active .flag-icon").html();
   $(".nov-language")
      .find(".dropdown-toggle")
      .prepend('<span class="flag-icon"></span>');
   $(".nov-language").find(".dropdown-toggle .flag-icon").html(flag);
   $(".nov-language").each(function () {
      var form = $(this),
         input = form.find(
            'input[name="locale_code"], input[name="country_code"]'
         ),
         item = form.find(".lang__item");
      item.click(function () {
         var value = $(this).data("value");
         input.val(value);
         form.submit();
      });
   });
};
novtheme.CartExtent = function () {
   var close = theme.strings.close_mini_canvas;
   $(document).on("click", ".extend--label__item", function () {
      var dataTitle = $(this).data("label"),
         item = $(".extend--label__item"),
         label = $(".cart_extend--label"),
         cartExtend = $(".cart_extend");
      if ($(this).hasClass("act")) {
         $(this).removeClass("act");
         cartExtend.removeClass("act");
         label.removeClass("act");
         $(this).attr("data-original-title", dataTitle);
      } else {
         var siblings = $(this).siblings();
         siblings.each(function () {
            var sibTitle = $(this).data("title");
            siblings.removeClass("act");
            $(this).attr("data-original-title", sibTitle);
         });
         cartExtend.removeClass("act");
         label.removeClass("act");
         $(this).addClass("act");
         $(this).attr("data-original-title", close);
         $('.cart_extend[data-content="' + dataTitle + '"]').addClass("act");
         label.addClass("act");
      }
      if (responsive_mobile) {
         $(".block_cart_canvas #desktop_cart").addClass("open-extend");
      }
   });
   $(".extend--label__item").hover(
      function () {
         var title = $(this).attr("title");
         if ($(this).hasClass("act")) {
            $(this).attr("data-original-title", close);
         } else {
            $(this).attr("data-original-title", title);
         }
      },
      function () {
         if ($(this).hasClass("act") && typeof title !== "undefined") {
            $(this).attr("data-original-title", title);
         } else {
            $(this).attr("data-original-title", close);
         }
      }
   );
   $(document).on("click", ".cart_extend--btn", function () {
      $(".cart_extend, .cart_extend--label, .extend--label__item").removeClass(
         "act"
      );
      if (responsive_mobile) {
         $(".block_cart_canvas #desktop_cart").removeClass("open-extend");
      }
   });
   $(document).on("click", ".btn_save--discount", function () {
      var val = $(this).parent().find("input").val();
      $(".js-form-discount").val(val);
   });
   // Get paramaters from the URL
   function getParameterByName(name, url) {
      if (!url) {
         url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
         results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
   }
   $discountInput = $("input.js-form-discount");
   $coupon = getParameterByName("coupon");
   if ($coupon) {
      $.cookie("discountCode", $coupon, 30);
   }
   $discountCode = $.cookie("discountCode");
   if ($discountCode) {
      if ($discountInput.length > 0) {
         $discountInput.val($discountCode);
      }
   }
   if (responsive_mobile) {
      var height = $("#desktop_cart.item_count .block_cart_top").height();
      var flag = true;
      var offsetTop = 0;
      $("#desktop_cart").scroll(function () {
         var scrollTop = $("#desktop_cart").scrollTop();
         if (scrollTop > height) {
            $("#desktop_cart.item_count .block_cart_top").addClass(
               "scroll-down"
            );
         } else {
            $("#desktop_cart.item_count .block_cart_top").removeClass(
               "scroll-down"
            );
         }
         if (scrollTop < offsetTop && scrollTop > height) {
            if (flag == true) {
               $("#desktop_cart.item_count .block_cart_top")
                  .removeClass("scroll-down")
                  .addClass("sticky-sm");
               flag = false;
            }
         } else {
            if (flag == false) {
               $("#desktop_cart.item_count .block_cart_top")
                  .addClass("scroll-down")
                  .removeClass("sticky-sm");
               flag = true;
            }
         }
         offsetTop = scrollTop;
      });
   }
};
novtheme.AddActive = function () {
   $("[nov-btn-act]").click(function () {
      var data = $(this).data("toggle");
      if ($(this).hasClass("act")) {
         $(this).removeClass("act");
         $('[data-act="' + data + '"]').removeClass("act");
         body.removeClass("" + data + "-open");
         if ($(this).is("[overlay]")) {
            sidebarOverlay.removeClass("act").removeAttr("data-close");
         }
      } else {
         $("[nov-btn-act]").removeClass("act");
         $(this).addClass("act");
         $("[nov-item-act]").removeClass("act");
         $('[data-act="' + data + '"]').addClass("act");
         body.addClass("" + data + "-open");
         if ($(this).is("[overlay]")) {
            sidebarOverlay.addClass("act").attr("data-close", data);
         }
      }
   });
   $("[nov-btn-close]").click(function () {
      var data = $(this).data("close");
      $(
         '[data-act="' + data + '"], .sidebar-overlay, [nov-btn-act]'
      ).removeClass("act");
      sidebarOverlay.removeAttr("data-close");
      body.removeClass("" + data + "-open");
   });
   $('[data-toggle="modal"]').click(function () {
      $("[nov-btn-act], [nov-item-act]").removeClass("act");
      sidebarOverlay.removeClass("act");
   });
   $("[btn-toggle]").click(function () {
      var toggle = $(this).data("toggle");
      $(this).toggleClass("act");
      $('[nov-toggle="' + toggle + '"]').slideToggle(400);
   });
};
novtheme.ProductStickyAddToCart = function () {
   var winHeight = $(window).height();
   $(window).scroll(function () {
      if ($(window).scrollTop() > winHeight) {
         $(".product-single__stick-add").addClass("act");
      } else {
         $(".product-single__stick-add").removeClass("act");
      }
   });
   $(window).on("load", function () {
      if ($(".product-single__stick-add").length > 0 && currentWidth >= 768) {
         var h = $(".product-single__stick-add").height();
         body.css("padding-bottom", h);
      }
   });
};
novtheme.ProductSingleSlider = function () {
   $(".nov-product__single-slide").each(function () {
      var el = $(this);
      var autoplay = el.data("autoplay");
      var speed = el.data("speed");
      el.slick({
         autoplay: autoplay,
         autoplaySpeed: speed,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         dots: true,
         rtl: rtl,
         pauseOnHover: false,
         pauseOnFocus: false,
         adaptiveHeight: true,
      });
   });
};
novtheme.SlideShowParallax = function () {
   if (currentWidth > 1023) {
      var scene = $(".section-slideshow .img_animate");
      scene.parallax();
   }
};
novtheme.BtnSlider = function () {
   $(".nov-btn-click-slider").each(function () {
      var el = $(this),
         offsetLeft = el.offset().left,
         slider = el.find(".el-slider"),
         btn = el.find(".btn-slider__el"),
         left = el.find(".active").offset().left;
      width = el.find(".active").width();
      if (rtl == true) {
         slider.css("left", left + width - offsetLeft - 26);
      } else {
         slider.css("left", left - offsetLeft);
      }
      btn.click(function () {
         btn.parent().removeClass("active");
         var n_left = $(this).parent().offset().left;
         var n_width = $(this).parent().width();
         $(this).parent().addClass("active");
         slider.css("left", n_left + n_width - offsetLeft - 26);
      });
   });
};
novtheme.NavDropdownMobile = function () {
   $(".nav-mobile").each(function () {
      el = $(this);
      var t = el.find(".active").text();
      var h = el.find(".nav-mobile__title");
      h.text(t);
      el.find(".nav-link").click(function () {
         h.text($(this).text());
      });
   });
};
novtheme.NumberAnimate = function () {
   var winHeight = $(window).height();
   $(".number-animate").each(function () {
      var el = $(this);
      var Event = false,
         offset_top = el.offset().top,
         distance = offset_top - winHeight;
      $(window).on("scroll", function () {
         var currentPosition = $(this).scrollTop();
         if (currentPosition > distance && !Event) {
            Event = true;
            function NovRunNumber() {
               el.prop("number", 0).animate(
                  {
                     number: el.text(),
                  },
                  {
                     duration: 2000,
                     easing: "swing",
                     step: function (e) {
                        $(this).text(Math.ceil(e));
                     },
                  }
               );
            }
            NovRunNumber();
         }
      });
   });
};
novtheme.FakeOrder = function () {
   if ($("#nov-popup-fake-order").length > 0) {
      var fakeOrder = $("#nov-popup-fake-order");
      var orderData = $("#fake-order-data");
      var closefakeOrder = fakeOrder.find(".close-popup");
      var mobile = $("#nov-popup-fake-order").data("xs");
      var date = new Date();
      var time = fakeOrder.data("time");
      date.setTime(date.getTime() + time);
      var intervalId = setInterval(function () {
         insertRandomData(fakeOrder, orderData);
      }, time);
      if ($.cookie("FakeOrder") != "closed") {
         intervalId;
      } else {
         clearInterval(intervalId);
      }
      closefakeOrder.click(function () {
         $.cookie("FakeOrder", "closed", { expires: 1, path: "/" });
         fakeOrder.removeClass("act");
         clearInterval(intervalId);
      });
      if (mobile === false) {
         fakeOrder.remove();
      }
      function insertRandomData(fakeOrder, orderData) {
         if (fakeOrder.hasClass("act")) {
            fakeOrder.removeClass("act");
         } else {
            var productImage = fakeOrder.find(".product-image");
            var productTitle = fakeOrder.find(".product-title");
            var productTime = fakeOrder.find(".time");
            var productName = fakeOrder.find(".name");
            var productLocal = fakeOrder.find(".local");

            var productItems = $(orderData).find(".product-item");
            var randomIndex = Math.floor(Math.random() * productItems.length);
            var randomProductItem = productItems.eq(randomIndex);
            var imgSrc = randomProductItem.data("img");
            var title = randomProductItem.data("title");
            var productLink = randomProductItem.data("src");

            var dataTime = $(orderData).find(".time-item");
            var randomIndex = Math.floor(Math.random() * dataTime.length);
            var randomTimeItem = dataTime.eq(randomIndex);
            var time = randomTimeItem.data("time");

            var dataLocal = $(orderData).find(".location-item");
            var randomIndex = Math.floor(Math.random() * dataLocal.length);
            var randomLocalItem = dataLocal.eq(randomIndex);
            var local = randomLocalItem.data("local");

            var dataName = $(orderData).find(".name-item");
            var randomIndex = Math.floor(Math.random() * dataName.length);
            var randomNameItem = dataName.eq(randomIndex);
            var name = randomNameItem.data("name");

            productImage.attr("href", productLink);
            productImage.find("img").attr("src", imgSrc);
            productTitle.html(title).attr("href", productLink);
            productTime.html(time);
            productName.html(name);
            productLocal.html(local);
            fakeOrder.addClass("act");
            fakeOrder.find("a").unbind();
         }
      }
   }
};
novtheme.CookieGDPR = function () {
   var date = new Date();
   date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
   if ($.cookie("CookieGDPR") !== "closed") {
      $("#popup-CookieGDPR").addClass("act");
   }
   $(".btn-cookie-GDPR").click(function () {
      $.cookie("CookieGDPR", "closed", {
         expires: date,
         path: "/",
      });
      $("#popup-CookieGDPR").removeClass("act");
   });
};
novtheme.VerticalMenu = function () {
   function showSubMenu() {
      $(".site-nav-vertical").addClass("act");
      $(".sidebar-overlay").addClass("act").css("z-index", "90");
   }

   function hideSubMenu() {
      $(".site-nav-vertical").removeClass("act");
      $(".sidebar-overlay").removeClass("act").css("z-index", "initial");
   }

   function hideAllSubMenus() {
      $(".nav-dropdown--lv1, .nav-dropdown--lv2").slideUp(300);
      $(".site-nav__link--main, .site-nav__link--second").removeClass("active");
   }

   // Save initial state of #desktopVerticalMenu and #mobileVerticalMenu
   var desktopMenuContent = $("#desktopVerticalMenu").html();
   var mobileMenuContent = $("#mobileVerticalMenu").html();

   // Handle for screens larger than 1199px (runs as soon as the page is first loaded and when resizing from screens smaller than 992px to larger than 1200px)
   function handleLargeScreen() {
      // Move the content from #desktopVerticalMenu to the original state
      $("#desktopVerticalMenu").html(desktopMenuContent);
      // Clear the content of #mobileVerticalMenu
      $("#mobileVerticalMenu").empty();
      // Assign click event to .btn-vertical button only when screen is bigger than 1199px
      $(".btn-vertical")
         .off("click")
         .on("click", function () {
            $(this).toggleClass("act");
            $("#desktopVerticalMenu").slideToggle();
            if ($(".site-nav-vertical").hasClass("act")) {
               $(".site-nav-vertical").removeClass("act");
            } else {
               $(".site-nav-vertical").addClass("act");
            }
         });
   }

   // Handle for screens less than or equal to 1199px (runs as soon as the page is first loaded and when resizing from screens larger than 1200px to smaller than 1200px)
   function handleSmallScreen() {
      // Move content from #desktopVerticalMenu to #mobileVerticalMenu
      $("#mobileVerticalMenu").html(desktopMenuContent);
      // Clear the contents of #desktopVerticalMenu
      $("#desktopVerticalMenu").empty();
      // Assign click event to .btn-vertical button only when screen is less than or equal to 1199px
      $(".btn-vertical")
         .off("click")
         .on("click", function () {
            $(this).toggleClass("act");
            if ($(".site-nav-vertical").hasClass("act")) {
               hideSubMenu();
               hideAllSubMenus();
            } else {
               showSubMenu();
            }
         });
   }

   function handleResize() {
      if ($(window).width() <= 1200) {
         handleSmallScreen();
         $(".parent--lv1 .site-nav__link--main").click(function (e) {
            e.preventDefault();
            var $navDropdown = $(this).siblings(".nav-dropdown--lv1");
            if ($navDropdown.is(":visible")) {
               $navDropdown.slideUp(300);
               $(this).removeClass("active");
            } else {
               hideAllSubMenus();
               $navDropdown.slideDown(300);
               $(this).addClass("active");
            }
         });

         // Show sub children menu canvas tablet
         $(".parent--lv2 .site-nav__link--second").click(function (e) {
            e.preventDefault();
            var $navDropdown = $(this).siblings(".nav-dropdown--lv2");
            if ($navDropdown.is(":visible")) {
               $navDropdown.slideUp(300);
            } else {
               $(".nav-dropdown--lv2").slideUp(300);
               $(".site-nav__link--second").removeClass("active");
               $navDropdown.slideDown(300);
               $(this).addClass("active");
            }
            e.stopPropagation();
         });

         // Prevent hiding parent dropdown when clicking on .site-nav__link--send
         $(".parent--lv1")
            .find(".site-nav__link--send")
            .click(function (e) {
               e.stopPropagation();
            });
      } else {
         handleLargeScreen();
      }
   }

   // Call the handleResize function when the web page is first loaded
   $(document).ready(function () {
      handleResize();
   });

   // Call the handleResize function when the resize event occurs
   $(window).resize(function () {
      handleResize();
   });
};
$(window).on("resize", function () {
   novtheme.searchTrendWidth();
});
$(document).ready(function () {
   $(novtheme.init);
   var timer = false;

   $(window).on("resize", function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
         novtheme.CollectionPage();
         novtheme.toggleMobileStyles();
         novtheme.load_canvas_menu();
         novtheme.Mainmenu();
         if ($(window).width() > 575) {
            $(".block_footer").find(".block-content.h_t").slideDown(300);
            $(".f_btn_sl").removeClass("active");
         } else {
            $(".block_footer").find(".block-content.h_t").slideUp(300);
         }
      }, 300);
   });
   $("video").each(function () {
      var alt = $(this).data("alt");
      if (alt && alt.length) {
         $(this).find("img").attr("alt", alt);
      }
   });
   if ($("#popup-subscribe").length) {
      $(window).on("load", function () {
         setTimeout(function () {
            novtheme.PopupNewletter();
         }, 2000);
      });
   }
   if ($("#popupAlert").length) {
      $(window).on("load", function () {
         $("#popupAlert").modal();
      });
      $("#popupAlert").click(function () {
         const url = window.location.href;
         const questionMarkIndex = url.indexOf("?customer");
         if (questionMarkIndex !== -1) {
            const previousLink = url.slice(0, questionMarkIndex);
            history.pushState({}, "", previousLink);
         }
      });
   }

   sidebarOverlay.on("click", function () {
      var data = $(this).data("close");
      $(this).removeClass("act");
      $(
         ".cart_extend, .extend--label__item, .cart_extend--label, #mobile_menu, #show-megamenu, .site-nav--btn, [nov-item-act], [nov-btn-act], #mobileVerticalMenu"
      ).removeClass("act");
      $("#desktop_cart, #AccessibleNav").removeClass("active");
      body
         .css("overflow", "auto")
         .removeClass("open-canvans-cart, " + data + "-open");
      $(this).removeAttr("data-close");
   });

   // Animate load wislist page detail
   $(".group-quantity .btnProductWishlist").click(function () {
      if ($(this).hasClass("whislist-added")) {
         $("#popup-Wishlist").removeClass("novload");
      } else {
         $("#popup-Wishlist").addClass("novload");
      }
   });

   // Zoom Product Image Page Detail
   if (currentWidth >= 992) {
      var productImageZoom = $(".image-zoom");
      $(".image-zoom").each(function () {
         productImageZoom = $(this);
         var alt = productImageZoom.find("img").attr("alt");
         productImageZoom.trigger("zoom.destroy");
         productImageZoom
            .wrap('<span class="w-100" style="display:block"></span>')
            .css("display", "block")
            .parent()
            .zoom({
               url: productImageZoom.attr("data-zoom"),
            });
      });
   }

   // Form newletter product soldout
   $(".no-view").click(function () {
      if ($(".contact-form").hasClass("add")) {
         $(".contact-form").removeClass("add");
      } else {
         $(".contact-form").addClass("add");
      }
   });

   // Accordion footer mobile
   $(".f_btn_sl").click(function (e) {
      if ($(this).hasClass("active")) {
         $(this).removeClass("active");
         $(this)
            .parents(".block_footer")
            .find(".block-content.h_t")
            .slideUp(300);
      } else {
         $(".f_btn_sl").removeClass("active");
         $(".block_footer .block-content.h_t").slideUp(300);
         $(this).addClass("active");
         $(this)
            .parents(".block_footer")
            .find(".block-content.h_t")
            .slideDown(300);
      }
   });

   $(".faqs-main .panel-header").click(function (e) {
      if ($(this).hasClass("collapsed")) {
         $(".faqs-main").removeClass("active");
         $(this).parents(".faqs-main").addClass("active");
      } else {
         $(this).parents(".faqs-main").removeClass("active");
      }
   });

   $(".promotion-close").click(function () {
      $("[promationBar]").slideUp(300).removeClass("act");
   });

   new WOW().init();

   new Vue({
      el: "#nov-gallery-image-3d",
      data: {
         slides: 5,
      },
      components: {
         "carousel-3d": window["carousel-3d"].Carousel3d,
         slide: window["carousel-3d"].Slide,
      },
   });

   $(window).on("load", function () {
      var loader = $(".preloader_nov");
      if (loader.length) {
         $(window).on("beforeunload", function () {
            loader.fadeIn(500);
         });
         loader.fadeOut(1500);
      }
   });
});
