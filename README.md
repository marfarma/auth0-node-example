This is a node.js example application for the auth0 platform.

## Setup 

First create an account in [auth0](http://auth0.com) and create an application with the url of this application plus the callback, for instance <http://localhost:9988/callback>

In order to run this application you will need at least 3 environment variables:

-   clientId
-   clientSecret
-   connections (comma separated)

You can run the application as follows: 

	clientId=<your clientid> clientSecret=<your clientsecret> connections=<a connection> node server.js

## How to run it

Install dependencies with:

	npm install

Then run with:

	npm start


## Running example in heroku

There is a running example in heroku here <http://frozen-dawn-4312.herokuapp.com/>