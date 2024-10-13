"use client";

import { fetchMessages, postMessage, userHasPosted } from "@/util/firestore";
import { loginWithGoogle } from "@/util/googleAuthentication";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Messages } from "./components/Messages";
import { Message } from "./type";

export const Recommendations = () => {
  const {
    control,
    handleSubmit,
    reset,
    setError,

    formState: { errors },
  } = useForm<Message>({
    defaultValues: {
      name: "",
      message: "",
      relationship: "Supervisor(a) de Matheus",
    },
  });

  const date = new Date();
  const options: any = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("pt-BR", options);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [visibleMessagesCount, setVisibleMessagesCount] = useState<number>(5);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);


  const handleSubmitMessage = async (data: Message) => {
    const { message, relationship } = data;

    setIsLoading(true);
    setSuccessMessage(false);

    const user = await loginWithGoogle();
    if (!user) {
      console.log("Usuário precisa estar logado para postar uma mensagem.");
      setError('root', { message: "Usuário precisa estar logado para postar uma mensagem." });
      setIsLoading(false);
      return;
    }

    if (await userHasPosted(user.uid)) {
      console.log("Você já fez uma publicação. Apenas uma mensagem por conta é permitida.");
      setError('root', { message: "Você já fez uma publicação. Apenas uma mensagem por conta é permitida." });
      setIsLoading(false);
      return;
    }

    const messageData = {
      name: user.displayName,
      message,
      relationship,
      date: formattedDate,
      userId: user.uid,
    };


    try {
      await postMessage(messageData);
      reset({ name: "", message: "", });

      const messages = await fetchMessages();

      setMessages(messages);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);


    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      setError('root', { message: "Erro ao enviar a mensagem. Tente novamente." });
    } finally {
      setIsLoading(false);
    }

  };

  useEffect(() => {
    const getMessages = async () => {
      const messages = await fetchMessages();
      setMessages(messages);
    };

    getMessages();
  }, []);

  const showMoreMessages = () => {
    setVisibleMessagesCount((prevCount) => prevCount + 5);
  };

  const showLessMessages = () => {
    setVisibleMessagesCount((prevCount) => Math.max(prevCount - 5, 5));
  };

  return (
    <div>
      <h2 className="text-lg py-5">
        Olá, meu querido(a), como vai essa {formattedDate}? Seria excelente
        contar com uma recomendação sua para enriquecer minha jornada. Agradeço
        profundamente! Você é incrível!
      </h2>

      <form
        className="flex flex-col"
        onSubmit={handleSubmit(handleSubmitMessage)}
      >

        <div className="flex flex-col pb-5">
          <label className="text-gray-[#565656] text-base underline pb-2">
            Mensagem
          </label>
          <Controller
            name="message"
            control={control}
            render={({ field: { onChange, value } }) => (
              <textarea
                className="border-2 border-gray-200 p-2 rounded"
                onChange={onChange}
                value={value}
                required
              />
            )}
          />

          {errors.message && <span>Mensagem é obrigatório</span>}
        </div>
        <div className="flex flex-col pb-5">
          <label className="text-gray-[#565656] text-base underline pb-2">
            Relacionamento
          </label>
          <Controller
            name="relationship"
            control={control}
            render={({ field: { onChange, value } }) => (
              <select
                className="border-2 border-gray-200 p-2 rounded bg-transparent"
                onChange={onChange}
                value={value}
                required
              >
                <option value="Supervisor(a) de Matheus">
                  Supervisor(a) de Matheus
                </option>
                <option value="Respondia diretamente a Matheus">
                  Respondia diretamente a Matheus
                </option>
                <option value="Era cliente de Matheus">
                  Era cliente de Matheus
                </option>
                <option value="Era orientador(a) de Matheus">
                  Era orientador(a) de Matheus
                </option>
                <option value="Era colega de trabalho de Matheus">
                  Era colega de trabalho de Matheus
                </option>
                <option value="Outros">Outros</option>
              </select>
            )}
          />

          {errors.relationship && <span>Cargo é obrigatório</span>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition-all
          duration-300 ease-in text-white p-2 mt-2"
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {errors.root && (
        <div className="pt-2">
          <h4 className="text-red-500">{errors.root.message}</h4>
        </div>
      )}

      {successMessage && (
        <div className="pt-2">
          <h4 className="text-green-500">Sua mensagem foi enviada!</h4>
        </div>
      )}


      <div className="border-t-2 border-gray-200 my-10">
        <h2 className="text-base text-[#2e9e26] underline py-4">Recebidas</h2>

        <Messages messages={messages.slice(0, visibleMessagesCount)} />
        {visibleMessagesCount < messages.length && (
          <button
            onClick={showMoreMessages}
            className="text-gray-400 hover:text-gray-700 transition-all duration-300 ease-in-out text-sm font-semibold mt-4"
          >
            Ver Mais
          </button>
        )}
        {visibleMessagesCount > 5 && (
          <button
            onClick={showLessMessages}
            className="text-gray-400 hover:text-gray-700 transition-all duration-300 ease-in-out text-sm font-semibold"
          >
            Ver Menos
          </button>
        )}
      </div>
    </div>
  );
};
