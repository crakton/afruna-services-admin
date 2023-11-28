"use client";

import { FC, memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdChat,
  MdHelp,
  MdMenu,
  MdOutlineLogout,
  MdOutlineQrCodeScanner,
  MdSearch,
  MdShoppingCart,
  MdSupportAgent,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoIosNotifications, IoMdMenu } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { imgs } from "@/constants/images";
import { FaUser } from "react-icons/fa";
import { BsFillChatLeftTextFill, BsHeartFill } from "react-icons/bs";
import { ItemPicker } from "@/lib/utils/ItemPicker";
import { AiFillAccountBook } from "react-icons/ai";

interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = ({}) => {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);
  const [selectedcategory, setselectedCategory] = useState("");

  const router = useRouter();

  const toggleCategoryMenu = useCallback(
    () => setIsCategoryMenuOpen(!isCategoryMenuOpen),
    [isCategoryMenuOpen]
  );

  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleCategoriesMenu = useCallback(
    () => setIsShow((prev) => !prev),
    []
  );

  const handleHelpSelection = useCallback((value: string) => {
    //   switch (value) {
    //     case HELP[0]:
    //       router.push("/faq");
    //       break;
    //     default:
    //       router.push("contact");
    //       break;
    //   }
  }, []);

  const handleLogOut = useCallback(() => {
    //   const authService = new Auth10(router);
    //   authService.handleLogout();
  }, []);
  const [show, setShow] = useState<boolean>(true);
  return (
    <header className="sticky top-0 bg-gradient-to-r from-orange-300 to-orange-50 z-30">
      <nav className="max-w-[97%] md:max-w-[95%] w-full flex justify-between items-center mx-auto p-6 lg:max-w-[90%]">
        <div className="flex justify-between items-center gap-2 md:gap-0 sm:max-w-[60%] sm:w-full md:w-fit">
          {!sideNavOpen ? (
            <IoMdMenu
              onClick={() => setSideNavOpen(true)}
              className="block md:hidden text-2xl sm:text-3xl cursor-pointer text-afruna-blue"
            />
          ) : (
            <RxCross2
              onClick={() => setSideNavOpen(false)}
              className="block md:hidden text-2xl sm:text-3xl cursor-pointer text-afruna-blue"
            />
          )}
          <Link href={"/"} className="flex justify-center items-center">
            <div className="w-[9rem] sm:w-[10rem] h-[2rem] md:w-[12rem] md:h-[2.5rem] lg:w-[13rem] lg:h-[3rem] overflow-hidden relative">
              <Image src={imgs.afruna_logo} alt="logo" priority fill />
            </div>
          </Link>
        </div>

        <div className="flex justify-center items-center gap-2 lg:gap-3">
          <Link href={"/"} className="relative">
            <IoIosNotifications className="text-[1.4rem] sm:text-[1.6rem]" />
            <span className="absolute top-0 right-0 text-white bg-rose-400 w-[0.75rem] h-[0.75rem] sm:w-[0.8rem] sm:h-[0.8rem] text-[8px] rounded-full flex justify-center items-center">
              {" "}
              3
            </span>
          </Link>
          <ItemPicker
            mobileClassName="hidden md:flex lg:hidden xl:flex text-sm lg:text-base"
            triggerClassName="flex gap-4 items-center"
            contentClassName={
              "bg-white p-4 text-afruna-blue w-40 text-xs z-30 rounded-md"
            }
            getSelected={(val) => console.log(val)}
            leftTriggerIcon={
              <div className=" relative bg-afruna-blue/60 ring-4 ring-slate-300 w-[1.6rem] h-[1.6rem] object-contain md:w-8 md:h-8 lg:w-10 lg:h-10  rounded-full transition-all hover:scale-90 ease-in-out duration-300 overflow-hidden flex justify-center items-center">
                <Image
                  src={imgs.afruna_2nd_logo}
                  alt="Image"
                  priority
                  className=" w-full "
                />
              </div>
            }
            placeholder={`Admin`}
            profileLinks={[
              {
                name: "Profile",
                href: "/profile",
                icon: <FaUser />,
              },
              {
                name: "Chat",
                icon: <MdChat />,
                href: "/chat",
              },
            ]}
            extraComponent={
              <button
                onClick={handleLogOut}
                className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2"
              >
                <MdOutlineLogout className="text-lg" />
                <span className="text-md">Log out</span>
              </button>
            }
          />
        </div>
      </nav>
    </header>
  );
};

export default memo(MainHeader);

// images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
