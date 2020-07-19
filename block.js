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
				{style: {border: "1px solid black", backgroundColor:"rgb(37,46,55)",backgroundImage: "url(https://images.smash.gg/home-page/background.svg)"}},
				el (
					"h4",
					{style: {textAlign: "center", margin: "2rem auto 0.5rem",fontFamily:"\"Roboto\",sans-serif",color:"white"}},
					d.data.event.tournament.name
				),
				el (
					"h6",
					{style: {textAlign: "center", margin: "0.5rem auto 2rem", textTransform: "none",fontFamily:"\"Roboto\",sans-serif",color:"white"}},
					d.data.event.name
				),
				el(
					"table",
					{style: {width: "100%",backgroundColor:"white",backgroundImage:"none",borderCollapse:"collapse",margin:"0rem",fontFamily:"\"Roboto\",sans-serif",border:"none"}},
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center",backgroundColor:"rgb(29,75,160)",color:"white",border:"none"}},
							standings[0].placement
						),
						el(
							"th",
							{style:{border:"none"}},
							standings[0].entrant.name
						)
					),
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center",backgroundColor:"rgb(35,46,102)",color:"white",border:"none"}},
							standings[1].placement
						),
						el(
							"th",
							{style: {backgroundColor:"rgba(38,46,55,0.05)",border:"none"}},
							standings[1].entrant.name
						)
					),
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center",backgroundColor:"rgb(29,75,160)",color:"white",border:"none"}},
							standings[2].placement
						),
						el(
							"th",
							{style:{border:"none"}},
							standings[2].entrant.name
						)
					),
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center",backgroundColor:"rgb(35,46,102)",color:"white",border:"none"}},
							standings[3].placement
						),
						el(
							"th",
							{style: {backgroundColor:"rgba(38,46,55,0.05)",border:"none"}},
							standings[3].entrant.name
						)
					),
					el(
						"tr",
						"",
						el(
							"th",
							{style: {textAlign: "center",backgroundColor:"rgb(29,75,160)",color:"white",border:"none"}},
							standings[4].placement
						),
						el(
							"th",
							{style:{border:"none"}},
							standings[4].entrant.name
						)
					)
				),
				el(
					"a",
					{href: "https://smash.gg/" + d.data.event.slug, style:{display:"block",backgroundColor:"white",backgroundImage:"none",whiteSpace: "normal",color:"red",fontFamily:"\"Roboto\",sans-serif"}},
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