1 — Create a Firebase Project
    Option A: 🖥️ From Firebase Console (Easiest)

    Go to 👉 https://console.firebase.google.com

    Click “Add project”

    Name it amavya-shop

    Project ID will automatically generate like amavya-shop-xxxxx (unique suffix).

    You can skip Google Analytics for now (you can enable it later).

    Click Create Project
-----------------------------------------------------------
Step 1 — Install Firebase CLI

    Make sure you have Node ≥ 16 installed. Then run:

    npm install -g firebase-tools


Login to Firebase:

    firebase login


    That opens a browser for Google auth — choose the same account you use in the Firebase Console.

Step 2 — Create a Firebase Project

    Go to https://console.firebase.google.com
    →
    Add project → name it amavya-shop (or similar).
    No need for Analytics yet — you can add it later.

📁 Step 3 — Initialize Firebase in Your Repo

    From your repo root (amavya-shop/):

    firebase init


    Select:

    Hosting: Configure files for Firebase Hosting

    (Later you can re-run and add “Functions” too)

    Choose:

    Use an existing project → pick your amavya-shop project

    Public directory: frontend/dist/frontend
    (→ Angular builds here by default)

    Single-page app? → Yes

    Automatic builds/deploys with GitHub? → For now choose No (we’ll set that manually next).

🏗️ Step 4 — Build Angular App

    From inside your frontend folder:

    cd frontend
    ng build --configuration production


    This generates production-ready static files in:

    frontend/dist/frontend/

🚀 Step 5 — Deploy Manually

    Go back to repo root (where firebase.json is):

    firebase deploy --only hosting


    In a few seconds you’ll get:

    Hosting URL: https://amavya-shop.web.app


    Open that — your Under Construction page is live 🎉

🔁 Step 6 — Auto-Deploy on GitHub Commit (CI/CD)

    Now let’s automate the hosting deploy whenever you push to main.

1️⃣ Create a Firebase Token

    Run this locally:

    firebase login:ci


    Copy the long token it prints.

2️⃣ Add Secret to GitHub

    In your repo → Settings → Secrets and variables → Actions → New repository secret
    Name it:

    FIREBASE_TOKEN


    Paste the token value.

3️⃣ Create GitHub Actions Workflow

    In your repo create:
    .github/workflows/firebase-deploy.yml

    name: Deploy Angular App to Firebase Hosting

    on:
    push:
        branches:
        - main  # deploy only when main branch changes

    jobs:
    build-deploy:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout
            uses: actions/checkout@v3

        - name: Setup Node.js
            uses: actions/setup-node@v3
            with:
            node-version: 18

        - name: Install Angular dependencies
            run: npm ci --prefix frontend

        - name: Build Angular app
            run: npm run build --prefix frontend -- --configuration production

        - name: Deploy to Firebase Hosting
            uses: w9jds/firebase-action@v13
            with:
            args: deploy --only hosting
            env:
            FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}


    Now, whenever you push to main, GitHub will automatically:

    Install dependencies

    Build your Angular app

    Deploy to Firebase Hosting