import dotenv from 'dotenv';

dotenv.config({ path: './.env' })
 
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const svc: object = {
  "type": process.env.FIREBASE_ACCOUNT_TYPE!,
  "project_id": process.env.FIREBASE_ACCOUNT_PROJECTID!,
  "private_key_id": process.env.FIREBASE_ACCOUNT_PRIVATE_KEY_ID!,
  "private_key": process.env.FIREBASE_ACCOUNT_PRIVATE_KEY!,
  "client_email": process.env.FIREBASE_ACCOUNT_CLIENT_EMAIL!,
  "client_id": process.env.FIREBASE_ACCOUNT_CLIENT_ID!,
  "auth_uri": process.env.FIREBASE_ACCOUNT_AUTH_URI!,
  "token_uri": process.env.FIREBASE_ACCOUNT_TOKEN_URI!,
  "auth_provider_x509_cert_url": process.env.FIREBASE_ACCOUNT_AUTH_PROVIDER_CERT_URL!,
  "client_x509_cert_url": process.env.FIREBASE_ACCOUNT_CLIENT_CERT_URL!,
  "universe_domain": process.env.FIREBASE_ACCOUNT_UNIVERSE_DOMAIN! 
}

initializeApp({
  credential: cert(svc),
  projectId: process.env.FIREBASE_ACCOUNT_PROJECTID!
});

const db = getFirestore();

export default db;