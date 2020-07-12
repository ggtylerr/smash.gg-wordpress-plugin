<?php
/**
 * @package SmashGGPlugin
 */
/**
Plugin Name: smash.gg Plugin
Plugin URI: http://ggtylerr.digital/smash-gg-plugin
Description: Plugin for smash.gg integration.
Version: 0.2.0
Author: ggtylerr
Author URI: http://ggtylerr.digital/
License: GPL v2 or Later
Text Domain: smash-gg-plugin
 */

/*
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/

defined('ABSPATH') or die('Nice try.'); // Dab on the script kiddies

if (!function_exists('add_action')) die('Nice try.'); // Just in case they get around ABSPATH

// Settings
// (Auto generated using Jeremy Hixon's Option Page generator)
class APISettings {
	private $api_settings_options;

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'api_settings_add_plugin_page' ) );
		add_action( 'admin_init', array( $this, 'api_settings_page_init' ) );
	}

	public function api_settings_add_plugin_page() {
		add_menu_page(
			'smash.gg API Settings', // page_title
			'smash.gg API Settings', // menu_title
			'manage_options', // capability
			'api-settings', // menu_slug
			array( $this, 'api_settings_create_admin_page' ), // function
			'dashicons-admin-generic', // icon_url
			3 // position
		);
	}

	public function api_settings_create_admin_page() {
		$this->api_settings_options = get_option( 'api_settings_option_name' ); ?>

		<div class="wrap">
			<h2>API Settings</h2>
			<p>Various settings for using the smash.gg API</p>
			<?php settings_errors(); ?>

			<form method="post" action="options.php">
				<?php
					settings_fields( 'api_settings_option_group' );
					do_settings_sections( 'api-settings-admin' );
					submit_button();
				?>
			</form>
		</div>
	<?php }

	public function api_settings_page_init() {
		register_setting(
			'api_settings_option_group', // option_group
			'api_settings_option_name', // option_name
			array( $this, 'api_settings_sanitize' ) // sanitize_callback
		);

		add_settings_section(
			'api_settings_setting_section', // id
			'Settings', // title
			array( $this, 'api_settings_section_info' ), // callback
			'api-settings-admin' // page
		);

		add_settings_field(
			'api_key_0', // id
			'API Key', // title
			array( $this, 'api_key_0_callback' ), // callback
			'api-settings-admin', // page
			'api_settings_setting_section' // section
		);
	}

	public function api_settings_sanitize($input) {
		$sanitary_values = array();
		if ( isset( $input['api_key_0'] ) ) {
			$sanitary_values['api_key_0'] = sanitize_text_field( $input['api_key_0'] );
		}

		return $sanitary_values;
	}

	public function api_settings_section_info() {
		
	}

	public function api_key_0_callback() {
		printf(
			'<input class="regular-text" type="text" name="api_settings_option_name[api_key_0]" id="api_key_0" value="%s">',
			isset( $this->api_settings_options['api_key_0'] ) ? esc_attr( $this->api_settings_options['api_key_0']) : ''
		);
	}

}
if ( is_admin() )
	$api_settings = new APISettings();

// Add Access-Control-Allow-Origin header (to allow POST requests)
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');

// Enqueue + Localize POST request functions
wp_enqueue_script('smash-gg-requests', plugin_dir_url(__FILE__) . 'requests.js', "1.0", false);
$options = get_option('api_settings_option_name');
$request_params = array('apiKey' => $options['api_key_0']);
wp_localize_script('smash-gg-requests', 'options', $request_params);

// Register block
function smashgg_loadBlock() {
	wp_enqueue_script(
		'smash-gg-block',
		plugin_dir_url(__FILE__) . 'block.js',
		array('wp-blocks','wp-editor'),
		true
	);
}
add_action('enqueue_block_editor_assets', 'smashgg_loadBlock');