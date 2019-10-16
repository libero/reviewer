# Libero Reviewer Audit Service

This service listens for audit events and persists them

## Setup

Create a database called 'reviewer_audit', then run the migrations:

```
yarn run migrate up
```

You have access to other migration commands:

```
  up                     migrates everything up
  down                   migrates 1 migration down
  up [file-to-migrate]   migrates a specific file up
  down [file-to-migrate] migrates a specific file down
  execute [direction] [files-to-migrate] migrates a specific file
  pending                shows all pending migrations
  history                shows the migration history
```
