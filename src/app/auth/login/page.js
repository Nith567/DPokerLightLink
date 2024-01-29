"use client";

// import {useForm} from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import {signIn} from "next-auth/react";
// import { useRouter } from 'next/navigation';



// const Login = () => {
//     const router = useRouter();
//     const {setError, reset, register, handleSubmit, formState: {errors}} = useForm({

//     });

//     // const handleFormSubmit = async data => {
//     //     signIn('credentials', {
//     //         email: data.email,
//     //         password: data.password,
//     //         redirect: false,
//     //         callbackUrl: '/'
//     //     }).then((res) => {
//     //         if(res?.error) {
//     //             setError('email', {message: "Something went wrong.", type: "error"})
//     //         } else {
//     //             router.push('/');
//     //         }
//     //     })
//     // }
//     const handleFormSubmit = async data => {
//         signIn('credentials', {
//             email: data.email,
//             password: data.password,
//             redirect: false,
//             callbackUrl: '/'
//         }).then((res) => {
//             if (res?.error) {
//                 if (res.error === 'CredentialsSignin') {
//                     setError('email', { message: "Invalid email or password", type: "error" });
//                 } else if (res.error === 'EmailNotFound') {
//                     setError('email', { message: "Email not found", type: "error" });
//                 } else if (res.error === 'PasswordMismatch') {
//                     setError('password', { message: "Incorrect password", type: "error" });
//                 } else {
//                     setError('email', { message: `Error: ${res.error}`, type: "error" });
//                 }
//             } else {
//                 router.push('/');
//             }
//         });
//     }
    
//     return (
//         <>
//             <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
//                 <div className="mb-2">
//                     <label htmlFor="email"
//                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                     <input type="email" id="email"
//                             {...register('email')}
//                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//                     {errors['email'] ? (
//                             <div className='text-sm text-red-500'>{errors['email'].message}</div>
//                         ) : null}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="password"
//                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                     <input type="password" id="password"
//                             {...register('password')}
//                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//                     {errors['password'] ? (
//                             <div className='text-sm text-red-500'>{errors['password'].message}</div>
//                         ) : null}
//                 </div>
//                 <button type="submit"
//                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login
//                 </button>
//             </form>
//         </>
//     );
// }
// export default Login;

import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const { setError, register, handleSubmit, formState: { errors } } = useForm();

    const handleFormSubmit = async data => {
        signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: '/'
        }).then((res) => {
            if (res?.error) {
                // Handle specific errors if needed
                setError('email', { message: "Invalid email or password", type: "error" });
            } else {
                router.push('/');
            }
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors['email'] ? (
                        <div className='text-sm text-red-500'>{errors['email'].message}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors['password'] ? (
                        <div className='text-sm text-red-500'>{errors['password'].message}</div>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Login
                </button>
            </form>
        </>
    );
}

export default Login;
