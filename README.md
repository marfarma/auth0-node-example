This is a node.js example application for the [auth0](http://auth0.com) platform.

This example uses [passport.js](http://passportjs.org/) with the [passport-auth0](https://github.com/qraftlabs/passport-auth0) adapter.

## Install dependencies

Install dependencies with:

	npm install

## Run 

You can use these already created credentials:

	AUTH0_CLIENT_ID=HjF3eg2TVH0pbsTgo0rKYnsftUL6UYIR \
	AUTH0_CLIENT_SECRET=ci8DLzp3XTpqi3q5BIvf9vNnhill1AqmnESFar2xCmkw1TBH+zULawkDxjctMLFa \
	AUTH0_DOMAIN=jose.auth0.com \
	npm start

Or create your own in [auth0](http://app.auth0.com)

	AUTH0_CLIENT_ID=HjF3eg2TVH0pbsTgo0rKYnsftUL6UYIR \
	AUTH0_CLIENT_SECRET=ci8DLzp3XTpqi3q5BIvf9vNnhill1AqmnESFar2xCmkw1TBH+zULawkDxjctMLFa \
	AUTH0_DOMAIN=jose.auth0.com \
	npm start

## Running example in heroku

There is a running example in heroku here <http://frozen-dawn-4312.herokuapp.com/>.

You can deploy your own instance with your credentials and then configure as follows:

	heroku config:set AUTH0_CLIENT_ID="your client id" \
	AUTH0_CLIENT_SECRET="your client secret" \
	AUTH0_DOMAIN="your auth0 domain" \
	CALLBACK_URL="http://your-heroku-url.herokuapp.com/callback"

## Documentation

For more information about [auth0](http://auth0..com) contact our [documentation page](http://docs.auth0.com/).

## Libraries from auth0

This project uses two auth0 modules:

-  [passport-auth0](https://github.com/qraftlabs/passport-auth0) a [passport.js](http://passportjs.org/) strategy to login users with auth0.
-  [auth0](https://github.com/qraftlabs/node-auth0) a client to consume the rest api of auth0. The api allows applications to create connections and query users and users directories.

## LICENSE

MIT