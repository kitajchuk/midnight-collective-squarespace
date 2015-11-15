import $ from "js_libs/jquery/dist/jquery";
import resizes from "./resizes";
import router from "./router";
import detect from "./detect";
import navmenu from "./navmenu";
import footerbar from "./footerbar";
import dom from "./dom";
import scrolls from "./scrolls";
import * as util from "./util";


window.onload = function () {
    window.Squarespace.onInitialize( Y, function () {
        const $cart = $( ".absolute-cart-box" );

        dom.navbar.append( $cart );

        $cart.addClass( "is-active" );
    });


    util.emitter.on( "app--preload-done", function appInit () {
        util.emitter.off( "app--preload-done", appInit );

        util.resizeElems();

        dom.body.addClass( "is-active" );
    });


    // Global router initializer
    router.init();

    // Global detection initializer
    detect.init();


    // Global scrolls element initializer
    scrolls.init();


    // Global resize element initializer
    resizes.init();


    // Primary navmenu initializer
    navmenu.init();


    // Primary footerbar initializer
    footerbar.init();
};