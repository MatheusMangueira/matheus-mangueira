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
  const [visibleMessagesCount, setVisibleMessagesCount] = useState<number>(10);
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
    <div className="space-y-10">
      <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
        {t("recommendations.description",)}
      </p>

      <form
        className="flex max-w-xl flex-col gap-6"
        onSubmit={handleSubmit(handleSubmitMessage)}
      >

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {t("message",)}
          </label>
          <Controller
            name="message"
            control={control}
            render={({ field: { onChange, value } }) => (
              <textarea
                className="min-h-[140px] resize-y rounded-md border border-border bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground shadow-sm transition-shadow placeholder:text-muted-foreground focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onChange={onChange}
                value={value}
                required
              />
            )}
          />

          {errors.message && (
            <span className="text-sm text-destructive">{t("errorMessage.4")}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {t("relationships",)}
          </label>
          <Controller
            name="relationship"
            control={control}
            render={({ field: { onChange, value } }) => (
              <select
                className="rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-sm focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

          {errors.relationship && (
            <span className="text-sm text-destructive">{t("errorMessage.5")}</span>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex w-fit items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? t("send.2",) : t("send.1",)}
        </button>
      </form>

      {errors.root && (
        <p className="text-sm text-destructive" role="alert">
          {errors.root.message}
        </p>
      )}

      {successMessage && (
        <p className="border-l-2 border-foreground/25 pl-4 text-sm text-muted-foreground">
          {t("successMessage",)}
        </p>
      )}


      <div className="border-t border-border pt-10">
        <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {t("received",)}
        </h3>

        <Messages messages={approvedMessages.slice(0, visibleMessagesCount)} />


        {visibleMessagesCount < approvedMessages.length && (
          <button
            type="button"
            onClick={showMoreMessages}
            className="mt-6 text-sm text-muted-foreground underline decoration-border/60 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/40"
          >
            {t("see.2")}
          </button>
        )}
        {visibleMessagesCount > 5 && (
          <button
            type="button"
            onClick={showLessMessages}
            className="mt-3 block text-sm text-muted-foreground underline decoration-border/60 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/40"
          >
            {t("see.1")}
          </button>
        )}
      </div>
    </div>
  );
};
