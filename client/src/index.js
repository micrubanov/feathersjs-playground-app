//var app = feathers();

//app.configure(feathers.authentication({ storage: window.localStorage }));

//console.debug("app is an", typeof app);


const feathers = require('@feathersjs/feathers');
const auth = require('@feathersjs/authentication-client');
const rest = require('@feathersjs/rest-client');

const app = feathers();
const options = {
    header: 'Authorization', // the default authorization header for REST
    path: '/authentication', // the server-side authentication service path
    jwtStrategy: 'jwt', // the name of the JWT authentication strategy
    entity: 'user', // the entity you are authenticating (ie. a users)
    service: 'users', // the service to look up the entity
    cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
    storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
    storage: window.localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
};

var restClient = rest();
app.configure(restClient.fetch(window.fetch));

app.configure(auth(options))
function login(email, password, next) {
  app
    .authenticate({
      strategy: "local",
      email,
      password
    })
    .then(() => {
      // Logged in
      console.log(arguments);
      next();
    })
    .catch(e => {
      // Show login page (potentially with `e.message`)
      console.error("Authentication error", e);
      next();
    });
}

function authenticate() {
  app
    .authenticate({
      strategy: "jwt"
    })
    .then(() => {
      // JWT authentication successful
      console.debug("Authenticated!");
    })
    .catch(e => {
      console.error("Authentication error", e);
      // Show login page
    });
}

window.onload = function () {
  login('test@test.com','test', authenticate)
}
