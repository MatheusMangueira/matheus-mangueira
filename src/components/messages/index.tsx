"use client";

import { fetchMessages, postMessage, userHasPosted } from "@/util/firestore";
import { loginWithGoogle } from "@/util/googleAuthentication";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Messages } from "./components/Messages";
import { Message } from "./type";
import { sendEmail } from "@/util/email";
import { useTranslations } from "next-intl";

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

  const t = useTranslations('About');


  const handleSubmitMessage = async (data: Message) => {
    const { message, relationship } = data;

    setIsLoading(true);
    setSuccessMessage(false);

    const user = await loginWithGoogle();
    if (!user) {
      console.log("Usuário precisa estar logado para postar uma mensagem.");
      setError('root', { message: t("errorMessage.1") });
      setIsLoading(false);
      return;
    }

    if (await userHasPosted(user.uid)) {
      console.log("Você já fez uma publicação. Apenas uma mensagem por conta é permitida.");
      setError('root', { message: t("errorMessage.2") });
      setIsLoading(false);
      return;
    }

    const messageData = {
      approval: false,
      name: user.displayName,
      message,
      relationship,
      date: formattedDate,
      userId: user.uid,
      photoUrl: user.photoURL,
    };


    try {
      const messageId = await postMessage(messageData);

      reset({ name: "", message: "", });

      await sendEmail
        ({
          commentId: messageId,
          commentUser: user.displayName,
          comment: message,
          date: formattedDate,
        });

      const messages = await fetchMessages();
      setMessages(messages);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 10000);


    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      setError('root', { message: t("errorMessage.3") });
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

  const approvedMessages = messages.filter((msg) => msg.approval);

  return (
    <div>
      <h2 className="text-lg py-5">
        {t("recommendations.description",)}
      </h2>

      <form
        className="flex flex-col"
        onSubmit={handleSubmit(handleSubmitMessage)}
      >

        <div className="flex flex-col pb-5">
          <label className="text-gray-[#565656] text-base underline pb-2">
            {t("message",)}

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

          {errors.message && <span>{t("errorMessage.4")}</span>}
        </div>
        <div className="flex flex-col pb-5">
          <label className="text-gray-[#565656] text-base underline pb-2">
            {t("relationships",)}
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
                <option value={t("relationshipMessage.1",)}
                >
                  {t("relationshipMessage.1",)}
                </option>
                <option value={t("relationshipMessage.2",)}
                >
                  {t("relationshipMessage.2",)}
                </option>
                <option value={t("relationshipMessage.3",)}
                >
                  {t("relationshipMessage.3",)}
                </option>
                <option value={t("relationshipMessage.4",)}
                >
                  {t("relationshipMessage.4",)}
                </option>
                <option value={t("relationshipMessage.5",)}>
                  {t("relationshipMessage.5",)}
                </option>
                <option value="Outros">{t("relationshipMessage.6",)}
                </option>
              </select>
            )}
          />

          {errors.relationship && <span>{t("errorMessage.5")}</span>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition-all
          duration-300 ease-in text-white p-2 mt-2"
        >
          {isLoading ? t("send.2",) : t("send.1",)}
        </button>
      </form>

      {errors.root && (
        <div className="pt-2">
          <h4 className="text-red-500">{errors.root.message}</h4>
        </div>
      )}

      {successMessage && (
        <div className="pt-2">
          <h4 className="text-green-500">
            {t("successMessage",)}
          </h4>
        </div>
      )}


      <div className="border-t-2 border-gray-200 my-10">
        <h2 className="text-base text-[#2e9e26] underline py-4"> {t("received",)}</h2>

        <Messages messages={approvedMessages.slice(0, visibleMessagesCount)} />


        {visibleMessagesCount < approvedMessages.length && (
          <button
            onClick={showMoreMessages}
            className="text-gray-400 hover:text-gray-700 transition-all duration-300 ease-in-out text-sm font-semibold mt-4"
          >
            {t("see.1")}
          </button>
        )}
        {visibleMessagesCount > 5 && (
          <button
            onClick={showLessMessages}
            className="text-gray-400 hover:text-gray-700 transition-all duration-300 ease-in-out text-sm font-semibold"
          >
            {t("see.2")}
          </button>
        )}
      </div>
    </div>
  );
};
