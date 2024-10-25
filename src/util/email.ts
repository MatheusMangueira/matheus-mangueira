'use server'
import nodemailer from "nodemailer";

interface EmailOptions {
  commentId: string;
  commentUser: string | null;
  comment: string;
  date: string;
}

export const sendEmail = async ({ commentId, commentUser, comment, date }: EmailOptions) => {

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const approvalLink = `https://matheus-mangueira-five.vercel.app/approval/${commentId}`;

  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Aprovar comentário',
    text: `O usuário ${commentUser} enviou um comentário: "${comment} na data: ${date}". Clique aqui para aprova-lo: ${approvalLink}`,
  }

  try {
    await transport.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao enviar e-mail.");
  }
}
