
import admin from 'firebase-admin';

// Move to dotenv for security reason
const serviceAccount = require("../secret/qho640-dd856-firebase-adminsdk-uwtas-eb15eb51cd.json");


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://qho640-dd856.firebaseio.com"
    });
}

const dbAdmin = admin.firestore();

export {dbAdmin};

