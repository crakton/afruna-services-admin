"use client";

import { FC, useCallback, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
// import { UsersList } from "../_components/UsersList";
import { useRouter } from "next/navigation";
import { users } from "@/constants/data";
import { UsersList } from "@/components/UsersList";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdMessage } from "react-icons/md";

interface pageProps {}

const ChatPage: FC<pageProps> = ({}) => {
  const router = useRouter();
  const handleSelectedChat = useCallback(
    (conversationId: string) => {
      router.push(`/chat/${conversationId}`);
    },
    [router]
  );
  
	const [isOpen, setIsopen] = useState(false);
	const onClose = useCallback(() => setIsopen(false), []);
  return (
    <section className="flex flex-col gap-4 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl lg:text-2xl leading-3 text-afruna-blue font-bold">
          Chat
        </h1>
      </div>
      <div className="flex gap-4 max-w-[96%] w-full mx-auto">
        <div className="relative flex gap-2 flex-col bg-[#FDFDFF] h-full w-full max-h-[74vh] max-w-[100%] md:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] xl:max-h-[75vh] overflow-hidden border border-[#D5D5E6] rounded-2xl pt-6 xl:pl-2">
          <h2 className="ml-4 text-[1.2rem] text-[#0C0E3B] font-medium tracking-normal">
            Messages
          </h2>
          <div className="ml-4 mr-6 bg-white flex items-center border border-[#D5D5E6] rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search Name, Id..."
              className="w-full p-2 focus:outline-none placeholder:text-[#D2D2D2]"
            />
            <div className="w-14 text-[#D2D2D2]">
              <IoSearchOutline className="text-2xl" />
            </div>
          </div>
          <div className=" mt-1 pt-1 h-[63vh] sm:h-[55vh] text-xl rounded-lg overflow-hidden overflow-y-auto">
            <div className="flex flex-col gap-2 p-4 ">
              {users && users.length
                ? users.map((convo) => {
                    return (
                      <UsersList
                        selectChat={() => handleSelectedChat(convo.id)}
                        key={convo.id}
                        name={convo.name}
                        number={convo.number}
                        active={convo.active}
                        img={convo.img}
                        id={convo.id}
                      />
                    );
                  })
                : null}
            </div>
          </div>
          <div className="absolute right-4 bottom-8">
            <button className="w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-full bg-orange-400 hover:bg-orange-500 hover:scale-105 transition-all duration-300">
              <BiSolidMessageSquareDetail className="text-white md:text-xl font-extrabold" />
            </button>
          </div>
        </div>
        <div className="hidden md:block h-[73vh] border border-[#D5D5E6] overflow-hidden sm:mr-2 xl:mr-16 w-full rounded-2xl">
          <EmptyState />
        </div>
      </div>
    </section>
  );
};

export default ChatPage;

// const ShowModal: FC<{ children: ReactNode; cancelModel: () => void }> = memo(
// 	({ children, cancelModel }) => (
// 		<div
// 			onClick={cancelModel}
// 			className={
// 				"absolute cursor-pointer grid place-items-center z-20 left-0 top-0 w-screen h-screen bg-black/50 py-10"
// 			}
// 		>
// 			{children}
// 		</div>
// 	)
// );
// {isOpen ? (
//   <ShowModal cancelModel={onClose}>
//     <div
//       className="bg-white relative h-[90vh] rounded-lg w-[300px] md:w-[500px] z-30 overflow-y-auto flex flex-col text-start p-10"
//       role="buyer div"
//     >
//       <button
//         className="place-self-end"
//         onClick={onClose}
//         type="button"
//       >
//         <FaTimes />
//       </button>

//       <Select.Root
//         onValueChange={(val) =>
//           setSelectedBuyer(val as unknown as IUsers)
//         }
//       >
//         <Select.Trigger
//           className={classNames(
//             "w-full py-2 px-3 bg-white focus:bg-white text-sm text-[#777777] border border-slate-300 flex justify-between items-center rounded-lg"
//           )}
//         >
//           <Select.Value placeholder={"Select Vendor"} />
//           <Select.Icon className="SelectIcon">
//             <RxChevronDown className="w-5 h-5 text-black font-extrabold" />
//           </Select.Icon>
//         </Select.Trigger>
//         <Select.Portal>
//           <Select.Content
//             className="relative h-[40vh] overflow-y-auto w-full bg-white z-30"
//             position="popper"
//           >
//             <Select.Viewport className="relative bg-white z-30">
//               {vendors?.map((vendor) => {
//                 return (
//                   <SelectItem
//                     onClick={() =>
//                       setSelectedBuyer(vendor)
//                     }
//                     key={vendor._id}
//                     value={
//                       vendor as unknown as string
//                     }
//                   >
//                     {vendor.firstName}{" "}
//                     {vendor.lastName}
//                   </SelectItem>
//                 );
//               })}
//             </Select.Viewport>
//           </Select.Content>
//         </Select.Portal>
//       </Select.Root>

//       <fieldset>
//         <label
//           className="text-md font-medium"
//           htmlFor="first-name"
//         >
//           First Name
//         </label>
//         <input
//           disabled={true}
//           id="first-name"
//           type="text"
//           name="first-name"
//           value={selectedVendor?.firstName ?? "Nill"}
//           className="w-full placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
//         />
//       </fieldset>
//       <fieldset>
//         <label
//           className="text-md font-medium"
//           htmlFor="last-name"
//         >
//           Last Name
//         </label>
//         <input
//           disabled={true}
//           id="last-name"
//           type="text"
//           name="last-name"
//           value={selectedVendor?.lastName ?? "Nill"}
//           className="w-full placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
//         />
//       </fieldset>

//       <fieldset>
//         <label
//           className="text-md font-medium"
//           htmlFor="user-email"
//         >
//           Email
//         </label>
//         <input
//           disabled={true}
//           id="user-email"
//           type="email"
//           value={selectedVendor?.email ?? "Nill"}
//           placeholder="Enter user's name"
//           className="w-full placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
//         />
//       </fieldset>

//       {/* 	<fieldset>
//         <label
//           className="text-md font-medium"
//           htmlFor="phone-no"
//         >
//           Phone Number
//         </label>
//         <input
//           disabled={true}
//           data-phone-no="phone-no"
//           id="phone-no"
//           type="number"
//           max={11}
//           maxLength={11}
//           name="phone-no"
//           value={phone ?? 0}
//           className="w-full data-[phone-no=phone-no]:textfield appearance-none placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
//         />
//       </fieldset> */}

//       <div className="space-x-4 place-self-end mt-10 ">
//         <button
//           onClick={onClose}
//           className="p-3 rounded-sm text-sm text-red-500 bg-white"
//         >
//           <span className="ml-2">Cancel</span>
//         </button>
//         <button
//           onClick={handleAddUser}
//           className="p-3 rounded-sm text-sm text-white bg-green-600"
//         >
//           <span className="ml-2">Add User</span>
//         </button>
//       </div>
//     </div>
//   </ShowModal>
// ) : null}