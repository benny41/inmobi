jQuery(document).ready(function($) {

    "use strict";

    if ( typeof propertySubmit !== "undefined" ) {

        var removeQueryStringParameters = function ( url ) {
            if ( url.indexOf ('?') >= 0 ) {
                var urlParts = url.split('?');
                return urlParts[0];
            }
            return url;
        };

        var ajaxURL = removeQueryStringParameters( propertySubmit.ajaxURL );
        var uploadNonce = propertySubmit.uploadNonce;
        var fileTypeTitle = propertySubmit.fileTypeTitle;

        /* Apply jquery ui sortable on gallery items */
        $( "#gallery-thumbs-container" ).sortable({
            revert: 100,
            placeholder: "sortable-placeholder",
            cursor: "move"
        });

        /* initialize uploader */
        var uploaderArguments = {
            browse_button: 'select-images',          // this can be an id of a DOM element or the DOM element itself
            file_data_name: 'inspiry_upload_file',
            drop_element: 'drag-and-drop',
            url: ajaxURL + "?action=ajax_img_upload&nonce=" + uploadNonce,
            filters: {
                mime_types : [
                    { title : fileTypeTitle, extensions : "jpg,jpeg,gif,png" }
                ],
                max_file_size: '10000kb',
                prevent_duplicates: true
            }
        };

        // require gallery images field to upload at least one image
        $( '.submit-field-wrapper input[type=submit]' ).on( 'click', function(){
            if ( ! $( '#gallery-thumbs-container' ).has( "div" ).length ) {
                $( '#drag-and-drop' ).css( 'border-color', 'red' );
            }
        });

        var uploader = new plupload.Uploader( uploaderArguments );
        uploader.init();

        $('#select-images').click(function(event){
            event.preventDefault();
            event.stopPropagation();
            uploader.start();

            $( '#drag-and-drop' ).css( 'border-color', '#dfdfdf' );
        });

        /* Run after adding file */
        uploader.bind('FilesAdded', function(up, files) {
            var html = '';
            var galleryThumb = "";
            plupload.each(files, function(file) {
                galleryThumb += '<div id="holder-' + file.id + '" class="gallery-thumb">' + '' + '</div>';
            });
            document.getElementById('gallery-thumbs-container').innerHTML += galleryThumb;
            up.refresh();
            uploader.start();
        });


        /* Run during upload */
        uploader.bind('UploadProgress', function(up, file) {
            document.getElementById( "holder-" + file.id ).innerHTML = '<span>' + file.percent + "%</span>";
        });


        /* In case of error */
        uploader.bind('Error', function( up, err ) {
            document.getElementById('errors-log').innerHTML += "<br/>" + "Error #" + err.code + ": " + err.message;
        });


        /* If files are uploaded successfully */
        uploader.bind('FileUploaded', function ( up, file, ajax_response ) {
            var response = $.parseJSON( ajax_response.response );

            if ( response.success ) {

                document.getElementById('errors-log').innerHTML = "";
                var galleryThumbHtml = '<img src="' + response.url + '" alt="" />' +
                '<a class="remove-image" data-property-id="' + 0 + '"  data-attachment-id="' + response.attachment_id + '" href="#remove-image" ><i class="fa fa-trash-o"></i></a>' +
                '<a class="mark-featured" data-property-id="' + 0 + '"  data-attachment-id="' + response.attachment_id + '" href="#mark-featured" ><i class="fa fa-star-o"></i></a>' +
                '<input type="hidden" class="gallery-image-id" name="gallery_image_ids[]" value="' + response.attachment_id + '"/>' +
                '<span class="loader"><i class="fa fa-spinner fa-spin"></i></span>';

                document.getElementById( "holder-" + file.id ).innerHTML = galleryThumbHtml;

                bindThumbnailEvents();  // bind click event with newly added gallery thumb
            } else {
                // log response object
                console.log ( response );
            }
        });

        /* Bind thumbnails events with newly added gallery thumbs */
        var bindThumbnailEvents = function () {

            // unbind previous events
            $('a.remove-image').unbind('click');
            $('a.mark-featured').unbind('click');

            // Mark as featured
            $('a.mark-featured').click(function(event){

                event.preventDefault();

                var $this = $( this );
                var starIcon = $this.find( 'i');

                if ( starIcon.hasClass( 'fa-star-o' ) ) {   // if not already featured

                    $('.gallery-thumb .featured-img-id').remove();      // remove featured image id field from all the gallery thumbs
                    $('.gallery-thumb .mark-featured i').removeClass( 'fa-star').addClass( 'fa-star-o' );   // replace any full star with empty star

                    var $this = $( this );
                    var input = $this.siblings( '.gallery-image-id' );      //  get the gallery image id field in current gallery thumb
                    var featured_input = input.clone().removeClass( 'gallery-image-id' ).addClass( 'featured-img-id' ).attr( 'name', 'featured_image_id' );     // duplicate, remove class, add class and rename to full fill featured image id needs

                    $this.closest( '.gallery-thumb' ).append( featured_input );     // append the cloned ( featured image id ) input to current gallery thumb
                    starIcon.removeClass( 'fa-star-o' ).addClass( 'fa-star' );      // replace empty star with full star

                }

            }); // end of mark as featured click event


            // Remove gallery images
            $('a.remove-image').click(function(event){

                event.preventDefault();
                var $this = $(this);
                var gallery_thumb = $this.closest('.gallery-thumb');
                var loader = $this.siblings('.loader');

                loader.show();

                var removal_request = $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    data: {
                        property_id : $this.data('property-id'),
                        attachment_id : $this.data('attachment-id'),
                        action : "remove_gallery_image",
                        nonce : uploadNonce
                    },
                    dataType: "html"
                });

				removal_request.done( function( response ) {
					var result = $.parseJSON( response );
					if( result.attachment_removed ) {
						uploader.removeFile( gallery_thumb );
						gallery_thumb.remove();
					} else {
						document.getElementById( 'errors-log' ).innerHTML += "<br/>" + "Error : Failed to remove attachment";
					}
				} );

                removal_request.fail(function( jqXHR, textStatus ) {
                    alert( "Request failed: " + textStatus );
                });

            });  // end of remove gallery thumb click event

        };  // end of bind thumbnail events

        bindThumbnailEvents(); // run it first time - required for property edit page

    }   // validate localized data


    /* Validate Submit Property Form */
    if( jQuery().validate ){
        $('#submit-property-form').validate({
            rules: {
                bedrooms: {
                    number: true
                },
                bathrooms: {
                    number: true
                },
                garages: {
                    number: true
                },
                price: {
                    number: true
                },
                size: {
                    number: true
                }
            }
        });
    }

    /* Apply jquery ui sortable on additional details */
    $( "#inspiry-additional-details-container" ).sortable({
        revert: 100,
        placeholder: "detail-placeholder",
        handle: ".sort-detail",
        cursor: "move"
    });

    $( '.add-detail' ).click(function( event ){
        event.preventDefault();
        var newInspiryDetail = '<div class="inspiry-detail inputs clearfix">' +
            '<div class="inspiry-detail-control rh_form--align_start"><i class="sort-detail fa fa-bars"></i></div>' +
            '<div class="inspiry-detail-title"><input type="text" name="detail-titles[]" /></div>' +
            '<div class="inspiry-detail-value"><input type="text" name="detail-values[]" /></div>' +
            '<div class="inspiry-detail-control rh_form--align_end"><a class="remove-detail" href="#"><i class="fa fa-trash"></i></a></div>' +
            '</div>';

        $( '#inspiry-additional-details-container').append( newInspiryDetail );
        bindAdditionalDetailsEvents();
    });

    function bindAdditionalDetailsEvents(){

        /* Bind click event to remove detail icon button */
        $( '.remove-detail').click(function( event ){
            event.preventDefault();
            var $this = $( this );
            $this.closest( '.inspiry-detail' ).remove();
        });

    }
    bindAdditionalDetailsEvents();

    /* Check if IE9 - As image upload not works in ie9 */
    var ie = (function(){

        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );

        return v > 4 ? v : undef;

    }());

    if ( ie <= 9 ) {
        $('#submit-property-form').before( '<div class="ie9-message"><i class="fa fa-info-circle"></i>&nbsp; <strong>Current browser is not fully supported:</strong> Please update your browser or use a different one to enjoy all features on this page. </div>' );
    }

    var terms_input = $( '#terms' );
    var terms_label = terms_input.parent();
    var terms_error = $( '#terms-error' );
    var form_submit = jQuery( 'input.rh_btn[type="submit"]' );

    if ( terms_input.hasClass( 'required' ) ) {
        form_submit.click( function( e ) {
            if ( ! terms_input.is(':checked') && terms_input.hasClass( 'required' ) ) {
                e.preventDefault();
                terms_error.removeClass( 'hide' );
            }
        } );

        terms_label.click( function () {
            if ( terms_input.is(':checked') && terms_input.hasClass( 'required' ) ) {
                terms_error.addClass( 'hide' );
            } else {
                terms_error.removeClass( 'hide' );
            }
        } );
    }

});