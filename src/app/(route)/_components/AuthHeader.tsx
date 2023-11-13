"use client";

import { FC, memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdHelp, MdSupportAgent } from "react-icons/md";
import { useRouter } from "next/navigation";
import { imgs } from "@/constants/images";
import { ItemPicker } from "@/lib/utils/ItemPicker";

interface AuthHeaderProps {}

const AuthHeader: FC<AuthHeaderProps> = ({}) => {
  const router = useRouter();
  const handleHelpSelection = useCallback((value: string) => {
    switch (value) {
      case "FAQs":
        router.push("faq");
        break;

      default:
        router.push("contact");
        break;
    }
  }, [router]);

  const HELP = ["FAQs", "Contact Us"];

  return (
    <header className="sticky top-0 bg-gradient-to-r from-orange-300 to-orange-50 z-30">
      <nav className="relative h-[5.5rem] pt-5 md:pt-0 flex items-center justify-between max-w-[90%] mx-auto">
        <div className="flex w-full md:justify-center md:items-center">
          <Link href={"/"} className="flex justify-center items-center">
            <div className="w-[10rem] h-[2.5rem] md:w-[14rem] md:h-[3rem] overflow-hidden relative">
              <Image
                src={imgs.afruna_logo}
                alt="logo"
                priority
                fill
                // className="object-contain"
              />
            </div>
          </Link>
        </div>
        <ItemPicker
          leftTriggerIcon={<MdHelp className="text-xl hidden md:block " />}
          contentClassName={
            "bg-white p-4 text-afruna-blue w-40 text-xs z-40 rounded-md"
          }
          triggerClassName={
            "flex gap-1 md:font-bold items-center text-afruna-blue"
          }
          getSelected={handleHelpSelection}
          items={HELP}
          placeholder="Help!"
          extraComponent={
            <button className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2">
              <MdSupportAgent className="text-xl" />
              <span className="text-md">Live Chat</span>
            </button>
          }
        />
      </nav>
    </header>
  );
};

export default memo(AuthHeader);
