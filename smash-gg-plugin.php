<?php
/**
 * @package SmashGGPlugin
 */
/**
Plugin Name: smash.gg Plugin
Plugin URI: http://ggtylerr.digital/smash-gg-plugin
Description: Plugin for smash.gg integration.
Version: 0.1.0
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

// Register settings page
function smashgg_add_settings_page() {
	add_options_page('smash.gg plugin','smash.gg plugin','manage_options','smash-gg-plugin','smashgg_render_settings');
}
add_action('admin_menu','smashgg_add_settings_page');

// Render settings page
function smashgg_render_settings() {
	?>
	<h2>smash.gg plugin settings</h2>
	<form>
		<?php
		settings_fields('smashgg_settings');
		do_settings_sections('smash-gg-plugin'); ?>
		<input name="submit" class="button button-primary" type="submit" value="<?php esc_attr_e('Save'); ?>">
	</form>
	<?php
}

// Register settings
function smashgg_settings() {
	register_setting('smashgg_settings', 'smashgg_settings');
	add_settings_section('api_settings', 'API Settings', 'smashgg_settings_section_text', 'smash-gg-plugin');
	
	add_settings_field('smashgg_api_key', 'API Key', 'smashgg_settings_api_key', 'smash-gg-plugin', 'api_settings');
}
add_action('admin_init','smashgg_settings');

// Functions for rendering shit
function smashgg_settings_section_text() {
	echo '<p>Various settings for using the API</p>';
}

function smashgg_settings_api_key() {
	echo "<input id='smashgg_api_key' name='smashgg_settings[api_key]' type='text'/>";
}

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