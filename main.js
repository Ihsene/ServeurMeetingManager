const CLIENT_ID = '251985880134-s50kcnrr15ci8cvpeiuo4jhfir2sjrq3.apps.googleusercontent.com';

const express = require('express'), 
	bodyParser = require('body-parser'), 
	GoogleAuth = require('google-auth-library');

const app = express();
app.use(bodyParser.json());
var auth = new GoogleAuth;

app.post('/login', function (req, res) {
	console.log('connections of user'+req.body.email);
	var client = new auth.OAuth2(CLIENT_ID, '', '');
	client.verifyIdToken(req.body.token,CLIENT_ID, function(e, login) {
		if(!login) {
			console.log('unable to verify the user '+req.body.email);
			res.send(JSON.stringify({ token: 'null' }))
		}else {
			var payload = login.getPayload();
      		var userid = payload['sub'];
      		res.send(JSON.stringify({token:req.body.token}))
      		console.log('user '+req.body.email+' is valide');
		}
		
    });
})

app.listen(8080, function () {
  console.log('Server app listening on port 8080 !')
})