const Tag = require("../models/tag");

module.exports = function(mongooseService) {
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
  };
};
