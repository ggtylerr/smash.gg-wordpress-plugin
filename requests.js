function SmashGG_RequestMatch(matchID) {
	// Set up requests
	const xhr = new XMLHttpRequest();
	
	const json = {
		// Why the hell did they make it like this?
		"query": `
		EventStandings($eventId: ID!, $page: Int!, $perPage; Int! {
			event(id: $eventId) {
				id
				name
				standings(query: {
					perPage: $perPage,
					page: $page
				}){
					nodes {
						placement
						entrant {
							id
							name
						}
					}
				}
			}
		}
		`,
		"variables": {
			"eventId": parseInt(matchID),
			"page": 1,
			"perPage": 3
		}
	};
	
	xhr.open('POST','https://api.smash.gg/gql/alpha');
	xhr.setRequestHeader('Content-Type','application/json');
	
	// On response
	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			// Parse JSON
			const res = JSON.parse(xhr.responseText);
			return res.data.event.name;
		}
	}
	// Send that request
	xhr.send(JSON.stringify(json));
}