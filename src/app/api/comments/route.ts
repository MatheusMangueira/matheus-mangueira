import { initAdmin, verifyToken } from '@/util/firebaseAdmin';
import { getFirestore } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  await initAdmin()

  const db = getFirestore();

  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Token não fornecido.' }, { status: 401 });
  }

  const user = await verifyToken(token);

  if (!user) {
    return NextResponse.json({ error: 'Usuário não autorizado.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get('commentId');

  if (!commentId) {
    return NextResponse.json({ error: 'commentId é necessário.' }, { status: 400 });
  }

  try {
    const commentRef = db.collection('messages').doc(commentId);
    await commentRef.set({ approval: true }, { merge: true });

    return NextResponse.json({ message: 'Comentário aprovado com sucesso!' });

  } catch (error) {
    console.error('Erro ao aprovar o comentário:', error);
    return NextResponse.json({ error: 'Erro ao aprovar o comentário.' }, { status: 500 });
  }

}
