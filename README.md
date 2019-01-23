# TODO list APP

Made originally as an assigment for university course "www-programming".

This is a basic CRUD todo app. Account creation process has been introduced using Google authentication. 

## How it has been made?
### Front-end
Vue.js has been used for reactive list rendering and materializecss for the overall styling. Data is requested from the server using axios package, which is AJAX compatible.

### Back-end
Server is running on node with the help of express.js. Mongodb is used as a database, with use of mongoose package. Google account authentication is running on passport.js package.
![Screenshot](https://github.com/matikka96/todolist-vko10/blob/master/screenshot.png?raw=true)

## Configuration
All the configuration is done in `/config/keysTemplate.js` This is how the file looks like:
```
module.exports = {
	google: {
		clientID: 'your-clien-id',
		clientSecret: 'your-secret-code'
	},
	mongodb: {
		uri: 'link-to-your-mongodb'
	},
	session: {
		cookieKey: 'key-for-cookie-crypting'
	},
	clien: {
		url: 'https://localhost:3000'	// For local use
};
```
Google credentials can be generated on google developer console.
Mongodb can be easily created online on www.mlab.com.
Cookie key can be really any kind of string.

### Installation

Clone repository from github. Install packages with 
COMMAND:
```
npm install
```

Make sure file `/config/keysTemplate.js` is configured properly. Remember to rename file "keysTemplate.js" --> "keys.js"

And finally run with 
COMMAND:
```
node server.js
```
Now your app is seen here: http://localhost:3000
