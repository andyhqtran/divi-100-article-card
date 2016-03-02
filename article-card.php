<?php
/**
* @package Custom_Article_Cards
* @version 0.0.1
*/
/*
* Plugin Name: Divi 100 Article Cards
* Plugin URI: https://elegantthemes.com/
* Description: This plugin adds in <a href="http://codepen.io/andytran/pen/BNjymy">Article News Card</a> styles support for Divi Blog Post modules.
* Author: Elegant Themes
* Version: 0.0.1
* Author URI: http://elegantthemes.com/
* License: GPL3
*/


/**
 * Register plugin to Divi 100 list
 */
class ET_Divi_100_Article_Card_Config {
	public static $instance;

	/**
	 * Hook the plugin info into Divi 100 list
	 */
	function __construct() {
		add_filter( 'et_divi_100_settings', array( $this, 'register' ) );
		add_action( 'plugins_loaded',       array( $this, 'init' ) );
	}

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
	 * Define plugin info
	 *
	 * @return array plugin info
	 */
	public static function info() {
		$main_prefix = 'et_divi_100_';
		$plugin_slug = 'article_cards';

		return array(
			'main_prefix'        => $main_prefix,
			'plugin_name'        => __( 'Article Card' ),
			'plugin_description' => __( 'Nullam quis risus eget urna mollis ornare vel eu leo.' ),
			'plugin_slug'        => $plugin_slug,
			'plugin_id'          => "{$main_prefix}{$plugin_slug}",
			'plugin_prefix'      => "{$main_prefix}{$plugin_slug}-",
			'plugin_version'     => 20160301,
			'plugin_dir_path'    => plugin_dir_path( __FILE__ ),
		);
	}

	/**
	 * et_divi_100_settings callback
	 *
	 * @param array  settings
	 * @return array settings
	 */
	function register( $settings ) {
		$info = self::info();

		$settings[ $info['plugin_slug'] ] = $info;

		return $settings;
	}

	/**
	 * Init plugin after all plugins has been loaded
	 */
	function init() {
		// Load Divi 100 Setup
		require_once( plugin_dir_path( __FILE__ ) . 'divi-100-setup/divi-100-setup.php' );

		// Load Article Card
		ET_Divi_100_Article_Card::instance();
	}
}
ET_Divi_100_Article_Card_Config::instance();


/**
 * Load Article Cards
 */
class ET_Divi_100_Article_Card {
	/**
	 * Unique instance of plugin
	 */
	public static $instance;
	public $config;

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
		$this->config = ET_Divi_100_Article_Card_Config::info();

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
				'plugin_id'   => $this->config['plugin_id'],
				'title'       => $this->config['plugin_name'],
				'description' => $this->config['plugin_description'],
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
		wp_enqueue_style( 'custom-article-cards', plugin_dir_url( __FILE__ ) . 'assets/css/style.css', array(), $this->config['plugin_version'] );
		wp_enqueue_script( 'custom-article-cards', plugin_dir_url( __FILE__ ) . 'assets/js/scripts.js', array( 'jquery', 'divi-custom-script' ), $this->config['plugin_version'], true );
	}
}