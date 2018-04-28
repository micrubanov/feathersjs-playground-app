const debug = require("debug")("services");
const Tag = require("../models/tag");
const User = require("../models/user");

module.exports = function(mongooseService, local, authentication) {
  return function(app) {
    app.use(
      "tags",
      mongooseService({
        name: "tag",
        Model: Tag,
        paginate: {
          default: 10,
          max: 20
        }
      })
    );
    app.use(
      "users",
      mongooseService({
        name: "user",
        Model: User,
        paginate: {
          default: 1,
          max: 20
        }
      })
    );
    app.service("users").hooks({
      // Make sure `password` never gets sent to the client
      after: local.hooks.protect("password")
    });

    app.service("authentication").hooks({
      before: {
        create: [
          // You can chain multiple strategies
          authentication.hooks.authenticate(["jwt", "local"])
        ],
        remove: [authentication.hooks.authenticate("jwt")]
      }
    });
    app.service("users").hooks({
      before: {
        find: [authentication.hooks.authenticate("jwt")],
        create: [local.hooks.hashPassword({ passwordField: "password" })]
      }
    });
  };
};
