# Migration `20200809183357-add-vote-model`

This migration has been generated by John Medina at 8/9/2020, 1:33:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200809174504-add-vote-model..20200809183357-add-vote-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -29,8 +29,8 @@
 model Vote {
     id     Int   @id @default(autoincrement())
     link   link? @relation(fields: [linkId], references: [id])
     linkId Int?
-    User   User? @relation(fields: [userId], references: [id])
+    user   User? @relation(fields: [userId], references: [id])
     userId Int?
     @@unique([linkId, userId])
 }
```


