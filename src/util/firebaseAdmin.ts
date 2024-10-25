import admin from 'firebase-admin';

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey
  })

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  })
}

export async function initAdmin() {
  try {
    const params = {
      projectId: process.env.NEXT_PUBLIC_projectId as string,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
      storageBucket: process.env.NEXT_PUBLIC_storageBucket as string,
      privateKey: process.env.FIREBASE_PRIVATE_KEY as string
    };

    return createFirebaseAdminApp(params);
  } catch (error) {
    console.error('Erro ao inicializar o Firebase Admin:', error);
  }
}

export const verifyToken = async (token: string) => {

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    return decodedToken;

  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
};