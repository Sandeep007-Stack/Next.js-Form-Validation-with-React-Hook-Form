"use client"
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// Form Input Interface 
interface UserFormInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function Home() {

  // Form Handler Function 
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<UserFormInput>();

  // Form Submit Handler Function 
  const onSubmit:SubmitHandler<UserFormInput> = (data:any) => setDisplayFormData(data)

  // Display Form Data Function
  const [displayFormData, setDisplayFormData] = useState<UserFormInput>()


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white p-5 rounded-2xl w-5/12 shadow-xl">
        <h2 className="text-2xl">Form</h2>

        {/* Form Start */}
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-4">
          {/* First Name & Last Name */}
          <div className="gap-3 grid grid-cols-2">
            <div className="mb-3">
              <label className="w-full">First Name:</label>
              <div className="w-full mt-2">
                <input type="text" placeholder="First Name" {...register("first_name", { required: true })} className="border w-full border-gray-300 rounded-md py-2 px-3 hover:border-gray-700" />
              </div>
              {errors.first_name && <p className="text-red-500 text-xs">First Name is required</p>}
            </div>
            <div className="mb-3">
              <label className="w-full">Last Name:</label>
              <div className="w-full mt-2">
                <input type="text" placeholder="Last Name" {...register("last_name", { required: true })} className="border w-full border-gray-300 rounded-md py-2 px-3 hover:border-gray-700" />
              </div>
              {errors.last_name && <p className="text-red-500 text-xs">Last Name is required</p>}
            </div>
          </div>
          
          {/* Email */}
          <div className="mb-3">
            <label className="w-full">Email:</label>
            <div className="w-full mt-2">
              <input type="email" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} className="w-full border border-gray-300 rounded-md py-2 px-3 hover:border-gray-700" />
            </div>
            {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
          </div>

          {/* Password & Confirm Password */}
          <div className="gap-3 grid grid-cols-2">
            <div className="mb-3">
              <label className="w-full">Password:</label>
              <div className="w-full mt-2">
                <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 6, maxLength: 20 })} className="border w-full border-gray-300 rounded-md py-2 px-3 hover:border-gray-700" />
              </div>
              {errors.password && <p className="text-red-500 text-xs">Password is required. Password must be between 6 and 20 characters</p>}
            </div>
            <div className="mb-3">
              <label className="w-full">Confirm Password:</label>
              <div className="w-full mt-2">
                <input type="password" placeholder="Confirm Password" {...register("confirm_password", {required: true, validate:(value)=> {
                  const { password } = getValues();
                  return value === password || "The passwords do not match";
                } })} className="border w-full border-gray-300 rounded-md py-2 px-3 hover:border-gray-700" />
              </div>
              {errors.confirm_password && <p className="text-red-500 text-xs">{errors.confirm_password.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-3">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
          </div>

        </div>
        </form>

        {/* Form Data */}
        <div className='mt-5'>
            <pre>{JSON.stringify(displayFormData, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
