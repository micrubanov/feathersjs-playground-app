var app = feathers();

app.configure(feathers.authentication({ storage: window.localStorage }));

console.debug("app is an", typeof app);

function login(email, password) {
  app
    .authenticate({
      strategy: "local",
      email,
      password
    })
    .then(() => {
      // Logged in
      console.log(arguments);
    })
    .catch(e => {
      // Show login page (potentially with `e.message`)
      console.error("Authentication error", e);
    });
}

login('test@test.com','test')
