# Authentication

## Overview
The `continuum-adaptor` service provides authentication functionality for libero reviewer, which provides an interface to the continuum authentication system. That service provides an endpoint that converts the continuum auth token into a libero reviewer specific token ([see the auth token definition](https://github.com/libero/auth-token/blob/master/src/index.ts) ).

## Authentication flow

### Logging in

![](authentication-flow.png)

1. The user is directed first to the continuum journal login (this is definined in configuration)[https://github.com/libero/reviewer-client/blob/069d47299cbef16edbefc435ba7a42441f0bc8fd/config.ts#L8]. The journal login mechanism is hidden - but this redirects the user to ORCID for authentication.
1. After authentication, the user is redirected with the token the hash of a url (`/auth-redirect#<token>`). This redirects
to the authentication url with the token as part of the url so that it can get sent to the server (`/auth/<token>`).
1. This request is then proxied to the `continuum-adaptor` service (as its not accessible publicly).
1. The token is re-signed using a different secret (`reviewer-secret`). See the [auth-token package](https://github.com/libero/auth-token) for more information.
1. The user is then redirected to the client app where the token is stored in the browser's local storage.


### Authenticating requests

Subsequent API requests are then made by the Client App along with the token. Services that authenticate requests will need access to the `reviewer-secret` value.
![](authenticated-api-flow.png)

1. Client App makes an API request. Stored token is sent in the `Authorization` header
1. Request is proxied to submission service which verifies the token using the reviewer secret value.
1. Response is proxied back to the Client App
