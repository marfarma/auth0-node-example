This is a node.js example application for the [auth0](http://auth0.com) platform.

This example uses [passport.js](http://passportjs.org/) with the [passport-auth0](https://github.com/qraftlabs/passport-auth0) adapter.

## Install dependencies

Install dependencies with:

	npm install

## Run 

First create an account in [auth0](http://auth0.com) and create an application with the url of this application plus the callback, for instance <http://localhost:9988/callback>

In order to run this application you will need 3 environment variables shown in the settings panel of auth0:

-   clientId
-   clientSecret
-	namespace

You can run the application as follows: 

	clientId=<your clientid> \
	clientSecret=<your clientsecret> \ 
	namespace=<your namespace> \
	connections=<a connection> \
	node server.js

## Running example in heroku

There is a running example in heroku here <http://frozen-dawn-4312.herokuapp.com/>