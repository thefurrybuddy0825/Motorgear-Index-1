window.theme = window.theme || {};
theme.Sections = function Sections() {
   this.constructors = {};
   this.instances = [];
   $(document)
      .on("shopify:section:load", this._onSectionLoad.bind(this))
      .on("shopify:section:unload", this._onSectionUnload.bind(this))
      .on("shopify:section:select", this._onSelect.bind(this))
      .on("shopify:section:deselect", this._onDeselect.bind(this))
      .on("shopify:block:select", this._onBlockSelect.bind(this))
      .on("shopify:block:deselect", this._onBlockDeselect.bind(this));
};
theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
   _createInstance: function (container, constructor) {
      var $container = $(container);
      var id = $container.attr("data-section-id");
      var type = $container.attr("data-section-type");
      constructor = constructor || this.constructors[type];
      if (_.isUndefined(constructor)) {
         return;
      }
      var instance = _.assignIn(new constructor(container), {
         id: id,
         type: type,
         container: container,
      });
      this.instances.push(instance);
   },
   _onSectionLoad: function (evt) {
      var container = $("[data-section-id]", evt.target)[0];
      if (container) {
         this._createInstance(container);
      }
   },
   _onSectionUnload: function (evt) {
      this.instances = _.filter(this.instances, function (instance) {
         var isEventInstance = instance.id === evt.detail.sectionId;
         if (isEventInstance) {
            if (_.isFunction(instance.onUnload)) {
               instance.onUnload(evt);
            }
         }
         return !isEventInstance;
      });
   },
   _onSelect: function (evt) {
      var instance = _.find(this.instances, function (instance) {
         return instance.id === evt.detail.sectionId;
      });
      if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
         instance.onSelect(evt);
      }
   },
   _onDeselect: function (evt) {
      var instance = _.find(this.instances, function (instance) {
         return instance.id === evt.detail.sectionId;
      });
      if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
         instance.onDeselect(evt);
      }
   },
   _onBlockSelect: function (evt) {
      var instance = _.find(this.instances, function (instance) {
         return instance.id === evt.detail.sectionId;
      });
      if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
         instance.onBlockSelect(evt);
      }
   },
   _onBlockDeselect: function (evt) {
      var instance = _.find(this.instances, function (instance) {
         return instance.id === evt.detail.sectionId;
      });
      if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
         instance.onBlockDeselect(evt);
      }
   },
   register: function (type, constructor) {
      this.constructors[type] = constructor;
      $("[data-section-type=" + type + "]").each(
         function (index, container) {
            this._createInstance(container, constructor);
         }.bind(this)
      );
   },
});
window.theme = theme || {};
// RecoverPassword Page Login
theme.customerTemplates = (function () {
   function initEventListeners() {
      // Show reset password form
      $("#RecoverPassword").on("click", function (evt) {
         evt.preventDefault();
         toggleRecoverPasswordForm();
      });

      // Hide reset password form
      $("#HideRecoverPasswordLink").on("click", function (evt) {
         evt.preventDefault();
         toggleRecoverPasswordForm();
      });
   }

   /* Show/Hide recover password form */
   function toggleRecoverPasswordForm() {
      $("#RecoverPasswordForm").toggleClass("hide");
      $("#CustomerLoginForm").toggleClass("hide");
   }

   /* Show reset password success message */
   function resetPasswordSuccess() {
      var $formState = $(".reset-password-success");

      // check if reset password form was successfully submited.
      if (!$formState.length) {
         return;
      }

      // show success message
      $("#ResetSuccess").removeClass("hide");
   }

   /* Show/hide customer address forms */
   function customerAddressForm() {
      var $newAddressForm = $("#AddressNewForm");

      if (!$newAddressForm.length) {
         return;
      }

      // Initialize observers on address selectors, defined in shopify_common.js
      if (Shopify) {
         // eslint-disable-next-line no-new
         new Shopify.CountryProvinceSelector(
            "AddressCountryNew",
            "AddressProvinceNew",
            {
               hideElement: "AddressProvinceContainerNew",
            }
         );
      }

      // Initialize each edit form's country/province selector
      $(".address-country-option").each(function () {
         var formId = $(this).data("form-id");
         var countrySelector = "AddressCountry_" + formId;
         var provinceSelector = "AddressProvince_" + formId;
         var containerSelector = "AddressProvinceContainer_" + formId;

         // eslint-disable-next-line no-new
         new Shopify.CountryProvinceSelector(
            countrySelector,
            provinceSelector,
            {
               hideElement: containerSelector,
            }
         );
      });

      // Toggle new/edit address forms
      $(".address-new-toggle").on("click", function () {
         $newAddressForm.toggleClass("hide");
      });

      $(".address-edit-toggle").on("click", function () {
         var formId = $(this).data("form-id");
         $("#EditAddress_" + formId).toggleClass("hide");
      });

      $(".address-delete").on("click", function () {
         var $el = $(this);
         var formId = $el.data("form-id");
         var confirmMessage = $el.data("confirm-message");

         // eslint-disable-next-line no-alert
         if (
            confirm(
               confirmMessage || "Are you sure you wish to delete this address?"
            )
         ) {
            Shopify.postLink("/account/addresses/" + formId, {
               parameters: { _method: "delete" },
            });
         }
      });
   }

   /* Check URL for reset password hash */
   function checkUrlHash() {
      var hash = window.location.hash;

      // Allow deep linking to recover password form
      if (hash === "#recover") {
         toggleRecoverPasswordForm();
      }
   }

   return {
      init: function () {
         checkUrlHash();
         initEventListeners();
         resetPasswordSuccess();
         customerAddressForm();
      },
   };
})();
// RecoverPassword Popup Index
theme.customerloginTemplates = (function () {
   function initEventsListeners() {
      // Show reset password form
      $("#RecoversPassword").on("click", function (evt) {
         evt.preventDefault();
         toggleRecoverPasswordFormIndex();
      });

      // Hide reset password form
      $("#HideRecoverPasswordIndex").on("click", function (evt) {
         evt.preventDefault();
         toggleRecoverPasswordFormIndex();
      });
   }

   /* Show/Hide recover password form */
   function toggleRecoverPasswordFormIndex() {
      $("#RecoverPasswordFormIndex").slideToggle("fast");
   }
   return {
      init: function () {
         initEventsListeners();
      },
   };
})();
window.theme = window.theme || {};
theme.Nov_Slickcarousel = (function () {
   function Nov_Slickcarousel(container) {
      var $container = (this.$container = $(container));
      var sectionId = $container.attr("data-section-id");
      var slider = (this.slider =
         "#shopify-section-" + sectionId + " .nov-slick-carousel");
      var slider2 = (this.slider =
         "#shopify-section-" + sectionId + " .nov-slick-carousel2");
      var sliderNavfor = (this.slider =
         "#shopify-section-" + sectionId + " .nov-slick-navfor-carousel");
      var slidercenter = (this.slider =
         "#shopify-section-" + sectionId + " .nov-slick-center-carousel");
      var slidercenternf = (this.slider =
         "#shopify-section-" +
         sectionId +
         " .nov-slick-center-carousel-navfor");
      if ($("html").hasClass("lang-rtl")) var rtl = true;
      else var rtl = false;
      var autoplay = $(slider).data("autoplay"),
         autoplaytimeout = $(slider).data("autoplaytimeout"),
         infinite = $(slider).data("loop"),
         dots = $(slider).data("dots"),
         nav = $(slider).data("nav"),
         rows = $(slider).data("row"),
         row_mobile = $(slider).data("row_mobile")
            ? $(slider).data("row_mobile")
            : 1,
         fade = $(slider).data("fade"),
         items = $(slider).data("items"),
         items_xxl = $(slider).data("items_xxl")
            ? $(slider).data("items_xxl")
            : items,
         items_lg = $(slider).data("items_lg"),
         items_md = $(slider).data("items_md"),
         items_sm = $(slider).data("items_sm"),
         items_xs = $(slider).data("items_xs") ? $(slider).data("items_xs") : 1,
         unslick_xs = $(slider).data("unslick"),
         custnav = $(slider).data("custnav"),
         navfor = $(slider).data("navfor"),
         oneslider = $(slider).data("oneslider"),
         vertical = $(slider).data("vertical"),
         speed = $(slider).data("speed"),
         focus = $(slider).data("focus"),
         hover = $(slider).data("hover"),
         center = $(slider).data("center"),
         cssease = $(slider).data("cssease");
      var autoplay2 = $(slider2).data("autoplay"),
         autoplaytimeout2 = $(slider2).data("autoplaytimeout"),
         infinite2 = $(slider2).data("loop"),
         dots2 = $(slider2).data("dots"),
         nav2 = $(slider2).data("nav"),
         rows2 = $(slider2).data("row"),
         row_mobile2 = $(slider2).data("row_mobile")
            ? $(slider2).data("row_mobile")
            : 1,
         fade2 = $(slider2).data("fade"),
         items2 = $(slider2).data("items"),
         items_xxl2 = $(slider2).data("items_xxl")
            ? $(slider2).data("items_xxl")
            : items,
         items_lg2 = $(slider2).data("items_lg"),
         items_md2 = $(slider2).data("items_md"),
         items_sm2 = $(slider2).data("items_sm"),
         items_xs2 = $(slider2).data("items_xs")
            ? $(slider2).data("items_xs")
            : 1,
         unslick_xs2 = $(slider2).data("unslick"),
         custnav2 = $(slider2).data("custnav"),
         navfor2 = $(slider2).data("navfor"),
         oneslider2 = $(slider2).data("oneslider"),
         speed2 = $(slider2).data("speed"),
         focus2 = $(slider2).data("focus"),
         hover2 = $(slider2).data("hover"),
         center2 = $(slider2).data("center"),
         cssease2 = $(slider2).data("cssease");

      if (typeof navfor != "undefined" && navfor == true) {
         syncing = sliderNavfor;
      } else {
         syncing = null;
      }
      if (typeof custnav != "undefined") {
         nav = false;
      }
      if (vertical == true) {
         rtl = false;
      }
      $(slider).on("init", function (slick) {
         if ($(slider).hasClass("video-play")) {
            $(slider).find(".slick-current video").trigger("play");
         }
         var classPattern = /col-[a-z]{2,}-\d+|col-\d+|col-[a-z]+-cus-\d+/g;
         $(slider)
            .find(".slick-slide")
            .each(function () {
               var currentClasses = $(this).attr("class");
               var newClasses = currentClasses.replace(classPattern, "");
               $(this).attr("class", newClasses);
               if ($(this).find(".sp-item").length) {
                  var currentClasses2 = $(this).find(".sp-item").attr("class");
                  var newClasses2 = currentClasses2.replace(classPattern, "");
                  $(this).find(".sp-item").attr("class", newClasses2);
               }
            });
      });
      $(slider).on(
         "init reInit afterChange",
         function (event, slick, currentSlide) {
            const length = $(slider).find(".slick-active").length,
               page = Math.ceil(((currentSlide || 0) + 1) / length),
               numPages = Math.ceil(slick.slideCount / length);
            $(".current_nav", "#shopify-section-" + sectionId).text(`${page}`);
            $(".total_nav", "#shopify-section-" + sectionId).text(
               `${numPages}`
            );
            $(".num_nav", "#shopify-section-" + sectionId).css("opacity", "1");
         }
      );

      $(slider).slick({
         nextArrow:
            '<div class="arrow-next"><i class="zmdi zmdi-chevron-right"></i></div>',
         prevArrow:
            '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left"></i></div>',
         rtl: rtl,
         slidesToShow: items_xxl,
         slidesToScroll: $(slider).data("oneslider")
            ? $(slider).data("oneslider")
            : items_xxl,
         rows: rows,
         arrows: nav,
         dots: dots,
         infinite: infinite,
         fade: fade,
         speed: speed,
         autoplay: autoplay,
         autoplaySpeed: autoplaytimeout,
         vertical: vertical,
         verticalSwiping: vertical,
         asNavFor: syncing,
         pauseOnFocus: focus,
         pauseOnHover: hover,
         centerMode: center,
         cssEase: cssease,
         responsive: [
            {
               breakpoint: 1440,
               settings: {
                  slidesToShow: items,
                  slidesToScroll: $(slider).data("oneslider") ? 1 : items,
               },
            },
            {
               breakpoint: 1200,
               settings: {
                  slidesToShow: items_lg,
                  slidesToScroll: $(slider).data("oneslider") ? 1 : items_lg,
               },
            },
            {
               breakpoint: 992,
               settings: {
                  slidesToShow: items_md,
                  slidesToScroll: $(slider).data("oneslider") ? 1 : items_md,
               },
            },
            {
               breakpoint: 768,
               settings: {
                  slidesToShow: items_sm,
                  slidesToScroll: $(slider).data("oneslider") ? 1 : items_sm,
                  rows: row_mobile,
               },
            },
            {
               breakpoint: 576,
               settings: {
                  slidesToShow: items_xs,
                  slidesToScroll: $(slider).data("oneslider") ? 1 : items_xs,
                  rows: row_mobile,
               },
            },
         ],
      });
      $(slider2).slick({
         nextArrow:
            '<div class="arrow-next"><i class="zmdi zmdi-chevron-right"></i></div>',
         prevArrow:
            '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left"></i></div>',
         rtl: rtl,
         slidesToShow: items_xxl2,
         slidesToScroll: $(slider2).data("oneslider")
            ? $(slider2).data("oneslider")
            : items_xxl2,
         rows: rows2,
         arrows: nav2,
         dots: dots,
         infinite: infinite2,
         fade: fade2,
         speed: speed2,
         autoplay: autoplay2,
         cssEase: cssease2,
         responsive: [
            {
               breakpoint: 1440,
               settings: {
                  slidesToShow: items2,
                  slidesToScroll: $(slider2).data("oneslider") ? 1 : items2,
               },
            },
            {
               breakpoint: 1200,
               settings: {
                  slidesToShow: items_lg2,
                  slidesToScroll: $(slider2).data("oneslider") ? 1 : items_lg2,
               },
            },
            {
               breakpoint: 992,
               settings: {
                  slidesToShow: items_md2,
                  slidesToScroll: $(slider2).data("oneslider") ? 1 : items_md2,
               },
            },
            {
               breakpoint: 768,
               settings: {
                  slidesToShow: items_sm2,
                  slidesToScroll: $(slider2).data("oneslider") ? 1 : items_sm2,
                  rows: row_mobile2,
               },
            },
            {
               breakpoint: 576,
               settings: {
                  slidesToShow: items_xs2,
                  slidesToScroll: $(slider2).data("oneslider") ? 1 : items_xs2,
                  rows: row_mobile2,
               },
            },
         ],
      });

      var navautoplay = $(sliderNavfor).data("autoplay"),
         navautoplaytimeout = $(sliderNavfor).data("autoplaytimeout"),
         navinfinite = $(sliderNavfor).data("loop"),
         navdots = $(sliderNavfor).data("dots"),
         navnav = $(sliderNavfor).data("nav"),
         navfade = $(sliderNavfor).data("fade"),
         center = $(sliderNavfor).data("center"),
         variablewidth = $(sliderNavfor).data("variablewidth"),
         navitems_xl = $(sliderNavfor).data("items_xl"),
         navitems_lg = $(sliderNavfor).data("items_lg"),
         navitems_md = $(sliderNavfor).data("items_md"),
         navitems_sm = $(sliderNavfor).data("items_sm"),
         navitems_xs = $(sliderNavfor).data("items_xs")
            ? $(sliderNavfor).data("items_xs")
            : 1,
         navfor = $(sliderNavfor).data("navfor"),
         navspeed = $(sliderNavfor).data("speed"),
         navfocus = $(sliderNavfor).data("focus"),
         navhover = $(sliderNavfor).data("hover");
      if (typeof navfor != "undefined" && navfor == true) {
         syncing = slider;
      } else {
         syncing = null;
      }

      $(sliderNavfor).on("init", function (slick) {
         var classPattern = /col-[a-z]{2,}-\d+|col-\d+/g;
         $(sliderNavfor)
            .find(".slick-slide")
            .each(function () {
               var currentClasses = $(this).attr("class");
               var newClasses = currentClasses.replace(classPattern, "");
               $(this).attr("class", newClasses);
            });
      });

      $(sliderNavfor).slick({
         nextArrow:
            '<div class="arrow-next"><i class="zmdi zmdi-chevron-right"></i></div>',
         prevArrow:
            '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left"></i></div>',
         rtl: rtl,
         slidesToShow: navitems_xl,
         slidesToScroll: navitems_xl,
         dots: navdots,
         arrows: navnav,
         infinite: navinfinite,
         fade: navfade,
         autoplay: navautoplay,
         autoplaySpeed: navautoplaytimeout,
         asNavFor: syncing,
         centerMode: center,
         variableWidth: variablewidth,
         speed: navspeed,
         pauseOnFocus: navfocus,
         pauseOnHover: navhover,
         responsive: [
            {
               breakpoint: 1440,
               settings: {
                  slidesToShow: navitems_xl,
                  slidesToScroll: navitems_xl,
               },
            },
            {
               breakpoint: 1200,
               settings: {
                  slidesToShow: navitems_lg,
                  slidesToScroll: navitems_lg,
               },
            },
            {
               breakpoint: 992,
               settings: {
                  slidesToShow: navitems_md,
                  slidesToScroll: navitems_md,
               },
            },
            {
               breakpoint: 768,
               settings: {
                  slidesToShow: navitems_sm,
                  slidesToScroll: navitems_sm,
               },
            },
            {
               breakpoint: 576,
               settings: {
                  slidesToShow: navitems_xs,
                  slidesToScroll: navitems_xs,
               },
            },
         ],
      });

      checkClasses(slider);
      var currentSlide = $(slider).slick("slickCurrentSlide");
      if ($(slider).find(".slick-cloned").length == 0) {
         checkArrow(slider, currentSlide);
      }
      $(slider).on(
         "afterChange",
         function (event, slick, currentSlide, nextSlide) {
            checkClasses(slider);
            if (infinite == false) {
               checkArrow(slider, currentSlide);
            }
            if (
               $("#shopify-section-" + sectionId).find("[data-slick-to]")
                  .length > 0
            ) {
               var index = $(slider).slick("slickCurrentSlide");
               $("[data-slick-to]").removeAttr("current");
               $("[data-slick-to][data-index=" + index + "]").attr(
                  "current",
                  ""
               );
            }
            if ($(slider).hasClass("video-current-play")) {
               $(slider).find("video").trigger("pause");
               $(slider).find(".slick-current video").trigger("play");
            }
         }
      );
      function checkClasses(class_parent) {
         var total = $(".slick-list .slick-active", class_parent).length;
         $(".slick-list .slick-slide", class_parent).removeClass(
            "firstActiveItem lastActiveItem"
         );

         $(".slick-list .slick-active", class_parent).each(function (index) {
            if (index === 0 && rtl === false) {
               // this is the first one
               $(this).addClass("firstActiveItem");
            } else if (index === 0 && rtl === true) {
               $(this).addClass("lastActiveItem");
            }
            if (index === total - 1 && total > 1 && rtl === false) {
               // this is the last one
               $(this).addClass("lastActiveItem");
            } else if (index === total - 1 && total > 1 && rtl === true) {
               $(this).addClass("firstActiveItem");
            }
         });
      }
      function checkArrow(el, current) {
         var num = $(el).find(".slick-slide").length,
            num_act = $(el).find(".slick-slide.slick-active").length,
            prev = $(el)
               .parents('[data-section-type="nov-slick"]')
               .find(".nav-prev"),
            next = $(el)
               .parents('[data-section-type="nov-slick"]')
               .find(".nav-next");
         if (num - num_act == 0) {
            prev.css("visibility", "hidden");
            next.css("visibility", "hidden");
         } else {
            prev.css("visibility", "visible");
            next.css("visibility", "visible");
         }
         if (current == 0) {
            prev.addClass("disabled");
         } else {
            prev.removeClass("disabled");
         }
         if (num - num_act <= current) {
            next.addClass("disabled");
         } else {
            next.removeClass("disabled");
         }
      }
      if (typeof custnav != "undefined") {
         $(".nav-prev", "#shopify-section-" + sectionId).click(function () {
            $(slider).slick("slickPrev");
         });
         $(".nav-next", "#shopify-section-" + sectionId).click(function () {
            $(slider).slick("slickNext");
         });
      }
      $("[data-slick-to]", "#shopify-section-" + sectionId).on(
         "click",
         function (event) {
            event.preventDefault();
            $("[data-slick-to]", "#shopify-section-" + sectionId).removeAttr(
               "current"
            );
            $(this).attr("current", "");
            var goToSingleSlide = $(this).data("index");
            $(slider).slick("slickGoTo", goToSingleSlide);
         }
      );
      if ($(window).width() < 576 && unslick_xs == true) {
         $(slider).slick("unslick");
      }
      $(slidercenter).slick({
         nextArrow:
            '<div class="arrow-center-next"><i class="zmdi zmdi-chevron-right"></i></div>',
         prevArrow:
            '<div class="arrow-center-prev"><i class="zmdi zmdi-chevron-left"></i></div>',
         centerMode: true,
         centerPadding: "0px",
         slidesToShow: 3,
         focusOnSelect: true,
         asNavFor: slidercenternf,
         dots: false,
         nav: true,
         infinite: true,
      });
      $(slidercenternf).slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         fade: true,
         nav: true,
         asNavFor: slidercenter,
      });
   }
   return Nov_Slickcarousel;
})();
theme.Nov_SliderShow = (function () {
   function Nov_SliderShow(container) {
      var $container = (this.$container = $(container));
      var sectionId = $container.attr("data-section-id");
      var slideWrapper = (this.slideWrapper =
         "#shopify-section-" + sectionId + " .main-slider");
      var slideWrappernav = (this.slider =
         "#shopify-section-" + sectionId + " .main-slider-navfor");

      if ($("html").hasClass("lang-rtl")) var rtl = true;
      else var rtl = false;

      var autoplay = $(slideWrapper).data("autoplay"),
         speed = $(slideWrapper).data("speed"),
         arrows = $(slideWrapper).data("arrows"),
         dots = $(slideWrapper).data("dots"),
         iframes = $(slideWrapper).find(".embed-player"),
         lazyImages = $(slideWrapper).find(".slide-image"),
         loadingBar = $(slideWrapper).data("loading-bar");
      var zoom = $(slideWrapper).data("zoom");
      $(".slick-current .caption-animate", slideWrapper).each(function () {
         var caption = $(this).data("animate");
         $(this).removeClass(caption);
      });
      $(slideWrapper).on("init", function (slick) {
         slick = $(slick.currentTarget);
         if (autoplay == true && typeof loadingBar != "undefined") {
            $(slideWrapper).find(".slick-current").addClass("timer");
         }
         $(
            '[data-slick-to][data-index="0"]',
            "#shopify-section-" + sectionId
         ).attr("current", "");
         $(slideWrapper).find(".slick-current video").trigger("play");
         setTimeout(function () {
            $(slideWrapper)
               .find(".slick-current .slide-image")
               .addClass("first-zoomin");
            $(".slick-current .caption-animate", slideWrapper).each(
               function () {
                  var caption = $(this).data("animate");
                  $(this).addClass(caption);
               }
            );
         }, 500);
      });
      $(slideWrapper).on("beforeChange", function (event, slick) {
         slick = $(slick.$slider);
         $(".slick-current .caption-animate", slideWrapper).each(function () {
            var caption = $(this).data("animate");
            $(this).removeClass(caption);
         });
         if (zoom == true) {
            $(slideWrapper)
               .find(".slick-current .slide-image")
               .removeClass("zoom_img");
         }
         if (autoplay == true && typeof loadingBar != "undefined") {
            $(slideWrapper).find(".slick-current").removeClass("timer");
         }
         $(slideWrapper).find(".slide-image").removeClass("first-zoomin");
         $(slideWrapper).find(".slide-image").removeClass("first-scale");
      });
      $(slideWrapper).on("afterChange", function (event, slick, currentSlide) {
         $(".caption-animate", ".slick-current").each(function () {
            var caption = $(this).data("animate");
            $(this).addClass(caption);
         });
         if (zoom == true) {
            $(slideWrapper)
               .find(".slick-current .slide-image")
               .addClass("zoom_img");
         }
         if (autoplay == true && typeof loadingBar != "undefined") {
            $(slideWrapper).find(".slick-current").addClass("timer");
         }
         $(slideWrapper).find("video").trigger("pause");
         $(slideWrapper).find(".slick-current video").trigger("play");
         $("[data-slick-to]", "#shopify-section-" + sectionId).removeAttr(
            "current"
         );
         $(
            '[data-slick-to][data-index="' + currentSlide + '"]',
            "#shopify-section-" + sectionId
         ).attr("current", "");
         slick = $(slick.$slider);
      });
      $(slideWrapper).on(
         "init reInit afterChange",
         function (event, slick, currentSlide) {
            const length = $(slideWrapper).find(".slick-active").length,
               page = Math.ceil(((currentSlide || 0) + 1) / length),
               nextPages = page + 1,
               numPages = Math.ceil(slick.slideCount / length);
            const $blockProgress = $(
               ".block_progress",
               "#shopify-section-" + sectionId
            );
            const slideCount = slick.slideCount;
            $(".current_nav", "#shopify-section-" + sectionId).text("0" + page);
            if (nextPages <= numPages) {
               $(".total_nav", "#shopify-section-" + sectionId).text(
                  "0" + nextPages
               );
            } else {
               $(".total_nav", "#shopify-section-" + sectionId).text(`01`);
            }
            $blockProgress.empty();
            for (let i = 0; i < slideCount; i++) {
               const progressDiv = $("<div class='progress-slide'></div>");
               $blockProgress.append(progressDiv);
               $blockProgress
                  .find(".progress-slide:first-child")
                  .addClass("active");
            }
         }
      );
      $(slideWrapper).slick({
         fade: true,
         nextArrow:
            '<div class="arrow-next"><i class="rbb-icon-direction-39"></i></div>',
         prevArrow:
            '<div class="arrow-prev"><i class="rbb-icon-direction-36"></i></div>',
         autoplay: autoplay,
         autoplaySpeed: speed,
         lazyLoad: "progressive",
         pauseOnHover: false,
         pauseOnFocus: false,
         speed: 600,
         arrows: arrows,
         dots: dots,
         cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
         rtl: rtl,
         adaptiveHeight: true,
         asNavFor: slideWrappernav,

         init: function (slick) {
            slick.slickGoTo(0);
         },
      });
      $(slideWrappernav).slick({
         slidesToShow: 3,
         slidesToScroll: 1,
         dots: false,
         arrows: false,
         focusOnSelect: true,
         infinite: true,
         centerPadding: "20px",
         asNavFor: slideWrapper,
      });
      $(slideWrapper).on("afterChange", function (event, slick, currentSlide) {
         const $blockProgress = $(
            ".block_progress",
            "#shopify-section-" + sectionId
         );
         $blockProgress.find(".progress-slide").removeClass("active");
         $blockProgress
            .find(".progress-slide")
            .eq(currentSlide)
            .addClass("active");
      });
      $("[data-slick-to]", "#shopify-section-" + sectionId).on(
         "click",
         function (event) {
            event.preventDefault();
            $("[data-slick-to]", "#shopify-section-" + sectionId).removeAttr(
               "current"
            );
            $(this).attr("current", "");
            var goToSingleSlide = $(this).data("index");
            $(slideWrapper).slick("slickGoTo", goToSingleSlide);
         }
      );
      $(".nav-prev", "#shopify-section-" + sectionId).click(function () {
         $(slideWrapper).slick("slickPrev");
      });
      $(".nav-next", "#shopify-section-" + sectionId).click(function () {
         $(slideWrapper).slick("slickNext");
      });
   }
   return Nov_SliderShow;
})();
$(document).ready(function () {
   var sections = new theme.Sections();
   sections.register("slideshow-section", theme.Nov_SliderShow);
   sections.register("nov-slick", theme.Nov_Slickcarousel);
});
theme.init = function () {
   theme.customerTemplates.init();
   theme.customerloginTemplates.init();
   $('a[href="#"]').on("click", function (evt) {
      evt.preventDefault();
   });
};
$(theme.init);
