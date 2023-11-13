import { FC, ReactNode } from "react";
import MainHeader from "./(routes)/_components/MainHeader";
import SideBar from "./(routes)/_components/SideBar ";

interface layoutProps {
  children: ReactNode;
  //   ReactElement
}

const RoutesLayout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <MainHeader />
      <div className=" min-h-full h-full flex w-full bg-[#F7F7FF]">
        <SideBar />
        <main className=" sm:ml-[11rem] w-full">{children}</main>
      </div>
    </div>
  );
};

export default RoutesLayout;
