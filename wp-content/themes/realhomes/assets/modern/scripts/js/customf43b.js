(function ($) {

    "use strict";

    $(document).ready(function () {

        /*-----------------------------------------------------------------------------------*/
        /*  Navigation menu.
         /*-----------------------------------------------------------------------------------*/
        $('.rh_menu ul.rh_menu__main > li').hover(function () {
            var menu_link = $(this).children('a');
            $(menu_link).toggleClass('rh_menu--hover');
        });

        // Responsive Menu.

        // First level
        $('.rh_menu__hamburger').click(function () {
            $('ul.rh_menu__responsive').toggleClass('rh_menu__responsive_show');
        });

        var sub_menu_parent = $('.rh_menu__responsive ul.sub-menu').parent();
        sub_menu_parent.prepend('<i class="fa fa-caret-down rh_menu__indicator"></i>');

        // Second Level
        $('ul.rh_menu__responsive > li .rh_menu__indicator').click(function (e) {
            e.preventDefault();
            $(this).parent().children('ul.sub-menu').slideToggle();
            $(this).toggleClass('rh_menu__indicator_up');
        });

        /*-----------------------------------------------------------------------------------*/
        /*	Login Menu Open/Close
         /*-----------------------------------------------------------------------------------*/
        function logInMenu() {
            if ($(window).width() > 1023) {
                $(".rh_menu__user_profile").on(' mouseover', function () {
                    if (!$(this).hasClass('open-login')) {
                        $(this).addClass('open-login');
                    }
                });
                $(".rh_menu__user_profile").on('mouseout', function () {
                    if ($(this).hasClass('open-login')) {
                        $(this).removeClass('open-login');
                    }
                });
            } else if($(window).width() < 1024){
                $(".rh_menu__user_profile").on('click', function () {
                    $(this).toggleClass('open-login');

                    $('.rh_modal').on('click',function (e) {
                        e.stopPropagation();
                    });
                });
            }
        }

        logInMenu();

        $(window).on('resize', function () {
            logInMenu();
        });


        /*-----------------------------------------------------------------------------------*/
        /*	Auto Focus on login
         /*-----------------------------------------------------------------------------------*/
        $(function () {
            $('.rh_menu__user_profile').on('mouseover', function () {
                if ($(this).find('#username').hasClass('focus-class')) {
                    var userFocus = $('.focus-class');
                    var fieldVal = userFocus.val();
                    var fieldLength = fieldVal.length;
                    if (fieldLength === 0) {
                        $(userFocus).focus();
                    }
                }
            });
        });

        /*-----------------------------------------------------------------------------------*/
        /*  Flex Slider
        /*-----------------------------------------------------------------------------------*/
        if (jQuery().flexslider) {

            // Flex Slider for Homepage.
            $('#rh_slider__home .flexslider').flexslider({
                animation: "fade",
                slideshowSpeed: 7000,
                animationSpeed: 1500,
                slideshow: true,
                directionNav: true,
                controlNav: false,
                keyboardNav: true,
                customDirectionNav: $(".rh_flexslider__nav_main a"),
                start: function (slider) {
                    slider.removeClass('loading');
                }
            });

            // Featured Properties slider for Homepage.
            $('#rh_section__featured_slider .flexslider').flexslider({
                animation: "fade",
                slideshowSpeed: 7000,
                animationSpeed: 1500,
                slideshow: false,
                directionNav: true,
                controlNav: false,
                keyboardNav: true,
                customDirectionNav: $(".rh_flexslider__nav a"),
                start: function (slider) {
                    slider.removeClass('loading');
                }
            });

            // Flex Slider for Detail Page
            $('#property-detail-flexslider .flexslider').flexslider({
                animation: "slide",
                slideshow: false,
                directionNav: true,
                controlNav: false,
                start: function (slider) {
                    slider.resize();
                }
            });

            /* Property detail page slider variation two */
            $('#property-detail-slider-carousel-nav').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                directionNav: true,
                prevText: "",
                nextText: "",
                slideshow: false,
                itemWidth: 130,
                itemMargin: 5,
                minItems: 8,
                maxItems: 8,
                asNavFor: '#property-detail-slider-two'
            });
            $('#property-detail-slider-two').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                directionNav: true,
                prevText: "",
                nextText: "",
                sync: "#property-detail-slider-carousel-nav",
            });

            // Flex Slider for Child Properties on property detail page.
            $('#rh_property__child_slider .flexslider').flexslider({
                animation: "slide",
                slideshow: false,
                directionNav: true,
                controlNav: false,
                start: function (slider) {
                    slider.resize();
                }
            });

            // Remove Flex Slider Navigation for Smaller Screens Like IPhone Portrait
            $('.slider-wrapper , .listing-slider').hover(function () {
                var mobile = $('body').hasClass('probably-mobile');
                if (!mobile) {
                    $('.flex-direction-nav').stop(true, true).fadeIn('slow');
                }
            }, function () {
                $('.flex-direction-nav').stop(true, true).fadeOut('slow');
            });
            // Flex Slider Gallery Post
            $('.listing-slider').flexslider({
                animation: "slide",
                slideshow: false,
                controlNav: false,
                //directionNav: true,
                customDirectionNav: $(".rh_flexslider__nav_main_gallery .nav-mod"),
            });
        }

        /*-----------------------------------------------------------------------------------*/
        /* Select2
         /* URL: http://select2.github.io/select2/
         /*-----------------------------------------------------------------------------------*/
        if (jQuery().select2) {
            var selectOptions = {
                width: 'off',
            };

            $('.rh_select2, .option-bar select').select2(selectOptions)
                .on("select2:open", function (e) {
                $(this).parents('.rh_prop_search__select').addClass('rh_prop_search__active');
                    $('.select2-dropdown').hide();
                    setTimeout(function(){ $('.select2-dropdown').slideDown(200); }, 10);
            })
                .on("select2:closing", function (e) {
                    $(this).parents('.rh_prop_search__select').removeClass('rh_prop_search__active');
                });


            if ($('.dsidx-resp-search-form')) {
                $('.dsidx-resp-search-form select').select2(selectOptions);

                if ($('.dsidx-sorting-control')) {
                    $('.dsidx-sorting-control select').select2(selectOptions);
                }

                if ($('#dsidx-search-form-main')) {
                    $('#dsidx-search-form-main select').select2(selectOptions);
                }

                if ($('#dsidx.dsidx-details')) {
                    $('.dsidx-contact-form-schedule-date-row select').select2(selectOptions);
                }
            }


        }


        function slideElementDisplay(){
            var getDataTopBar = $('#rh_fields_search__wrapper').data('top-bar');
            var slideElementsDisplay = $('.rh_prop_search__form .rh_prop_search__fields .rh_prop_search__option');

            var setDataTopBar = 0;
            if (window.matchMedia('(max-width: 767px)').matches) {
                if(getDataTopBar == 3){
                    setDataTopBar = 4;
                }else{
                    setDataTopBar = getDataTopBar;
                }
            }else if (window.matchMedia('(min-width: 768px)').matches) {
                setDataTopBar = getDataTopBar;

            }


            var slideElements = $('.rh_prop_search__form .rh_prop_search__fields .rh_prop_search__option:not(.hide-fields):nth-of-type(n+'+(setDataTopBar+1)+')');

            if(!slideElements.hasClass('show') ){
                // slideElements.css('max-width','25%');
                slideElements.addClass('show').slideDown(100).animate(
                    { opacity: 1 },
                    { queue: false, duration: 300 }
                );

            }else{
                slideElements.removeClass('show').slideUp(100).animate(
                    { opacity: 0 },
                    { queue: false, duration: 100 }
                );
            }
        }



        $('#rh_prop_search__advance').click(function (e) {

            e.preventDefault();



            // Toggle search icon.
            $(this).find('#rh_icon__search').toggle('400');

            // Open advance search fields.
            $('#rh_prop_search__dropdown').toggleClass('rh_prop_search__ddActive');


            var thisParent = $(this).parents('.rh_prop_search');

            if(! (thisParent).hasClass('rh_open_form')){
                thisParent.addClass('rh_open_form');
            }else{
                thisParent.removeClass('rh_open_form');
                thisParent.find('.more-options-wrapper-mode').slideUp(200);
                thisParent.find('.open_more_features').removeClass('featured-open');
            }


            slideElementDisplay();


        });

        function topBarFieldsHeight() {
            if($('.advance-search-form').hasClass('rh_prop_search__form')){
            var getDataTopBar = $('#rh_fields_search__wrapper').data('top-bar');
            var topElementsReset = $('.rh_prop_search__form .rh_prop_search__fields .rh_prop_search__option');

            var showDataTopBar = 0;
            if (window.matchMedia('(max-width: 767px)').matches) {
                if(getDataTopBar == '3'){
                    showDataTopBar = 4;
                    topElementsReset.removeClass('default-show');
                }else{
                    showDataTopBar = getDataTopBar;
                }
            } else if (window.matchMedia('(min-width: 768px)').matches) {
                showDataTopBar = getDataTopBar ;
                topElementsReset.removeClass('default-show');
            }
            var topElements = $('.rh_prop_search__form .rh_prop_search__fields .rh_prop_search__option:not(.hide-fields):nth-of-type(-n+'+showDataTopBar+')');
            topElements.addClass('default-show');
            if (window.matchMedia('(min-width: 768px)').matches) {
                topElements.css({'max-width': (100 / showDataTopBar) + '%','width': 100+'%'});
            }
            if (window.matchMedia('(max-width: 767px)').matches) {
                if(getDataTopBar == 1){
                    topElements.css({'max-width': 'none', 'width': '100%'});
                }else{
                    topElements.css({'max-width': 'none', 'width': (100/2 ) + '%'});
                }
            }
            }
        }

        topBarFieldsHeight();

        $(window).on('resize',function(){
            topBarFieldsHeight();
        });



        $('.rh_prop_search__selectwrap').click(function (e) {
            e.preventDefault();
            var search_select = $(this).find('.rh_select2');

            if (e.target.classList[0] === 'select2-selection' || e.target.classList[0] === 'select2-selection__rendered') return;

            search_select.select2("open");
        });


        $('.select2').click(function (e) {
        });

        //Open Search Form More Features fields
        $('.open_more_features').on('click',function (e) {
            e.preventDefault();
            $(this).toggleClass('featured-open');
            // $(this).parents('.more-options-wrapper-mode').addClass('test')
            // $('.more-options-wrapper-mode').toggleClass('rh_open_feature');
            $('.more-options-wrapper-mode').slideToggle(200);

        });

        // if($('.rh_prop_search').hasClass('rh_open_form')){
        //     $('.more-options-wrapper-mode').hide();
        // }


        /*-----------------------------------------------------------------------------------*/
        /* Properties Sorting
         /*-----------------------------------------------------------------------------------*/
        function insertParam(key, value) {
            key = encodeURI(key);
            value = encodeURI(value);

            var kvp = document.location.search.substr(1).split('&');

            var i = kvp.length;
            var x;
            while (i--) {
                x = kvp[i].split('=');

                if (x[0] == key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }

            if (i < 0) {
                kvp[kvp.length] = [key, value].join('=');
            }

            //this will reload the page, it's likely better to store this until finished
            document.location.search = kvp.join('&');
        }

        $('#sort-properties').on('change', function () {
            var key = 'sortby';
            var value = $(this).val();
            insertParam(key, value);
        });

        /*-----------------------------------------------------------------------------------*/
        /* Properties Listing Map Height Fix
         /*-----------------------------------------------------------------------------------*/
        var fixMapHeight = function () {
            var height = ( $('.rh_page__map_properties') ) ? $('.rh_page__map_properties').outerHeight() : false;
            var screenWidth = $(document).width();
            if (height && ( 1024 < screenWidth )) {
                $('.rh_page__listing_map').css({'height': height});
            }
        }
        // Execute again when browser resizes.
        // $( document ).resize( function() {
        //     fixMapHeight();
        //     console.log(window.height());
        // } );

        /*----------------------------------------------------------------------------------*/
        /* Contact Form AJAX validation and submission
         /* Validation Plugin : http://bassistance.de/jquery-plugins/jquery-plugin-validation/
         /* Form Ajax Plugin : http://www.malsup.com/jquery/form/
         /*---------------------------------------------------------------------------------- */
        if (jQuery().validate && jQuery().ajaxSubmit) {

            var submitButton = $('#submit-button'),
                ajaxLoader = $('#ajax-loader'),
                messageContainer = $('#message-container'),
                errorContainer = $("#error-container");

            var formOptions = {
                beforeSubmit: function () {
                    submitButton.attr('disabled', 'disabled');
                    ajaxLoader.fadeIn('fast');
                    messageContainer.fadeOut('fast');
                    errorContainer.fadeOut('fast');
                },
                success: function (ajax_response, statusText, xhr, $form) {
                    var response = $.parseJSON(ajax_response);
                    ajaxLoader.fadeOut('fast');
                    submitButton.removeAttr('disabled');
                    if (response.success) {
                        $form.resetForm();
                        messageContainer.html(response.message).fadeIn('fast');

                        // call reset function if it exists
                        if (typeof inspiryResetReCAPTCHA == 'function') {
                            inspiryResetReCAPTCHA();
                        }

                    } else {
                        errorContainer.html(response.message).fadeIn('fast');
                    }
                }
            };

            // Contact page form
            $('#contact-form .contact-form').validate({
                errorLabelContainer: errorContainer,
                submitHandler: function (form) {
                    $(form).ajaxSubmit(formOptions);
                }
            });

            // Agent single page form
            $('#agent-single-form').validate({
                errorLabelContainer: errorContainer,
                submitHandler: function (form) {
                    $(form).ajaxSubmit(formOptions);
                }
            });

        }


        /*-----------------------------------------------------------------------------------*/
        /* Swipe Box Lightbox
         /*-----------------------------------------------------------------------------------*/
        if (jQuery().swipebox) {
            $('.clone .swipebox').removeClass('swipebox');
            $(".swipebox").swipebox();
        }

        /*-----------------------------------------------------------------*/
        /* Property Floor Plans
         /*-----------------------------------------------------------------*/
        $('.floor-plans-accordions .floor-plan:first-child').addClass('current')
            .children('.floor-plan-content').css('display', 'block').end()
            .find('i.fa').removeClass('fa-plus').addClass('fa-minus');

        $('.floor-plan-title').on('click', function () {
            var parent_accordion = $(this).closest('.floor-plan');
            if (parent_accordion.hasClass('current')) {
                $(this).find('i.fa').removeClass('fa-minus').addClass('fa-plus');
                parent_accordion.removeClass('current').children('.floor-plan-content').slideUp(300);
            } else {
                $(this).find('i.fa').removeClass('fa-plus').addClass('fa-minus');
                parent_accordion.addClass('current').children('.floor-plan-content').slideDown(300);
            }
            var siblings = parent_accordion.siblings('.floor-plan');
            siblings.find('i.fa').removeClass('fa-minus').addClass('fa-plus');
            siblings.removeClass('current').children('.floor-plan-content').slideUp(300);
        });

        /*-----------------------------------------------------------------------------------*/
        /* Pretty Photo Lightbox
         /*-----------------------------------------------------------------------------------*/
        if (typeof customData !== "undefined" && jQuery().prettyPhoto) {
            $(".pretty-photo").prettyPhoto({
                allow_resize: true,
                default_width: customData.video_width,
                default_height: customData.video_height,
                animation_speed: 'normal',
                deeplinking: false,
                social_tools: false,
                theme: 'default',
                show_title: false,
                iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no" allowfullscreen="true"></iframe>'
            });

            $('a[data-rel]').each(function () {
                $(this).attr('rel', $(this).data('rel'));
            });

            $("a[rel^='prettyPhoto']").prettyPhoto({
                overlay_gallery: false,
                social_tools: false,
                theme: 'dark_square',
                show_title: false
            });
        }

        /**
         * forEach implementation for Objects/NodeLists/Arrays, automatic type loops and context options
         *
         * @private
         * @author Todd Motto
         * @link https://github.com/toddmotto/foreach
         * @param {Array|Object|NodeList} collection - Collection of items to iterate, could be an Array, Object or NodeList
         * @callback requestCallback      callback   - Callback function for each iteration.
         * @param {Array|Object|NodeList} scope=null - Object/NodeList/Array that forEach is iterating over, to use as the this value when executing callback.
         * @returns {}
         */
        var forEach = function (t, o, r) {
            if ("[object Object]" === Object.prototype.toString.call(t))for (var c in t)Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t); else for (var e = 0, l = t.length; l > e; e++)o.call(r, t[e], e, t)
        };

        var hamburgers = document.querySelectorAll(".hamburger");
        if (hamburgers.length > 0) {
            forEach(hamburgers, function (hamburger) {
                hamburger.addEventListener("click", function () {
                    this.classList.toggle("is-active");
                }, false);
            });
        }

        /* ---------------------------------------------------- */
        /*  Gallery Hover Effect
         /* ---------------------------------------------------- */
        $(function () {
            $('.rh_gallery__item figure').hover(function () {
                    var $currentFigure = $(this);
                    var $mediaContainer = $currentFigure.find('.media_container');
                    var $media = $mediaContainer.find('a');
                    var $margin = -( $media.first().height() / 2 );
                    $media.css('margin-top', $margin);
                    var linkWidth = $media.first().width();
                    var targetPosition = ( $mediaContainer.width() / 2 ) - ( linkWidth + 2 );
                    $mediaContainer.stop().fadeIn(300);
                    $mediaContainer.find('a.link').stop().animate({'right': targetPosition}, 300);
                    $mediaContainer.find('a.zoom').stop().animate({'left': targetPosition}, 300);
                },
                function () {
                    var $currentFigure = $(this);
                    var $mediaContainer = $currentFigure.find('.media_container');
                    $mediaContainer.stop().fadeOut(300);
                    $mediaContainer.find('a.link').stop().animate({'right': '0'}, 300);
                    $mediaContainer.find('a.zoom').stop().animate({'left': '0'}, 300);
                }
            );
        });

        /*-------------------------------------------------------*/
        /*  Isotope
         /*------------------------------------------------------*/
        $(window).load(function () {
            if (jQuery().isotope) {
                $(function () {

                    var container = $('.isotope'),
                        filterLinks = $('#filter-by a');

                    /* to fix floating bugs due to variation in height */
                    setTimeout(function () {
                        container.isotope({
                            filter: "*",
                            layoutMode: 'fitRows',
                            itemSelector: '.isotope-item',
                            animationEngine: 'best-available'
                        });
                    }, 1000);

                    filterLinks.click(function (e) {
                        var selector = $(this).attr('data-filter');
                        container.isotope({filter: '.' + selector});
                        filterLinks.removeClass('active');
                        $('#filter-by li').removeClass('current-cat');
                        $(this).addClass('active');
                        e.preventDefault();
                    });

                });
            }
        });

        /*-----------------------------------------------------------------------------------*/
        /* Sticky-kit
         /* URL: https://github.com/leafo/sticky-kit
         /*-----------------------------------------------------------------------------------*/
        var makeSticky = function () {
            var screenWidth = $(window).width();
            if (1024 <= screenWidth) {
                $('.rh_prop_compare__column .property-thumbnail').stick_in_parent()
                    .on("sticky_kit:stick", function (e) {
                        $('.rh_prop_compare__column > p:nth-child(odd)').css({
                            'background': '#F7F7F7'
                        });
                        $('.rh_prop_compare__column > p:nth-child(even)').css({
                            'background': '#ffffff'
                        });
                        var heightThumbnail = $('.rh_prop_compare__column .property-thumbnail').height();
                        $('.rh_prop_compare__column > div:nth-child(2)').css({
                            'height': heightThumbnail
                        });
                    })
                    .on("sticky_kit:unstick", function (e) {
                        // console.log("has unstuck!", e.target);
                    });
            } else {
                $('.rh_prop_compare__column .property-thumbnail').trigger("sticky_kit:detach");
            }
        }
        makeSticky();
        // Execute again when browser resizes.
        $(window).resize(function () {
            makeSticky();
        });

        /*-----------------------------------------------------------------------------------*/
        /* Compare Properties
         /*-----------------------------------------------------------------------------------*/
        var compare_properties_number = $('.rh_compare .rh_compare__carousel > div').length;

        if (compare_properties_number != 0) {
            $('.rh_compare').slideDown(500);
        }



        /*-----------------------------------------------------------------------------------*/
        /* Add to compare
         /*-----------------------------------------------------------------------------------*/
        $(document).on('click', 'a.add-to-compare', function (e) {
            e.preventDefault();

            var slides_number = $('.rh_compare__carousel .rh_compare__slide').length;
            if (slides_number > 3) {
                var remove_last_check = 1;
                $('.rh_compare__carousel .rh_compare__slide:nth-child(1) a.rh_compare__remove').trigger("click", [$(this), remove_last_check]);
            } else {
                var compare_placeholder = $(this).parent().find('.compare-placeholder');
                var compare_link = $(this); // Add to compare link.

                var add_compare_request = $.ajax({
                    url: $(compare_link).attr('href'),
                    type: "POST",
                    data: {
                        property_id: $(compare_link).data('property-id'),
                        action: "inspiry_add_to_compare"
                    },
                    dataType: "json"
                });

                add_compare_request.done(function (response) {
                    if (response.success) {
                        $(compare_link).hide(0, function () {
                            $(compare_placeholder).removeClass('hide');
                        });
                        $('.rh_compare__carousel').append(
                            '<div class="rh_compare__slide"><div class="rh_compare__slide_img"><img src="' + response.img + '"></div><a class="rh_compare__remove" data-property-id="' + response.property_id + '" href="' + response.ajaxURL + '" width="' + response.img_width + '" height="' + response.img_height + '"><i class="fa fa-close"></i></a></div>'
                        );
                        var compare_properties_number = $('.rh_compare .rh_compare__carousel > div').length;
                        if (compare_properties_number == 1) {
                            $('.rh_compare').slideDown();
                        }
                    } else {
                        console.log(response.message);
                    }
                });

                add_compare_request.fail(function (jqXHR, textStatus) {
                    console.log("Request Failed: " + textStatus);
                });
            }
        });

        /*-----------------------------------------------------------------------------------*/
        /* Remove from compare
         /*-----------------------------------------------------------------------------------*/
        $(document).on('click', 'a.rh_compare__remove', function (event, add_compare_target, remove_last) {
            event.preventDefault();
            var current_link = $(this);
            var cross = $(this).find('i');
            var plus = $(add_compare_target).find('i');

            cross.addClass('fa-spin');
            plus.addClass('fa-spin');

            $.when(
                $.ajax({
                        url: current_link.attr('href'),
                        type: "POST",
                        data: {
                            property_id: current_link.data('property-id'),
                            action: "inspiry_remove_from_compare"
                        },
                        dataType: "json"
                    })

                    .done(function (response) {
                        cross.removeClass('fa-spin');
                        if (response.success) {
                            current_link.parents('div.rh_compare__slide').remove();
                            var property_item = $('span.add-to-compare-span *[data-property-id="' + response.property_id + '"]').parent();
                            property_item.find('span.compare-placeholder').addClass('hide');
                            $('span.add-to-compare-span *[data-property-id="' + response.property_id + '"]').removeClass('hide').delay(200).show();
                            var compare_properties_number = $('.rh_compare .rh_compare__carousel > div').length;
                            if (compare_properties_number == 0) {
                                $('.rh_compare').slideUp();
                            }
                        } else {
                            console.log(response.message);
                        }
                    })

                    .fail(function (jqXHR, textStatus) {
                        console.log("Request Failed: " + textStatus);
                    })
                )

                .then(function (response) {
                    if (remove_last) {
                        var compare_link = $(add_compare_target);
                        var compare_placeholder = $(add_compare_target).parent().find('.compare-placeholder');

                        var add_compare_request = $.ajax({
                            url: $(compare_link).attr('href'),
                            type: "POST",
                            data: {
                                property_id: $(compare_link).data('property-id'),
                                action: "inspiry_add_to_compare"
                            },
                            dataType: "json"
                        });

                        add_compare_request.done(function (response) {
                            plus.removeClass('fa-spin');
                            if (response.success) {
                                $(compare_link).hide(0, function () {
                                    $(compare_placeholder).removeClass('hide');
                                });
                                $('.rh_compare__carousel').append(
                                    '<div class="rh_compare__slide"><div class="rh_compare__slide_img"><img src="' + response.img + '"></div><a class="rh_compare__remove" data-property-id="' + response.property_id + '" href="' + response.ajaxURL + '" width="' + response.img_width + '" height="' + response.img_height + '"><i class="fa fa-close"></i></a></div>'
                                );
                            } else {
                                console.log(response.message);
                            }
                        });
                    }
                    ;
                });
        });

		/*-----------------------------------------------------------------------------------*/
		/* Add to favorites
		/*-----------------------------------------------------------------------------------*/
		var addToFavorites = function( e ) {
			e.preventDefault();
			var favorite_link = $( this );
			var span_favorite = $( this ).parent().find( 'span.favorite-placeholder' );
			var favorite_form = $( this ).parent().find( '.add-to-favorite-form' );

			var add_to_fav_opptions = {
				beforeSubmit : function() {
				},  // pre-submit callback
				success : function() {
					$( favorite_link ).addClass( 'hide' );
					$( span_favorite ).delay( 200 ).removeClass( 'hide' );
				}
			};

			favorite_form.ajaxSubmit( add_to_fav_opptions );
		};

		$(document).on( 'click', 'a.add-to-favorite', addToFavorites );

        /*-----------------------------------------------------------------------------------*/
        /* Remove from favorites
         /*-----------------------------------------------------------------------------------*/
        $('a.remove-from-favorite').click(function (event) {
            event.preventDefault();
            var $this = $(this);
            var property_item = $this.closest('.rh_prop_card');
            var close = $(this).find('i');

            close.addClass('fa-spin');

            var remove_favorite_request = $.ajax({
                url: $this.attr('href'),
                type: "POST",
                data: {
                    property_id: $this.data('property-id'),
                    action: "remove_from_favorites"
                },
                dataType: "json"
            });

            remove_favorite_request.done(function (response) {
                close.removeClass('fa-spin');
                if (response.success) {
                    property_item.delay(200).remove();
                } else {
                    console.log(response.message);
                }
            });

            remove_favorite_request.fail(function (jqXHR, textStatus) {
                console.log("Request failed: " + textStatus);
            });
        });

        /*-----------------------------------------------------------------------------------*/
        /* Hide the note
         /*-----------------------------------------------------------------------------------*/
        $('.icon-remove').click(function (e) {
            e.preventDefault();
            $(this).parent().fadeOut(200);
        });

        /*-----------------------------------------------------------------------------------*/
        /* Homepage - CTA Buttons Width
         /*-----------------------------------------------------------------------------------*/
        if ($('.rh_cta__btns .rh_btn--blackBG').length > 0 || $('.rh_cta__btns .rh_btn--whiteBG').length > 0) {
            var w1 = $('.rh_cta__btns .rh_btn--blackBG').outerWidth();
            var w2 = $('.rh_cta__btns .rh_btn--whiteBG').outerWidth();

            if (w1 > w2) {
                $('.rh_cta__btns .rh_btn--whiteBG').css('width', w1 + "px");
            } else {
                $('.rh_cta__btns .rh_btn--blackBG').css('width', w2 + "px");
            }
        }
        if ($('.rh_cta__btns .rh_btn--secondary').length > 0 || $('.rh_cta__btns .rh_btn--greyBG').length > 0) {
            var w1 = $('.rh_cta__btns .rh_btn--secondary').outerWidth();
            var w2 = $('.rh_cta__btns .rh_btn--greyBG').outerWidth();

            if (w1 > w2) {
                $('.rh_cta__btns .rh_btn--greyBG').css('width', w1 + "px");
            } else {
                $('.rh_cta__btns .rh_btn--secondary').css('width', w2 + "px");
            }
        }

        /*-----------------------------------------------------------------------------------*/
        /* Optima Express IDX Support
         /*-----------------------------------------------------------------------------------*/
        $('.ihf-grid-result-mlsnum-proptype').parent().parent().find('.col-xs-9').toggleClass('col-xs-12');
        $('#ihf-main-container .ihf-detail-back-to-results a').html('<span class="fa fa-angle-left"></span><span class="rh_back-link"> Back to Results</span>');

        /*-----------------------------------------------------------------------------------*/
        /*  Post Nav Support
         /*-----------------------------------------------------------------------------------*/
        $(function () {
            var post_nav = $('.inspiry-post-nav');
            $(window).scroll(function () {
                if ($(window).width() > 980) {
                    if ($(this).scrollTop() > 250) {
                        post_nav.fadeIn('fast');
                        return;
                    }
                }
                post_nav.fadeOut('fast');
            });
        });

        /*-----------------------------------------------------------------------------------*/
        /*  Property Ratings
         /*-----------------------------------------------------------------------------------*/
        if (jQuery().barrating) {
            $('#rate-it').barrating({
                theme: 'fontawesome-stars',
                initialRating: 5,
            });
        }

        /*-----------------------------------------------------------------------------------*/
        /* Home page properties pagination
         /*-----------------------------------------------------------------------------------*/
        var homePropertiesSection = $('#home-properties-section');

        // if homepage
        if (homePropertiesSection.length && homePropertiesSection.hasClass('ajax-pagination')) {


            $(document).on('click', '#home-properties-section .pagination > a', function (e) {
                e.preventDefault();
                var homePropertiesContainer = $('#home-properties-section-wrapper', homePropertiesSection);
                var paginationLinks = $('.pagination > a', homePropertiesSection);
                var svgLoader = $('.svg-loader', homePropertiesSection);
                var currentButton = $(this);
                svgLoader.slideDown('fast');
                homePropertiesContainer.fadeTo('slow', 0.5);
                paginationLinks.removeClass('current');
                  currentButton.addClass('current');
                homePropertiesContainer.load(
                    currentButton.attr('href') + ' ' + '#home-properties-section-inner',
                    function (response, status, xhr) {
                        if (status == 'success') {
                            homePropertiesContainer.fadeTo(100, 1,function(){
                            });
                            svgLoader.slideUp('fast');

                        } else {
                            homePropertiesContainer.fadeTo('slow', 1);
                            console.log(status + ' ' + xhr.statusText);
                        }
                    }
                );
            });
        }




    });

    $(window).load(function () {

        $('.rh_prop_compare__row').fadeTo(600, 1);

        // Add equal heights to all the rows of all the columns
        var screenWidth = $(window).width();
        var rowHeight = -1;

        $('.rh_prop_compare__details .rh_prop_compare__column p').each(function () {
            rowHeight = rowHeight > $(this).outerHeight() ? rowHeight : $(this).outerHeight();
        });

        $('.rh_prop_compare__details .rh_prop_compare__column > p').css({
            height: rowHeight
        });

        $('.rh_prop_compare__details .rh_prop_compare__column .property-thumbnail').each(function () {
            rowHeight = rowHeight > $(this).outerHeight() ? rowHeight : $(this).outerHeight();
        });

        $('.rh_prop_compare__details .rh_prop_compare__column > .property-thumbnail').css({
            height: rowHeight
        });

    });
    //$(window).scroll(function(e){
    //    parallax();
    //});
    //function parallax() {
    //    var docHeight = $(document).height();
    //    var scrolled = $(window).scrollTop();
    //
    //    var diff = scrolled - initY;
    //    var ratio = Math.round((diff / height) * 100);
    //    $('.rh_parallax_cta').css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px');
    //
    //    //$('.rh_parallax_cta').css('background-position', 'center ' + (100 - (500 * (scrolled / docHeight))) + '%');
    //
    //    $('.rh_parallax').css('background-position', 'center ' + (100 - (500 * (scrolled / docHeight))) + '%');
    //}
    //
    //$(window).scroll(function () {
    //    parallax();
    //});


    //Scoll effect
    function isInViewport(node) {
        var rect = node.getBoundingClientRect()
        return (
            (rect.height > 0 || rect.width > 0) &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    function scrollParallax(selector){
        var scrolled = $(window).scrollTop();
        $(selector).each(function(index, element) {
            var initY = $(this).offset().top;
            var height = $(this).height();
            var endY  = initY + $(this).height();

            // Check if the element is in the viewport.
            var visible = isInViewport(this);
            if(visible) {
                var diff = scrolled - initY;
                var ratio = Math.round((diff / height) * 100);
                $(this).css('background-position','center ' + parseInt(-(ratio * 1)) + 'px')
            }

        })
    }

    $(window).scroll(function() {
        scrollParallax('.rh_parallax_cta');
    });

    $(window).scroll(function() {
        scrollParallax('.rh_parallax');
    });


    //mobile dives user nav menu position

    function userNavPosition(selector){
        if (window.matchMedia('(max-width: 767px)').matches) {
            var getHeaderHeight = $('.rh_header__wrap').height();
            var getBarHeight = $('.rh_menu__user').height();
            var getTopHeight = getHeaderHeight - getBarHeight;
            $(selector).css('top', getTopHeight/2+'px');
        }else{
            $(selector).css('top', 'auto');
        }
    }
    $(document).ready(function () {
        userNavPosition('.rh_header_advance .user_menu_wrapper');
        userNavPosition('.rh_header_advance .rh_menu .main-menu');
    });

    $(window).on('resize',function(){
        userNavPosition('.rh_header_advance .user_menu_wrapper');
        userNavPosition('.rh_header_advance .rh_menu .main-menu');
    });




})(jQuery);
