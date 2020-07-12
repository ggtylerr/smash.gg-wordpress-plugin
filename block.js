// Register block type (title, icon, category, etc)

var el = wp.element.createElement;
var InspectorControls = wp.blockEditor.InspectorControls;

wp.blocks.registerBlockType('smash-gg-plugin/smash-block', {
	title: 'smash.gg',
	icon: 'admin-site-alt3',
	category: 'embed',
  
	attributes: {
		match: {type: 'string'},
	},
// Register edit and save functions
  
	edit: function( props ) {
		var match = props.attributes.match;

		function onChangeMatch(event) {
			props.setAttributes({match: event.target.value});
		}

		return [
			el(
				InspectorControls,
				{ key: 'controls' },
				el(
					"input",
					{
						type: "text",
						value: props.attributes.match,
						onChange: onChangeMatch
					}
				)
			),
		];
	},
	save: function( props ) {
		return el(
			"h3",
			{style: {border: "3px solid red"}},
			SmashGG_RequestMatch(props.attributes.match)
		);
	},
})