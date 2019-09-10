export default {
    port: process.env.CONTINUUM_LOGIN_PORT,
    reviewerAuthUrl: `${process.env.AUTHENTICATION_URL}:${process.env.AUTHENTICATION_PORT}`
}
