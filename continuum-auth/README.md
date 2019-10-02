# continuum-auth

**The purpose of this service is to implement an interface to connect the eLife journal to libero reviewer**

A connector service so that eLife's deployment of libero can authenticate using the existing journal login system. After successful authentication, this service will redirect to an endpoint, with a
signed jwt token appended to the URL. This token will then be used by the client to authenticate it's subsequent HTTP requests with other services in the system. This token will contain some information
about the user, provided by the `profiles` service.

## Things to define for continuum-auth to be useful long term

- We need to stabilise the interface for the auth token, so that we can swap out this service with something else
- We need some way to manually test the login flow from end to end. This means that it needs to be:
  - Deployed somewhere - the journal auth subsystem needs to know where to redirect to
  - Configurable - the service needs to work in many different environments, including but not limited to: locally (without docker), locally (inside docker), unstable libero environment, unstable eLife environment
  - Working - This service is a key part of a user's entry point into the application, it provides the user with their permissions and their authentication token - it needs to be reliable!
- We have an issue with using the `profiles` service, it does not contain information about staff members, and there is no good mechanism to map `profiles` records to records in the `people` service (the `people` service is for staff). Therefore, we need some way to map either `profiles.id` or `profiles.orcid` to some information about that user's permission, so we can calculate the role properly.
- Also this service needs to know about the journal secret so it can verify the tokens provided by it. I think we should use a separate secret to sign and verify tokens issued internally to by libero reviewer, theres no reason for reviewer to know about the secrets used by journal.


There are proper docs here: [Spec document](https://docs.google.com/document/d/1Lk0U22AIa2RIN6cIV7Smp87gGLngbyVWB9-PFJUORak/edit?usp=sharing)
