function SmashGG_RequestMatch(matchID) {
	// Make query
	const json = {
		// Why the hell did they make it like this?
		"query": `
		query EventStandings($event: String!, $page: Int!, $perPage: Int!) {
			event(slug: $event) {
				tournament {
					name
				}
				slug
				name
				standings(query: {
					perPage: $perPage,
					page: $page
				}){
					nodes {
						placement
						entrant {
							name
						}
					}
				}
			}
		}
		`,
		"variables": {
			"event": matchID,
			"page": 1,
			"perPage": 5
		}
	};
	
	// Send request
	jQuery.ajax({
		type: 'POST',
		crossDomain: true,
		dataType: 'json',
		data: JSON.stringify(json),
		url: 'https://api.smash.gg/gql/alpha', 
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization","Bearer " + options.apiKey);
		},
		error: function(e) {
			console.log(e);
		},
		success: function(d) {
			// Set data to hidden HTML tag
			// Because async can go suck my you know what.
			var safe = matchID.replace(/[^-_a-zA-Z]/g, '');
			if (jQuery("#SmashGG" + safe).length == 0) {
				jQuery("<p>").attr({
					type: 'hidden',
					id: 'SmashGG' + safe,
					value: d
				}).appendTo('body');
			}
			// If we already made a tag, just update it
			else {
				jQuery("#SmashGG" + safe).val(d);
			}
		}
	});
}