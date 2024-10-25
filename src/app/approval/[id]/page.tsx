"use client";
import { loginWithGoogle } from "@/util/googleAuthentication";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ApprovalComments = () => {
  const [value, setValue] = useState<any>()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();

  const handleLogin = useCallback(async () => {
    try {
      const tokenResponse = await loginWithGoogle();
      const token = await tokenResponse?.getIdToken();
      setValue(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }, []);

  const handleApprovalComments = async () => {
    try {

      if (!value) return;

      const response = await axios.put(`https://matheus-mangueira-five.vercel.app/api/comments?commentId=${id}`, {}, {
        headers: {
          Authorization: `Bearer ${value}`,
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLogin()
  }, [handleLogin])

  useEffect(() => {
    if (isLoggedIn) {
      handleApprovalComments();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h1>{value ? value.message : "Aguardando aprovação..."}</h1>
    </div>
  )
}

export default ApprovalComments;