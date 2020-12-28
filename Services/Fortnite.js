module.exports = (app) => {

    app.get('/fortnite/api/v2/versioncheck/:version', (req, res) => {
        res.json({type: "NO_UPDATE"})
	});

    app.get('/fortnite/api/game/v2/enabled_features', (req, res) => {
        res.json([])
    });
    
	app.get('/socialban/api/public/v1/:accountId', (req, res) => {
		res.json({
			bans: [0],
			Warnings: [0]
		})
	});

    app.get('/affiliate/api/public/affiliates/slug/:affiliateName', (req, res) => {
		res.json({
			id: "aabbccddeeff11223344556677889900",
			slug: req.params.affiliateName,
			displayName: req.params.affiliateName,
		    status: "ACTIVE",
			verified: true
		})
	});

	app.get("/fortnite/api/matchmaking/session/findPlayer/:id", (req, res) => {
		res.json([])
	})
};