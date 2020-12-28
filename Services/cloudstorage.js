const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

module.exports = (app) => {
    app.get('/fortnite/api/cloudstorage/system', async (req, res) => {

		let engine = fs.readFileSync(path.join(__dirname ,'../cloudstorage/DefaultEngine.ini'))
        let runtime = fs.readFileSync(path.join(__dirname ,'../cloudstorage/DefaultRuntimeOptions.ini'))
        let game = fs.readFileSync(path.join(__dirname , '../cloudstorage/DefaultGame.ini'))

		res.json([{
			"uniqueFilename": "3460cbe1c57d4a838ace32951a4d7171",
			"filename": "DefaultEngine.ini",
			"hash": crypto.createHash("sha1").update(engine).digest("hex"),
			"hash256": crypto.createHash("sha256").update(engine).digest("hex"),
			"length": engine.length,
			"contentType": "application/octet-stream",
			"uploaded": fs.statSync(path.join(__dirname ,'../cloudstorage/DefaultEngine.ini')).mtime,
			"storageType": "S3",
			"doNotCache": false
        },
        {
			"uniqueFilename": "a22d837b6a2b46349421259c0a5411bf",
			"filename": "DefaultGame.ini",
			"hash": crypto.createHash("sha1").update(engine).digest("hex"),
			"hash256": crypto.createHash("sha256").update(engine).digest("hex"),
			"length": game.length,
			"contentType": "application/octet-stream",
			"uploaded": fs.statSync(path.join(__dirname ,'../cloudstorage/DefaultGame.ini')).mtime,
			"storageType": "S3",
			"doNotCache": false
		},
		{
			"uniqueFilename": "c52c1f9246eb48ce9dade87be5a66f29",
			"filename": "DefaultRuntimeOptions.ini",
			"hash": crypto.createHash("sha1").update(runtime).digest("hex"),
			"hash256": crypto.createHash("sha256").update(runtime).digest("hex"),
			"length": runtime.length,
			"contentType": "application/octet-stream",
			"uploaded": fs.statSync(path.join(__dirname ,'../cloudstorage/DefaultRuntimeOptions.ini')).mtime,
			"storageType": "S3",
			"doNotCache": false
		}])
    });
    
    app.get('/fortnite/api/cloudstorage/system/3460cbe1c57d4a838ace32951a4d7171', (req, res) => {
		res.setHeader("content-type", "application/octet-stream")
		res.sendFile(path.join(__dirname ,'../cloudstorage/DefaultEngine.ini'))
	});

	app.get('/fortnite/api/cloudstorage/system/c52c1f9246eb48ce9dade87be5a66f29', (req, res) => {
		res.setHeader("content-type", "application/octet-stream")
		res.sendFile(path.join(__dirname ,'../cloudstorage/DefaultRuntimeOptions.ini'))
    });

    app.get('/fortnite/api/cloudstorage/system/a22d837b6a2b46349421259c0a5411bf', (req, res) => {
		res.setHeader("content-type", "application/octet-stream")
		res.sendFile(path.join(__dirname ,'../cloudstorage/DefaultGame.ini'))
    });

}