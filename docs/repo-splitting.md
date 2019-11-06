# Splitting into Repositories

## Background

The [Reviewer](https://github.com/libero/reviewer) project is currently a mono repo.
It has been decided that splitting the repository is necessary for scaling the project. There have been a number of issues raised to do this splitting and this document is being written to ensure that this is done in a consistent way.

## Method

### Create a new repository

- Make sure you have the permissions and create a repository with the correct name, if in doubt - talk.
- Ensure the new repository has the "eLife developers" team added to it with `Maintain` access.

### Move the code

:exclamation: It's important that the history of the files is kept during the move.

- Read through and then use the [Splitting a subfolder out into a new repository](https://help.github.com/en/github/using-git/splitting-a-subfolder-out-into-a-new-repository) document.
- Any questions ask someone who's done it before, like @will-byrne

### Test & Infrastructure

Ensure the following:

- the package is linted
- the unit tests are run. If there are insufficient tests raise a ticket.
- the package is published?
- a docker container is build (if required)
- CI is configured

### Libero compliance

- Ensure the README.md is reflective of the project.
- Ensure the package is licensed under MIT (check the LICENCE file and package.json)
- Add a [code of conduct](https://github.com/libero/community/blob/master/CODE_OF_CONDUCT.md)
- Add the [contributing](https://github.com/libero/community/blob/master/CONTRIBUTING.md) document.

### Remove the code

Now remove the code from the [Reviewer](https://github.com/libero/reviewer) repository.
