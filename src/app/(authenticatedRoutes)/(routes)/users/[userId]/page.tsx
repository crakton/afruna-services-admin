import CustomerBookingDetailsTable from "@/components/CustomerBookingDetailsTable";
import { Button } from "@/components/ui/button";
import { imgs } from "@/constants/images";
import Image from "next/image";
import { FC } from "react";

interface pageProps {
  params: {
    userId: string;
  };
}

const page: FC<pageProps> = ({ params: { userId } }) => {
  console.log(userId);

  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl lg:pl-0  leading-3 text-afruna-blue font-bold">
          Customers Details
        </h1>
      </div>
      <div className="flex flex-col justify-start gap-2 px-4 md:px-10 xl:pr-32 w-full">
        <div className="w-[6rem] h-[6rem] overflow-hidden relative rounded-full">
          <Image src={imgs.provider3} alt="provider" priority fill />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 w-full">
          <div className="flex flex-col gap-2 text-[#7C7C7C] text-xs font-semibold">
            <h2 className="text-lg text-afruna-blue">Edward Diana</h2>
            <span className=" ">Joined since 22 May, 2022</span>
            <span className=" ">Biningora, Nigeria</span>
            <span className=" ">daina@fashion.com</span>
            <div className="flex flex-col ">
              <span className="text-sm text-black">0</span>
              <p className="">Following</p>
            </div>
          </div>
          <Button variant={"afrunaOutline"} className="text-xs">
            Remove User
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-start px-4 md:px-10 xl:pr-32 ">
        <div className="flex justify-start items-start gap-2">
          <div className="border w-[13rem] py-7 pl-7 border-[#D5D5E6] rounded-xl bg-white flex flex-col gap-2">
            <span className="text-sm font-bold">#3253</span>
            <span className="text-sm font-bold">Total spent</span>
          </div>
          <div className="border w-[13rem] py-7 pl-7 border-[#D5D5E6] rounded-xl bg-white flex flex-col gap-2">
            <span className="text-sm font-bold">03</span>
            <span className="text-sm font-bold">Total booked</span>
          </div>
        </div>
        <CustomerBookingDetailsTable/>
      </div>
    </section>
  );
};

export default page;
