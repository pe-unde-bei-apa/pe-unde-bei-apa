---
name: database-migrations
description: Create, write and apply database migrations

---

# What I do

Create, write and run database migration.

I always follow these steps:

0. Read all migrations under `website/migrations/*.sql` to understand the current database structure.
1. Pick new migration message - this is a slug like "create-some-table"
2. Create new migration: `bash migration_new.sh 'MESSAGE'`
  - for example `bash migration_new.sh 'create-some-table'`
3. Find and edit our new migration
  - list `website/migrations/*.sql` and find the latest one (the one with our message)
  - edit it by adding SQL code inside it
  - leave the initial sql comments at the top of the file unchanged, yoyo-migrations will need them later 
  - COLLATE='utf8mb4_romanian_ci'
4. Apply migrations to database: `bash migration_apply.sh`
5. Add it to the SQL 


## When to use me

When database schema changes are required.

Show the proposed migrations and ask user if it's OK before writing and applying.