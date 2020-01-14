const API_KEY = "f1e0257da91af374455ab285d41925ca";

const { Tmdb } = require('tmdb');

const tmdb = new Tmdb(API_KEY);

tmdb.get('movie/changes', {})
	.then(async data => {
		const res = data.results
			.filter(change => !change.adult)
			.map(change =>
				tmdb.get(`movie/${change.id}/release_dates`, {})
					.then(res =>
						res.results
							.filter(r => myContries.includes(r.iso31661))
							.flatMap(rel => rel.releaseDates.map(dat => Object.assign(dat, { country: rel.iso31661 })))
							.filter(relDate => relDate.type == 5)
					)
					.catch(err => { console.error(err); console.error(change.id) })
			)
		console.log(await Promise.all(res))
	})
	.catch(err => console.error(err))

const myContries = ['FR', 'US']

// tmdb.get(`movie/${ID}/release_dates`, {})
// 	.then(res => console.log(
// 		res.results
// 			.filter(r => myContries.includes(r.iso31661))
// 			.flatMap(rel => rel.releaseDates.map(dat => Object.assign(dat, { country: rel.iso31661 })))
// 			.filter(relDate => relDate.type == 5)
// 	))
// 	.catch(console.error)

