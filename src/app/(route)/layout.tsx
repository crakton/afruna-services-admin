import { FC, ReactNode } from "react";
import AuthHeader from "./_components/AuthHeader";

interface layoutProps {
  children: ReactNode;
  //   ReactElement
}

const AuthLayout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col h-full">
      <AuthHeader />
      <div className="auth-bg min-h-screen h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
