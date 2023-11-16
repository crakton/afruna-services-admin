"use client";

import { TbLogout } from "react-icons/tb";
import { RiProfileFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useRoute } from "@/hooks/useRoute";
import Link from "next/link";
import { FC, useCallback, useState } from "react";
import Image from "next/image";
import { imgs } from "@/constants/images";
import { usePathname } from "next/navigation";

interface SideBar {}

const SideBar: FC<SideBar> = ({}) => {
  const accountRoutes = useRoute();
  const pathname = usePathname()

  const [show, setShow] = useState<boolean>(false);
  const [showSubNav, setShowSubNav] = useState<boolean>(false);
  const toggleAccount = useCallback(() => setShow((prev) => !prev), []);
  const toggleSubNav = useCallback(() => setShowSubNav((prev) => !prev), []);

  return (
    <>
      {/* <div className="fixed top-32 left-0 bottom-0">ghsdjsdjhjhhjhj</div> */}
      <aside className="hidden sm:block z-10 fixed top-20 left-0 bottom-2">
        <div className="flex flex-col gap-12 justify-between h-full w-full overflow-y-auto">
          <div className="w-full h-full bg-[#F4F5FF] my-2 ml-2 mr-4 rounded-lg max-w-[11rem] px-1 pt-3 flex flex-col gap-2">
            {accountRoutes.map(
              ({ active, href, title, icon: Icon, hasSubNav }) => {
                const subNav = [
                  {
                    title: "Listed Services",
                    href: "/services",
                  },
                  {
                    title: "Category",
                    href: "/category",
                  },
                ];
                return (
                  <>
                    {hasSubNav ? (
                      <div className="flex flex-col justify-start">
                        <button
                          onClick={toggleSubNav}
                          className={`${
                            active
                              ? "text-slate-950 font-extrabold bg-slate-300 "
                              : ""
                          } w-full relative group py-2 pl-6 overflow-hidden rounded-md flex justify-between items-center font-medium text-sm text-[#A7B7DD] hover:text-slate-950 hover:font-extrabold hover:bg-slate-300 transition duration-300`}
                        >
                          <div className="flex justify-start gap-3 items-center ">
                            <Icon className="text-lg" />
                            <span className="xs:hidden md:inline-block text-xs">
                              {title}
                            </span>
                          </div>
                          <div
                            className={`${
                              active ? "opacity-100" : ""
                            } absolute -right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          />
                        </button>
                        {showSubNav && (
                          <div className="flex flex-col gap-[0.3rem] pt-2 pb-1">
                            {subNav.map(({ href, title }) => {
                              return (
                                <Link
                                  href={href}
                                  className={` ${
                                    pathname === href
                                      ? "text-blue-400 font-extrabold"
                                      : ""
                                  }  text-[0.69rem] pl-[3.5rem]`}
                                >
                                  {title}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={title}
                        className={`${
                          active
                            ? "text-slate-950 font-extrabold bg-slate-300 "
                            : ""
                        } w-full relative group py-2 pl-6 overflow-hidden rounded-md flex justify-between items-center font-medium text-sm text-[#A7B7DD] hover:text-slate-950 hover:font-extrabold hover:bg-slate-300 transition duration-300`}
                        href={href}
                      >
                        <div className="flex justify-start gap-3 items-center ">
                          <Icon className="text-lg" />
                          <span className="xs:hidden md:inline-block text-[0.8rem]">
                            {title}
                          </span>
                        </div>
                        <div
                          className={`${
                            active ? "opacity-100" : ""
                          } absolute -right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                      </Link>
                    )}
                  </>
                );
              }
            )}
            <Button
              className={`w-full relative group rounded-md h-8 pl-6 overflow-hidden gap-2 flex justify-start items-center font-medium text-xs text-[#A7B7DD] hover:text-slate-950 hover:font-extrabold bg-[#F4F5FF] hover:bg-slate-300 transition duration-300`}
            >
              <TbLogout className="text-xl" />
              Log out
              <div
                className={`absolute -right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </Button>
          </div>
          <div className="w-full bg-[#F4F5FF] ml-2 mr-4 max-w-[11rem] px-4 flex flex-col gap-3">
            <Link href={""}>
              <div className="w-[6rem] h-[1.3rem] overflow-hidden relative">
                <Image src={imgs.sidebarimg} alt="provider" priority fill />
              </div>
            </Link>
            <Link href={""} className="text-xs text-[#B9B9B9]">
              Terms & Services Privacy Policy
            </Link>
          </div>
        </div>
      </aside>

      <button
        onClick={toggleAccount}
        className=" sm:hidden absolute cursor-pointer top-24 right-5 text-afuna-blue flex justify-between items-center"
      >
        <RiProfileFill className="w-5 h-5 rounded-full" />
      </button>

      <div
        className={`md:hidden absolute z-10 top-40 left-[0.35rem] transition duration-500" flex-col w-fit gap-2  ${
          show
            ? "block translate-x-0 transition duration-500"
            : "block transform -translate-x-[6rem] transition duration-500"
        }`}
      >
        <main className="flex bg-white rounded-xl p-2 flex-col gap-1 w-full ">
          {accountRoutes.map(({ active, href, title, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${
                active ? "bg-[#FFF9F2]" : "bg-white"
              } flex justify-center hover:bg-[#FFF9F2] rounded-md font-medium hover:font-semibold hover:scale-105 transition-all duration-500 text-sm text-[#0C0E3B] p-2 items-center gap-2`}
            >
              <Icon className="text-lg" />
              <span className="sr-only">{title}</span>
            </Link>
          ))}
          <div className="border-b mt-2 border-slate-300 w-full h-[2px]" />
          <Button
            variant={"primary"}
            // onClick={handleLogOut}
            className="flex mt-2 text-white hover:bg-[#FFF9F2] rounded-md hover:scale-105 transition-all duration-300 text-sm p-1 justify-center items-center gap-2"
          >
            <TbLogout className="text-xl" />
            <span className="sr-only">Log out</span>
          </Button>
        </main>
      </div>
    </>
  );
};

export default SideBar;
