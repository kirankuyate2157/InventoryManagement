import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ setType }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nav = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!data.firstName) newErrors.firstName = "First name is required";
    if (!data.lastName) newErrors.lastName = "Last name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";
    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      for (const key in validationErrors) {
        toast.error(validationErrors[key]);
        break;
      }
      return;
    }

    try {
      console.log("user : ", data);
      const res = await axios.post("/users/register", data);
      if (res) {
        
        nav("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='h-full flex flex-col gap-3'>
      <div className='flex justify-end py-1'>
        <button
          onClick={() => setType("login")}
          className='border p-1 px-3 border-slate-800 text-slate-600 rounded'
        >
          SIGN IN
        </button>
      </div>
      <form className='w-full h-full flex flex-col justify-center gap-6'>
        <div className='text-slate-600 flex flex-col items-start justify-start'>
          <h1 className=' font-semibold text-[1.7rem] sm:text-3xl'>
            Join Our Platform
          </h1>
          <p className='font-semibold text-sm'>
            Seamlessly Connect, Securely Manage – Join Us Today!.
          </p>
        </div>
        <div>
          <div className=' w-full flex flex-col sm:flex-row sm:gap-4'>
            <div className='w-full flex flex-col items-start py-1.5 sm:py-3'>
              <input
                type='text'
                name='firstName'
                className='border-solid rounded-md border border-gray-300 w-[100%] p-2'
                placeholder='First Name'
                onChange={handleChange}
                value={data.firstName}
                required
              />
            </div>
            <div className='w-full flex flex-col items-start py-1.5 sm:py-3'>
              <input
                type='text'
                name='lastName'
                className='border-solid rounded-md border border-gray-300 w-[100%] p-2'
                placeholder='Last Name'
                onChange={handleChange}
                value={data.lastName}
                required
              />
            </div>
          </div>
          <div className='flex flex-col items-start py-1.5 sm:py-3'>
            <input
              type='text'
              name='email'
              className='border-solid rounded-md border border-gray-300 w-[100%] p-2'
              placeholder='Email'
              onChange={handleChange}
              value={data.email}
              required
            />
          </div>
          <div className='flex flex-col items-start py-1.5 sm:py-3'>
            <div className='border-solid rounded-md border items-center border-gray-300 w-[100%] p-2 flex'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                className='w-full outline-none'
                placeholder='Password'
                onChange={handleChange}
                value={data.password}
                required
              />
              {showPassword ? (
                <IoEyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <IoEye onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
          <div className='flex flex-col items-start py-1.5 sm:py-3'>
            <div className='border-solid rounded-md border items-center border-gray-300 w-[100%] p-2 flex'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                className='w-full outline-none'
                placeholder='Confirm Password'
                onChange={handleChange}
                value={data.confirmPassword}
                required
              />
              {showConfirmPassword ? (
                <IoEyeOff onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <IoEye onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>{" "}
          </div>
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='w-full text-white font-semibold bg-slate-600 p-2 rounded-sm'
        >
          GET STARTED
        </button>
      </form>
    </div>
  );
};

export default Signup;
