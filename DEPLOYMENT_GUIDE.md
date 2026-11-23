# Deployment Guide: Vercel + Vercel Postgres

The codebase has been updated to use **Vercel Postgres** instead of SQLite. Follow these steps to deploy.

## Step 1: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** > **"Project"**.
3. Import your GitHub repository: `mlicense`.
4. **Important**: The first deployment might fail if the database isn't connected yet. This is normal.

## Step 2: Create & Connect Database

1. In your new Vercel Project, go to the **Storage** tab.
2. Click **"Connect Store"** > **"Postgres"** > **"Create New"**.
3. Choose a region (e.g., Singapore `sin1` or Washington `iad1`).
4. Once created, click **"Connect"**.
5. Vercel will automatically add the necessary Environment Variables (`POSTGRES_PRISMA_URL`, etc.) to your project settings.
6. Go to **Deployments** tab and **Redeploy** the latest commit.

## Step 3: Initialize the Database (Production)

Once the app is deployed and running, the database will be empty (no admin user). You need to seed it.

### Option A: Use Vercel Toolbar (Easiest)

1. Go to **Storage** > **Browser** in Vercel.
2. Select the `Admin` table.
3. Manually add a row:
    * `id`: (leave blank/uuid)
    * `username`: `admin`
    * `passwordHash`: `$2a$10$X7...` (Use a bcrypt generator or copy from your local DB if needed).

### Option B: Run Seed Locally against Production

You can run the seed script from your local machine, pointing to the real Vercel DB.

1. **Get Credentials**: Go to Vercel Project > **Settings** > **Environment Variables**.
2. **Update Local Env**: Copy the values of `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` and paste them into your local `.env` file (replacing the placeholders).
3. **Run Seed**:

    ```bash
    npx prisma db seed
    ```

    *This command runs `prisma/seed.js`, which inserts the default Admin user (`admin` / `password123`) into your production database.*

4. **Verify**: Log in to your deployed app with the default credentials.

### Migrating Existing Data (Advanced)

If you have created real licenses in your local SQLite and want to keep them:

* You cannot simply "upload" the `.db` file.
* You must write a custom script to read from SQLite and write to Postgres.
* **Recommended**: For a fresh deployment, just use the Seed script and recreate necessary licenses via the Admin Dashboard.

## Troubleshooting

* **Build Failures**: Check Vercel logs. If it says "Prisma Client not found", ensure `package.json` has `"postinstall": "prisma generate"`. (This has already been added).
* **Database Errors**: Ensure you selected **Postgres** and not KV or Blob storage.
