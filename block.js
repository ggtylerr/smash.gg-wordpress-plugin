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
		var d = jQuery('#SmashGG' + id).val()
		if (d != undefined) {
			if (d.errors != undefined) {
				return el(
					"div",
					{style: {border: "3px solid red"}},
					el (
						"h3",
						{style: {color: "maroon"}},
						"smash.gg Error Occurred"
					),
					el(
						"p",
						"",
						d.errors[0].message
					)
				);
			}
		} else {
			return el(
				"div",
				{style: {border: "3px solid red"}},
				el (
					"h3",
					{style: {color: "maroon"}},
					"smash.gg Error Occurred"
				),
				el(
					"p",
					"",
					"Data was not recieved from server. (Try to resave to fix)"
				)
			);
		}
		try {
			console.log("smash.gg block saved for slug " + props.attributes.match);
			var standings = d.data.event.standings.nodes;
			return el(
				"div",
				{style: {border: "1px solid black", backgroundColor: "white"}},
				el (
					"h4",
					{style: {textAlign: "center", margin: "2rem auto 0.5rem",fontFamily:"\"Roboto\",sans-serif"}},
					d.data.event.tournament.name
				),
				el (
					"h6",
					{style: {textAlign: "center", margin: "0.5rem auto 2rem", textTransform: "none",fontFamily:"\"Roboto\",sans-serif"}},
					d.data.event.name
				),
				el(
					"hr",
					{style: {
						margin: "2rem auto 0rem", 
						background: "none", 
						border: "0px solid black",
						borderTopWidth: "1px",
						overflow: "hidden"
					}}
				),
				el(
					"table",
					{style: {width: "100%",borderColor:"grey",margin:"0rem",fontFamily:"\"Roboto\",sans-serif"}},
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center"}},
							"#"
						),
						el(
							"th",
							"",
							"Name"
						)
					),
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center"}},
							standings[0].placement
						),
						el(
							"th",
							"",
							standings[0].entrant.name
						)
					),
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center"}},
							standings[1].placement
						),
						el(
							"th",
							"",
							standings[1].entrant.name
						)
					),
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center"}},
							standings[2].placement
						),
						el(
							"th",
							"",
							standings[2].entrant.name
						)
					),
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center"}},
							standings[3].placement
						),
						el(
							"th",
							"",
							standings[3].entrant.name
						)
					),
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center"}},
							standings[4].placement
						),
						el(
							"th",
							"",
							standings[4].entrant.name
						)
					)
				),
				el(
					"a",
					{href: "https://smash.gg/" + d.data.event.slug, style:{whiteSpace: "normal",color:"red",fontFamily:"\"Roboto\",sans-serif"}},
					el(
						"img",
						{src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/SmashBall.svg/240px-SmashBall.svg.png", width: 30, style:{display:"inline"}}
					),
					"View at smash.gg"
				)
			);
		} catch (e) {
			return el(
				"div",
				{style: {border: "3px solid red"}},
				el (
					"h3",
					{style: {color: "maroon"}},
					"smash.gg Error Occurred"
				),
				el(
					"p",
					"",
					e.toString()
				)
			);
		}
	},
})