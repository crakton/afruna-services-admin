"use client";

import { ChangeEventHandler, FC, useCallback, useState } from "react";
import {
  SubmitHandler,
  useForm
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Auth from "@/services/auth.service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AuthFormProps {}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormData = z.infer<typeof schema>;

const AuthForm: FC<AuthFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleshowPassword = useCallback(
    () => setShowPassword((prev) => !prev),
    []
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = useCallback((data) => {
    const validatedData = schema.parse(data);
    const authApis = new Auth(router);
    authApis
      .logIn(validatedData, { setIsLoading })
      .then((data) => console.log(data));
  }, [router]);
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setRememberMe(event.target.checked),
    []
  );
  return (
    <>
      <h1 className="w-fit mx-auto pt-8 pb-10 lg:pb-6 text-slate-900 text-2xl font-bold">
        {"User Login"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          `max-w-[90%] w-full flex flex-col items-center mx-auto rounded-2xl shadow-md px-6 py-12 sm:pt-8 lg:pt-16 lg:pb-20 md:p-10
         sm:px-6 lg:p-14 bg-white border-[1px] text-xs gap-2`,
          "sm:max-w-[28rem] lg:max-w-[30rem]"
        )}
      >
        {/* variant === "REGISTER"
            ? "sm:max-w-[28rem] md:max-w-[45rem] lg:max-w-[50rem]"
            : "sm:max-w-[28rem] lg:max-w-[30rem]" */}
        <section className="w-full flex flex-col gap-2 lg:gap-4">
          <aside className="flex flex-col gap-2 md:gap-5 md:flex-row">
            <fieldset className="w-full">
              <label
                htmlFor={"email"}
                className="text-sm font-semibold text-[#232F3E] leading-6"
              >
                {"Your Email"}
              </label>
              <div className={`mt-1 flex justify-center items-center gap-2`}>
                <input
                  id={"email"}
                  type={"email"}
                  placeholder={"don@gmail.com"}
                  autoComplete={"email"}
                  disabled={isLoading}
                  {...register("email", { required: true })}
                  className={`form-input px-2.5 py-1.5 w-full border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] 
              focus-within:shadow-md text-sm font-medium rounded-md placeholder:text-gray-400 
              focus-visible:shadow-md transition duration-300 sm:text-[0.8rem] sm:leading-6`}
                />
              </div>
              {errors.email && (
                <span className="text-rose-500 block text-xs mt-[0.1rem] bg-white rounded-sm w-fit p-1">
                  {errors.email.type === "required"
                    ? "This field is required"
                    : errors.email.type === "minLength"
                    ? "Password must be atleast 6 character"
                    : errors.email.message}
                </span>
              )}
            </fieldset>
          </aside>
          <aside className="flex flex-col gap-1 md:gap-5 md:flex-row">
            <fieldset className="w-full">
              <label
                htmlFor={"password"}
                className="text-sm font-semibold text-[#232F3E] leading-6"
              >
                {"Password"}
              </label>
              <div
                className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                  font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                  transition duration-300 sm:text-sm sm:leading-6 
                  ${isLoading && "opacity-50 cursor-default"}`}
              >
                <input
                  id={"password"}
                  type={showPassword ? "text" : "password"}
                  placeholder={!showPassword ? "*******" : "password"}
                  autoComplete={"password"}
                  disabled={isLoading}
                  {...register("password", { required: true })}
                  className="w-full bg-transparent px-2.5 py-1.5"
                />
                {
                  <div onClick={toggleshowPassword}>
                    {!showPassword ? (
                      <FaEye className="mr-2 text-lg" />
                    ) : (
                      <FaEyeSlash className="mr-2 text-lg" />
                    )}
                  </div>
                }
              </div>
              {errors.password && (
                <span className="text-rose-500 block text-xs mt-[0.1rem] bg-white rounded-sm w-fit p-1">
                  {errors.password.type === "required"
                    ? "This field is required"
                    : errors.password.type === "minLength"
                    ? "Password must be atleast 6 character"
                    : errors.password.message}
                </span>
              )}
            </fieldset>
          </aside>
        </section>

        <fieldset className="flex justify-between items-center mt-2 w-full">
          <div className="flex justify-between items-center">
            <input
              onChange={handleRememberMe}
              checked={rememberMe}
              className="w-4 bg-black  h-4 focus-within:border-slate-400"
              type="checkbox"
              id="remember"
            />
            <label className="ml-2 text-xs font-semibold" htmlFor="remember">
              Remember me
            </label>
          </div>
          <button type="button" className="text-afruna-gold font-semibold">
            Forgot password?
          </button>
        </fieldset>

        <section
          className={`w-full text-xs md:text-sm mx-auto 
        ${"md:w-4/5"}`}
        >
          {/* ${variant === "REGISTER" ? "md:w-3/5 mt-6" : "md:w-4/5"}`} */}

          <Button
            type="submit"
            // !agreed && "cursor-not-allowed"
            variant={"primary"}
            // fullWidth
            // disabled={!agreed && opt.isLoading}
            className={`h-10 font-semibold text-white rounded-md my-6 w-full`}
          >
            {isLoading ? (
              <Loader2 className=" h-6 w-6 animate-spin text-white" />
            ) : (
              "Log in"
            )}
          </Button>
        </section>
      </form>
    </>
  );
};

export default AuthForm;
