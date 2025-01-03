Package.describe({
  name: "smardo:accounts-phone",
  version: "0.0.26",
  // Brief, one-line summary of the package.
  summary: "A login service based on mobile phone number, For Meteor.",
  // URL to the Git repository containing the source code for this package.
  git: "https://github.com/smardo/accounts-phone",
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: "README.md"
});

Npm.depends({
  phone: "2.0.0",
  twilio: "3.22.0",
  "stream-buffers": "3.0.2"
});

Package.onUse(function(api) {
  api.versionsFrom("2.16");
  api.use("ecmascript");

  api.use("npm-bcrypt", "server");

  api.use("accounts-base@2.0.0 || 3.0.0", ["client", "server"]);
  // Export Accounts (etc) to packages using this one.
  api.imply("accounts-base@2.0.0 || 3.0.0", ["client", "server"]);
  api.use("srp", ["client", "server"]);
  api.use("sha", ["client", "server"]);
  api.use("email@2.0.0 || 3.0.0", ["server"]);
  api.use("random", ["server"]);
  api.use("ejson", "server");
  api.use("callback-hook", "server");
  api.use("check");
  api.use("underscore");
  api.use("ddp", ["client", "server"]);
  api.addFiles("sms_server.js", "server");

  api.export("SMS", "server");
  api.export("SMSTest", "server", {testOnly: true});

  api.mainModule("phone_server.js", "server");
  api.mainModule("phone_client.js", "client");
});

Package.onTest(function(api) {
  api.use([
    "smardo:accounts-phone",
    "tinytest",
    "test-helpers",
    "tracker",
    "accounts-base",
    "random",
    "underscore",
    "check",
    "ddp"
  ]);
  api.addFiles("phone_tests_setup.js", "server");
  api.addFiles("phone_tests.js", ["client", "server"]);
  api.addFiles("sms_tests_setup.js", "server");
  api.addFiles("sms_tests.js", "client");
});
