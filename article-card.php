<?php
/**
* @package Custom_Article_Cards
* @version 0.0.1
*/
/*
* Plugin Name: Article Cards
* Plugin URI: https://elegantthemes.com/
* Description: This plugin adds in <a href="http://codepen.io/andytran/pen/BNjymy">Article News Card</a> styles support for Divi Blog Post modules.
* Author: Elegant Themes
* Version: 0.0.1
* Author URI: http://elegantthemes.com/
* License: GPL3
*/

/**
 * Load Divi 100 Setup
 */
require_once( plugin_dir_path( __FILE__ ) . 'divi-100-setup/divi-100-setup.php' );

/**
 * TEMP
 */

function enqueue_frontend_scripts() {
  wp_enqueue_style( 'custom-article-cards', plugin_dir_url( __FILE__ ) . 'css/style.css' );
  wp_enqueue_script( 'custom-article-cards', plugin_dir_url( __FILE__ ) . 'js/scripts.js', array( 'jquery' ), '0.0.1', true );
}

add_action( 'wp_enqueue_scripts', 'enqueue_frontend_scripts' );
?>