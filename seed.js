const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// We need the service account key. 
// Without service account key, I can just use the standard firebase client SDK.
