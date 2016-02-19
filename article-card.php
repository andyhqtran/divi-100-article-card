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

		$this->init();
	}

	/**
	 * Hooking methods into WordPress actions and filters
	 *
	 * @return void
	 */
	private function init(){
		add_action( 'admin_menu',            array( $this, 'add_submenu' ), 30 ); // Make sure the priority is higher than Divi 100's add_menu()
		add_action( 'wp_enqueue_scripts',    array( $this, 'enqueue_frontend_scripts' ) );
	}

	/**
	 * Add submenu
	 * @return void
	 */
	function add_submenu() {
		add_submenu_page(
			$this->main_prefix . 'options',
			__( 'Article Card' ),
			__( 'Article Card' ),
			'switch_themes',
			$this->plugin_prefix . 'options',
			array( $this, 'render_options_page' )
		);
	}

	/**
	 * Render options page
	 * @return void
	 */
	function render_options_page() {
		?>
		<div class="wrap">
			<h1><?php _e( 'Article Card' ); ?></h1>
			<p><?php _e( 'Hello, it is me.' ); ?></p>
		</div>
		<!-- /.wrap -->
		<?php
	}

	/**
	 * Load front end scripts
	 * @return void
	 */
	function enqueue_frontend_scripts() {
		wp_enqueue_style( 'custom-article-cards', plugin_dir_url( __FILE__ ) . 'css/style.css' );
		wp_enqueue_script( 'custom-article-cards', plugin_dir_url( __FILE__ ) . 'js/scripts.js', array( 'jquery', 'divi-custom-script' ), '0.0.1', true );
	}
}
ET_Divi_100_Article_Card::instance();