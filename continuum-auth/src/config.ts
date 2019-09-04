// This file will be responsible for loading the config from wherever it'll come from

const config = {
  auth: {
    // Where the /login route sends you - a.k.a the identity server
    login_redirect_url: "https://elifesciences.org/submit",
    // App entry point i.e. the resource server that needs authentication
    authorised_redirect_url: "http://localhost:3001/login"
  },
  internal_jwt: {
    // This token is global to libero services
    secret: "super_secret_jam",
    expiresIn: "30m"
  },
  journal_jwt: {
    // This secret is used by journal to sign outgoing tokens, and used here to verify those
    // tokens
    secret: "some_secret_from_journal"
  }
};

export default config;
