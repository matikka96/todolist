# WWW-applications – week 10

This is a basic CRUD todo app. Account creation process has been introduced using Google authentication. 

## How it has been made?
### Front-end
Vuejs has been used for reactive list rendering and materializecss for the overall styling. Data is requested from the server using axios module, which is AJAX compatible.

### Back-end
Server is running on node with the help of expressjs. Mongodb is used as a database, with use of mongoose package. Google account authentication is running on passportjs package.
![Screenshot](https://github.com/matikka96/todolist-mongodb-axios/blob/master/screenshot.png)

## Configuration
All the configuration is done in *./config/keys.js* This is how the file looks like:
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
	}
};
```
Google credentials can be generated on google developer console.
Mongodb can be easily created online on www.mlab.com.
Cookie key can be really any kind of string.

### Installation

There are two easy ways to get this application up and running. 

**Method 1 – using Docker** (Temporary for school use only for security reasons)
Download project from Github and build it in Docker. 
COMMAND: 
> docker build -t todolistserver https://github.com/matikka96/todolist-mongodb-axios.git
This will create docker image named "todolistserver".
Final step is to run above image. 
COMMAND: 
> docker run -p 3000:3000 -d todolistserver
Now your app is seen here: http://localhost:3000

**Method 2 – Clone from Github**
Clone package from github. Install packages with 
COMMAND:
> npm install
And finally run with 
COMMAND:
> node server.js
Now your app is seen here: http://localhost:3000
