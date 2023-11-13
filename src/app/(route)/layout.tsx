import { FC, ReactNode } from "react";
import AuthHeader from "./_components/AuthHeader";

interface layoutProps {
  children: ReactNode;
  //   ReactElement
}

const AuthLayout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <AuthHeader />
      <div className="auth-bg min-h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
