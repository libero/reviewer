// This file will be responsible for loading the config from wherever it'll come from

const config = {
  auth: {
    // Where the /login route sends you - a.k.a the identity server
    login_redirect_url: `${process.env.CONTINUUM_LOGIN_URL}:${process.env.CONTINUUM_LOGIN_PORT}/submit`,
    // App entry point i.e. the resource server that needs authentication
    authorised_redirect_url: `http://localhost:${process.env.CLIENT_PORT}/login`
  },
  internal_jwt: {
    // This token is global to libero services
    secret: process.env.AUTHENTICATION_JWT_SECRET as string,
    expiresIn: "30m"
  },
  journal_jwt: {
    // This secret is used by journal to sign outgoing tokens, and used here to verify those
    // tokens
    secret: process.env.CONTINUUM_LOGIN_JWT_SECRET as string
  },
  port: process.env.AUTHENTICATION_PORT || 3001
};

export default config;
