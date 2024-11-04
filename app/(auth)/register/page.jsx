"use client";
import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Registerpage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("/api/auth/register", data);
      toast.success(res.data.message || "User created successfully");
      // Redirect to login page after successful registration
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "User already exists");
    }
  };
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col items-center gap-3 bg-purple-600 p-3 rounded-lg "
        >
          <input
            {...register("username")}
            placeholder="Username"
            required
            className="p-3 rounded"
          />
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            required
            className="p-3 rounded"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            required
            className="p-3 rounded"
          />
          <button type="submit" className="bg-pink-500 text-white p-4 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registerpage;
