// Register block type (title, icon, category, etc)

var el = wp.element.createElement;

wp.blocks.registerBlockType('smash-gg-plugin/smash-block', {
	title: 'smash.gg',
	icon: 'admin-site-alt3',
	category: 'embed',
  
	attributes: {
		match: {type: 'string'},
	},
// Register edit and save functions
  
	edit: function( props ) {
		var updateVal = function(val) {
			props.setAttributes({match:val});
		}
		return el(
			wp.components.TextControl,
			{
					label: 'Event URL like so: tournament/silver-state-smash-2-5/event/ultimate-singles',
					value: props.attributes.match,
					onChange: updateVal
			}
		);
	},
	save: function( props ) {
		SmashGG_RequestMatch(props.attributes.match);
		var id = props.attributes.match;
		id = id.replace(/[^-_a-zA-Z]/g, '');
		return el(
			"h3",
			{style: {border: "3px solid red"}},
			jQuery('#SmashGG' + id).val()
		);
	},
})