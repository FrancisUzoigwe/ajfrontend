import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { ChangePasswordAPI } from "../../apis/AuthApi";

const Forgotpassword = () => {
  const { token } = useParams();
  const [checked, setChecked] = useState<boolean>(false);

  const Schema = yup.object({
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = handleSubmit((data: any) => {
    // const { password } = data;
    ChangePasswordAPI(token, data).then((res: any) => {
      console.log("This is data", data);
      console.log("This is res", res);
      //   navigate("/chat");
    });
  });

  return (
    <div className="w-full h-screen flex justify-center items-center bg-purple-300">
      <form
        className="min-w-[320px] max-h-[400px] bg-white flex items-center flex-col rounded-xl shadow-lg"
        onSubmit={onSubmit}
      >
        <div className="py-[20px]">Change password</div>
        <div className="mt-[25px] relative rounded-md">
          <div className="absolute bg-white px-1 text-[13px] max-sm:text-[10px] max-sm:mt-[-8px] font-semibold ml-[10px] mt-[-10px] ">
            Enter Password:
          </div>
          <div className="min-w-[300px] h-[40px] border flex justify-center items-center rounded-[3px] overflow-hidden">
            <input
              type="text"
              className="w-full h-full outline-none  pl-5 placeholder:text-[13px] text-[13px]"
              {...register("password")}
            />
          </div>
          {errors.password?.message && (
            <div className="text-[11px] text-red-500 flex justify-end items-center mt-[-4px] font-semibold">
              Please provide a valid email address
            </div>
          )}
        </div>

        <div className="min-w-[300px] h-[20px] mt-2 flex items-center px-4">
          <input
            type="checkbox"
            onClick={(e: any) => {
              setChecked(e.target.checked);
            }}
          />
          <div className="text-gray-400 text-[13px] max-sm:text-[10px] ml-3 ">
            Remember me
          </div>
        </div>
        <div></div>
        <div className="mt-3">
          <button
            className={` ${
              checked ? "bg-blue-400" : "bg-gray-300 text-black"
            } transition-all duration-500 px-5 py-[6px] mb-[20px] max-sm:text-[10px] rounded  font-medium text-white`}
            disabled={!checked}
            type="submit"
          >
            Re-set
          </button>
        </div>
        {/* <div className="text-[13px] uppercase mt-1 max-sm:text-[11px]">
          Or Signin with
        </div>
        <div className="flex justify-between items-center min-w-[300px] mt-1 mb-4">
          <div className="min-w-[80px] min-h-[35px]  flex justify-center hover:bg-gray-200 transition-all duration-500 cursor-pointer items-center rounded border">
            <BsFacebook className="text-2xl max-sm:text-lg" />
          </div>
          <div className="min-w-[80px] min-h-[35px] flex justify-center hover:bg-gray-200 transition-all duration-500 cursor-pointer items-center rounded border">
            <FcGoogle className="text-2xl max-sm:text-lg" />
          </div>
          <div className="min-w-[80px] min-h-[35px] flex justify-center hover:bg-gray-200 transition-all duration-500 cursor-pointer items-center rounded border">
            <BsGithub className="text-2xl max-sm:text-lg" />
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default Forgotpassword;
