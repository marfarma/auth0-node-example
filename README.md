This is a node.js example application for the auth0 platform.

## Install dependencies

Install dependencies with:

	npm install

## Run 

First create an account in [auth0](http://auth0.com) and create an application with the url of this application plus the callback, for instance <http://localhost:9988/callback>

In order to run this application you will need 4 environment variables:

-   clientId
-   clientSecret
-	namespace
-   connections (comma separated)

You can run the application as follows: 

	clientId=<your clientid> \
	clientSecret=<your clientsecret> \ 
	namespace=<your namespace> \
	connections=<a connection> \
	node server.js

## Running example in heroku

There is a running example in heroku here <http://frozen-dawn-4312.herokuapp.com/>