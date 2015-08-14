import "app/dom";
import "app/util";
import "app/config";


var $_jsViews = null,


    Hammered = require( "Hammered" ),


/**
 *
 * @public
 * @namespace app..views
 * @memberof app.
 * @description A nice description of what this module does...
 *
 */
views = {
    /**
     *
     * @public
     * @method init
     * @memberof app..views
     * @description Method runs once when window loads.
     *
     */
    init: function () {
        console.log( "views initialized" );
    },


    /**
     *
     * @public
     * @method isActive
     * @memberof app..views
     * @description Method informs PageController of active status.
     * @returns {boolean}
     *
     */
    isActive: function () {
        return (this.getElements() > 0);
    },


    /**
     *
     * @public
     * @method onload
     * @memberof app..views
     * @description Method performs onloading actions for this module.
     *
     */
    onload: function () {
        loadViews();
    },


    /**
     *
     * @public
     * @method unload
     * @memberof app..views
     * @description Method performs unloading actions for this module.
     *
     */
    unload: function () {
        this.teardown();
    },


    /**
     *
     * @public
     * @method teardown
     * @memberof app..views
     * @description Method performs cleanup after this module. Remmoves events, null vars etc...
     *
     */
    teardown: function () {
        stopViews();

        $_jsViews = null;
    },


    getElements: function () {
        $_jsViews = dom.page.find( ".js-views" );

        return ($_jsViews.length);
    }
},


onTapView = function () {
    var $nav = $( this ),
        $view = $nav.closest( ".js-views" ),
        $next = null,
        $curr = null,
        data = $view.data();

    try {
        clearTimeout( data.timeout );

        data.$boxes.removeClass( "is-entering is-exiting is-active" );

    } catch ( error ) {}

    // Get the curr box
    $curr = data.$boxes.eq( data.index );

    // Set the index
    data.index = $nav.index();

    // Set the next box
    $next = data.$boxes.eq( data.index );

    // Toggle nav states
    data.$navs.removeClass( "is-active" );
    data.$navs.eq( data.index ).addClass( "is-active" );

    // Toggle the boxes
    $curr.removeClass( "is-active" ).addClass( "is-exiting" );
    $next.addClass( "is-entering" );

    $view.data({
        index: data.index,
        timeout: setTimeout(function () {
            $curr.removeClass( "is-exiting" );
            $next.removeClass( "is-entering" ).addClass( "is-active" );

        }, data.duration )
    });
},


stopView = function ( $view ) {
    var data = $view.data();

    data.hammered.off( "tap", onTapView );

    $view.removeData();
},


stopViews = function () {
    var i;

    for ( i = $_jsViews.length; i--; ) {
        stopView( $_jsViews.eq( i ) );
    }
},


loadView = function ( $view ) {
    var $navs = $view.find( ".js-views-nav" ),
        $boxes = $view.find( ".js-views-box" ),
        hammered = new Hammered( $view[ 0 ], config.hammerDefaults );

    $navs.first().addClass( "is-active" );
    $boxes.first().addClass( "is-active" );

    $view.data({
        index: 0,
        timeout: null,
        duration: util.getTransitionDuration( $boxes[ 0 ] ),
        hammered: hammered,
        $navs: $navs,
        $boxes: $boxes
    });

/* Note: Not sure what to do yet :-/
    setTimeout(function () {
        var minHeight = $boxes.toArray().map(function ( el ) {
            return el.clientHeight;

        });

        console.log( minHeight );

    }, 0 );
*/

    hammered.on( "tap", ".js-views-nav", onTapView );
},


loadViews = function () {
    var i;

    for ( i = $_jsViews.length; i--; ) {
        loadView( $_jsViews.eq( i ) );
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default views;