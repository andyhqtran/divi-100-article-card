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
 * Load Article Cards
 */
class ET_Divi_100_Article_Card {
	/**
	 * Unique instance of plugin
	 */
	public static $instance;
	public $main_prefix;
	public $plugin_slug;
	public $plugin_id;
	public $plugin_prefix;

	/**
	 * Gets the instance of the plugin
	 */
	public static function instance(){
		if ( null === self::$instance ){
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor
	 */
	private function __construct(){
		$this->main_prefix   = 'et_divi_100_';
		$this->plugin_slug   = 'article_card';
		$this->plugin_prefix = "{$this->main_prefix}{$this->plugin_slug}-";
		$this->plugin_id     = "{$this->main_prefix}{$this->plugin_slug}";

		// Initialize if Divi is active
		if ( et_divi_100_is_active() ) {
			$this->init();
		}
	}

	/**
	 * Hooking methods into WordPress actions and filters
	 *
	 * @return void
	 */
	private function init(){
		add_action( 'wp_enqueue_scripts',    array( $this, 'enqueue_frontend_scripts' ) );

		if ( is_admin() ) {
			$settings_args = array(
				'plugin_id'   => $this->plugin_id,
				'title'       => __( 'Article Cards' ),
				'description' => __( 'Nullam quis risus eget urna mollis ornare vel eu leo.' ),
				'fields'      => array(),
			);

			new Divi_100_Settings( $settings_args );
		}
	}

	/**
	 * Load front end scripts
	 * @return void
	 */
	function enqueue_frontend_scripts() {
		wp_enqueue_style( 'custom-article-cards', plugin_dir_url( __FILE__ ) . 'assets/css/style.css' );
		wp_enqueue_script( 'custom-article-cards', plugin_dir_url( __FILE__ ) . 'assets/js/scripts.js', array( 'jquery', 'divi-custom-script' ), '0.0.1', true );
	}
}
ET_Divi_100_Article_Card::instance();