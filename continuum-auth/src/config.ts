// This file will be responsible for loading the config from wherever it'll come from

const config = {
  auth: {
    redirect_url: "https://www.google.com"
  },
  jwt: {
    secret: "super_secret_jam",
    expiresIn: "24h",
  },
};

export default config;
