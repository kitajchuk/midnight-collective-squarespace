/*!
 *
 * App Controller: product
 *
 * A nice description of what this controller does...
 *
 *
 */
import "app/dom";


var $_jsProduct = null,
    $_jsInputWrap = null,
    $_jsInput = null,
    $_jsDec = $( '<div class="product__dec"><span class="icon icon--minus icon--void"></span></div>' ),
    $_jsInc = $( '<div class="product__inc"><span class="icon icon--plus"></span></div>' ),

    _isActive = false,
    _isCommerce = false,


/**
 *
 * @public
 *
 */
product = {
    name: "product",


    init: function () {
        console.log( "product initialized" );
    },


    isActive: function () {
        return (_isActive = this.getElements() > 0);
    },


    onload: function () {
        this.tryInitCommerce();

        $_jsDec.on( "click", onDecClick );
        $_jsInc.on( "click", onIncClick );

        $_jsInputWrap.append( $_jsDec, $_jsInc );
    },


    unload: function () {
        this.teardown();
    },


    getElements: function () {
        $_jsProduct = dom.body.find( ".js-product" );
        $_jsInputWrap = dom.body.find( ".product-quantity-input" );
        $_jsInput = $_jsInputWrap.find( "input" );

        return ( $_jsProduct.length );
    },


    teardown: function () {
        $_jsProduct = null;
        $_jsInputWrap = null;
        $_jsInput = null;

        $_jsDec.off( "click", onDecClick );
        $_jsInc.off( "click", onIncClick );

        _isActive = false;
        _isCommerce = false;
    },


    tryInitCommerce: function () {
        if ( this.isActive() && !_isCommerce ) {
            _isCommerce = true;

            Y.Squarespace.Commerce.initializeCommerce( Y );
        }
    }
},


voidDecIcon = function ( val ) {
    var $ic = $_jsDec.find( ".icon" );

    if ( val > 1 ) {
        $ic.removeClass( "icon--void" );

    } else {
        $ic.addClass( "icon--void" );
    }
},


onIncClick = function () {
    var val = $_jsInput.val();

    val++;

    voidDecIcon( val );

    $_jsInput.val( Math.max( 1, val ) );
},


onDecClick = function () {
    var val = $_jsInput.val();

    val--;

    voidDecIcon( val );

    $_jsInput.val( Math.max( 1, val ) );
};


/******************************************************************************
 * Export
*******************************************************************************/
export default product;