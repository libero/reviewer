export default {
    port: process.env.CONTINUUM_LOGIN_PORT,
    authenticationUrl: `${process.env.AUTHENTICATION_URL}:${process.env.AUTHENTICATION_PORT}`,
    continuumLoginJwtSecret: process.env.CONTINUUM_LOGIN_JWT_SECRET
}
