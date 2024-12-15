# InfiniteLearning - Your AI-Powered Learning Companion

Welcome to InfiniteLearning! This application helps you learn about any topic through interactive multiple-choice questions and explanations, powered by Google's Gemini API.

## Setup Instructions

Follow these instructions to get the app up and running on Netlify:

### 1. Get Your Gemini API Key

*   Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey) to obtain your Gemini API key.

### 2. Fork the Repository

*   Fork this repository to your own GitHub account. This will be your copy of the code.

### 3. Set Up Firebase

*   **Create a Firebase Project:** Go to the Firebase console ([https://console.firebase.google.com/](https://console.firebase.google.com/)) and create a new project.

*   **Enable Google Sign-in:**
    *   In your Firebase project, go to **Authentication** and then **Sign-in method**.
    *   Enable **Google** as a sign-in provider.
    *   Under **Authorized domains**, add the domain of the email you will use to sign in with (e.g., `@gmail.com`). This ensures that only you can log in initially. You can invite collaborators later by adding their email domains to this list.

*   **Enable Firestore:**
    *   In your Firebase project, go to **Firestore Database** and create a new database.

*   **Get Firebase Web Configuration:**
    *   In your Firebase project, go to **Project settings** (gear icon) and then **General**.
    *   Scroll down to the "Your apps" section and click the **Web** icon (</>) to set up a web app.
    *   Copy the Firebase configuration object, which will look similar to this:

    ```javascript
      const firebaseConfig = {
        apiKey: "AIza...",
        authDomain: "your-app.firebaseapp.com",
        projectId: "your-app",
        storageBucket: "your-app.appspot.com",
        messagingSenderId: "1234567890",
        appId: "1:1234567890:web:abcdefgh123456"
      };
    ```

### 4. Deploy to Netlify

*   Create a Netlify account (if you don't have one) and log in.
*   Click on "Add new site" and select "Import an existing project from Git"
*   Select your forked GitHub repository
*   Under **Build settings** ensure that the build command is `npm run build` and that the deploy directory is `build`.

### 5. Set Environment Variables in Netlify

*   In your Netlify project, go to **Site settings**, then **Build & deploy**, and then **Environment**.
*   Add the following environment variables. Use the values from your firebase config, and your gemini api key.
    *   `REACT_APP_FIREBASE_API_KEY`  (from the Firebase config)
    *   `REACT_APP_FIREBASE_AUTH_DOMAIN` (from the Firebase config)
    *   `REACT_APP_FIREBASE_PROJECT_ID` (from the Firebase config)
     *  `REACT_APP_FIREBASE_STORAGE_BUCKET` (from the Firebase config)
    *   `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` (from the Firebase config)
    *   `REACT_APP_FIREBASE_APP_ID`  (from the Firebase config)
    *    `GEMINI_API_KEY` (Your Gemini API key)

### 6. Start Learning

*   Open your deployed application on Netlify.
*   Sign in with your Google account (that matches the domain you authorised)
*   Start learning by entering a topic, selecting a level, and answering questions!

## Contributing

Contributions are always welcome! If you have ideas or bug fixes, feel free to create a pull request.

## License

This project is licensed under the MIT License.