"use client";

import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Messages } from "./components/Messages";
import { useState } from "react";

type Message = {
  name: string;
  message: string;
  relationship: string;
  date?: string;
};

export const Recommendations = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Message>({
    defaultValues: {
      name: "",
      message: "",
      relationship: "Supervisor(a) de Matheus",
    },
  });

  const [messages, setMessages] = useState<Message[]>([]);

  const date = new Date();
  const options: any = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("pt-BR", options);

  const handleSubmitMessage = (data: Message) => {
    const { name, message, relationship } = data;

    setMessages((prev) => [{ name, message, relationship }]);

    reset({
      name: "",
      message: "",
    });
  };
  console.log(messages);

  return (
    <div className="">
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
            Nome
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <input
                type="text"
                className="border-2 border-gray-200 p-2 rounded"
                onChange={onChange}
                value={value}
                required
              />
            )}
          />

          {errors.name && <span>Nome é obrigatório</span>}
        </div>

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

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 transition-all
          duration-300 ease-in text-white p-2 mt-2">
          Enviar
        </button>
      </form>

      <div className="border-t-2 border-gray-200 my-10">
        <h2 className="text-base text-[#2e9e26] underline py-4">
          Recebidas
        </h2>

        {messages.map((item, index) => (
          <Messages
            key={index}
            date={formattedDate}
            message={item.message}
            name={item.name}
            relationship={item.relationship}
          />
        ))}
      </div>
    </div>
  );
};
