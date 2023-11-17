"use client";

import { RootState } from "@/redux/store";
import ChatService from "@/services/chat.service";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoPaperPlane } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { useSelector } from "react-redux";

interface MessageInput {
  message: string;
}

interface CoversationFooterProps {}

export const CoversationFooter: FC<CoversationFooterProps> = ({}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<MessageInput>();

  const chatApis = new ChatService();

  const userTOChatId = useSelector(
    (state: RootState) => state.chat.userTOChatId
  );
  const onSubmit: SubmitHandler<MessageInput> = (data) => {
    if (isValid && userTOChatId) {
      chatApis
        .sendingMessage({
          to: userTOChatId,
          message: data.message,
        })
        .then((data) => console.log(data));
      setValue("message", "", { shouldValidate: true });
    }
    return;
  };

  const handleUpload = (data: any) => {
    // axios.post("/api/message", {
    // 	image: data,
    // 	conversationId,
    // });
  };

  return (
    <div className="pt-1 pb-4 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ml-2 mr-4 bg-white flex  items-center relative border border-[#D5D5E6] rounded-xl overflow-hidden"
      >
        <input
          id="message"
          type="text"
          autoComplete="message"
          placeholder="Message..."
          {...register("message", {
            required: true,
          })}
          className="w-full p-3 pr-1 font-semibold text-gray-600 text-xs focus:outline-none placeholder:text-[#DBDBDB]"
        />
        <div onClick={handleUpload} className=" min-w-[6rem] xl:min-w-[8rem]">
          <MdAttachFile
            size={37}
            className="text-[#0C0E3B] hover:scale-90 transition duration-300 p-2 cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="w-28 h-28 flex justify-start items-end p-4 absolute rounded-full -bottom-2 -right-12 bg-[#00AEEF]"
        >
          <IoPaperPlane
            size={30}
            className="text-white hover:scale-90 transition duration-300 cursor-pointer"
          />
        </button>
      </form>
    </div>
  );
};
