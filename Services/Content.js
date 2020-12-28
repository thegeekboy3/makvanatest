const config = require('../config.json')

module.exports = (app) => {
    app.get("/content/api/pages/fortnite-game", function (req, res) {
        
        var season
        if (req.headers["user-agent"]) {
            try {
                season = req.headers["user-agent"].split("-")[1].split(".")[0]
                if (season == 10) season = "x"
            } catch {
                season = 2
            }
        } else season = 2

        res.json({        
        "jcr:isCheckedOut": true,
        _title: "Fortnite Game",
        "jcr:baseVersion": "a7ca237317f1e7883b3279-c38f-4aa7-a325-e099e4bf71e5",
        _activeDate: "2017-08-30T03:20:48.050Z",
        lastModified: new Date(),
        _locale: "en-US",
        battleroyalenewsv2: {
            news: {
                motds: [
                    {
                        entryType: "Text",
                        image: config.newsimage,
                        titleImage: config.newstitleImage,
                        hidden: false,
                        videoMute: false,
                        tabTitleOverride: "Onyx",
                        _type: "CommonUI Simple Message MOTD",
                        title: config.newstitle,
                        body: config.newsbody,
                        videoLoop: false,
                        videoStreamingEnabled: false,
                        sortingPriority: 0,
                        id: `OnyxNews`,
                        spotlight: false
                    }
                ]
            }
        },
        emergencynotice: {
            news: {
                platform_messages: [],
                _type: "Battle Royale News",
                messages: [
                    {
                        hidden: false,
                        _type: "CommonUI Simple Message Base",
                        subgame: "br",
                        title: config.newacnoncementtitle,
                        body: config.newsanoncement,
                        spotlight: true
                    }
                ]
            },
            _title: "emergencynotice",
            _activeDate: new Date(),
            lastModified: new Date(),
            _locale: "en-US"
        },
        dynamicbackgrounds: {
            "jcr:isCheckedOut": true,
            backgrounds: {
                backgrounds: [
                    {
                        stage: `season${season}`,
                        _type: "DynamicBackground",
                        key: "lobby"
                    },
                    {
                        stage: `season${season}`,
                        _type: "DynamicBackground",
                        key: "vault"
                    }
                ],
                "_type": "DynamicBackgroundList"
            },
            _title: "dynamicbackgrounds",
            _noIndex: false,
            "jcr:baseVersion": "a7ca237317f1e71f17852c-bccd-4be6-89a0-1bb52672a444",
            _activeDate: new Date(),
            lastModified: new Date(),
            _locale: "en-US"
        }
    })
})
}