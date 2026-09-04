# BAYPEDIA Railway Deployment Pitfalls

This file documents recurring deployment issues and their fixes during the BAYPEDIA project.

## Node Engine Mismatch

**Issue:** Railway defaults to Node 18, but root `package.json` may specify `react-router-dom@7` requiring Node >=20.

**Fix:** Add `"engines": { "node": ">=18.0.0" }` to root `package.json`.

```json
{
  "name": "baypedia-music-hub",
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": { ... }
}
```

## PostgreSQL Schema Evolution

**Issue:** Existing tables missing new columns after schema change; `SELECT *` breaks when column order changes.

**Fix:** Always use explicit column lists in `INSERT` and `ALTER TABLE ADD COLUMN IF NOT EXISTS` for migrations.

```sql
ALTER TABLE articles ADD COLUMN IF NOT EXISTS body TEXT NOT NULL DEFAULT '';
ALTER TABLE articles ADD COLUMN IF NOT EXISTS image TEXT;
```

## Environment Variable Management

**Issue:** Secrets hardcoded or missing in production.

**Fix:** Set via Railway CLI:

```bash
railway variable set DATABASE_URL="..." --service <id> --json
railway variable set JWT_SECRET="..." --service <id> --json
```

## Deployment Logs Debugging

**Issue:** `railway logs` hangs or times out.

**Fix:** Use deployment ID directly:

```bash
railway service status --json  # get latest deploymentId
railway logs <deployment-id> --deployment --json -n 200
```

## Railway Rollback Behavior

**Issue:** Failed deployment doesn’t update the live URL; old version persists.

**Fix:** Push a new commit to trigger fresh deploy. Railway automatically rolls back failed deployments.

## User Roles

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| admin | admin@baypedia.id | Admin123! | Full access, DB inspection |
| editor | editor@baypedia.id | Editor123! | Create/edit articles |
| user | any | any | Browse, comment, submit |

## Admin Database Endpoint

`GET /api/admin/database` (admin role required) returns:

```json
{
  "summary": { "users": 2, "articles": 4, "comments": 0, "releases": 5 },
  "users": [...],
  "articles": [...],
  "releases": [...]
}
```

## DATABASE_URL Access

Via Railway dashboard: Service → Postgres → Connection → View credentials

Via CLI:
```bash
railway variables --service <postgres-id> --json
```
