# Firebase Guestbook Setup Guide

This guide will walk you through setting up a Firebase Realtime Database for your 90s-style blog guestbook.

## 1. Create a Firebase Account

If you don't already have one, sign up for a Firebase account at [firebase.google.com](https://firebase.google.com/).

## 2. Create a New Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "90s-blog-guestbook")
4. Follow the prompts to complete the project creation

## 3. Set Up Realtime Database

1. In your Firebase project, go to "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose a location closest to your target audience
4. Start in test mode for now (we'll secure it later)
5. Click "Enable"

## 4. Set Up Firebase Authentication for Your Web App

1. In your Firebase project, click on the gear icon next to "Project Overview" and select "Project settings"
2. Scroll down to "Your apps" section
3. Click the web icon (</>) to add a web app
4. Enter a nickname for your app (e.g., "90s-blog")
5. Optionally enable Firebase Hosting if you want to host your site with Firebase
6. Click "Register app"
7. You'll be shown your Firebase configuration - copy this

## 5. Add Your Firebase Config to Your Site

1. Open `script.js` in your code editor
2. Find the `firebaseConfig` object near the top of the file
3. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 6. Secure Your Database

1. Go back to the Realtime Database in your Firebase Console
2. Click on the "Rules" tab
3. Replace the default rules with the contents of the `firebase-rules.json` file provided in this repo
4. Click "Publish"

## 7. Deploy to GitHub Pages

1. Push all your updated files to your GitHub repository
2. Make sure GitHub Pages is enabled for your repository (Settings > Pages)
3. Your site should now be live with a working Firebase-powered guestbook!

## 8. Testing the Guestbook

1. Navigate to your GitHub Pages site
2. Go to the guestbook section
3. Fill out the form and submit an entry
4. Verify that your entry appears in the guestbook list

## 9. Troubleshooting

If entries aren't appearing:
- Check the browser console for errors
- Verify your Firebase configuration is correct
- Check that your database rules are properly set
- Make sure you've created the database in Firebase

## 10. Optional: Set Up Custom Domain

If you're using a custom domain with GitHub Pages:
1. Add your domain in Firebase Authentication > Settings > Authorized Domains
2. This will allow Firebase to work on your custom domain

---

Enjoy your new 90s-style guestbook powered by modern Firebase technology! 