'use client'

import React, { FC, useEffect, useState  } from 'react';
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BrowserProvider } from 'ethers';
import { useRouter } from 'next/navigation';
import { createSiweMessageAndSign, getSignerAddress } from "@/app/components/auth/SiweHelper";

const provider = new BrowserProvider(window.ethereum);

const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
});


interface FormValues {
    username: string;
}

const initialValues: FormValues = {
    username: ''
};

const SignUpForm: FC = () => {

    const { push } = useRouter();
    const [ethereumAddress, setEthereumAddress] = useState<string>('');

    useEffect(() => {
        
        const getEthereumAddress = async () => {
            provider.send('eth_requestAccounts', [])
            .then(async () => {
                setEthereumAddress(await getSignerAddress(provider));
            })
            .catch(() => console.log('user rejected request'));
        };
    
        getEthereumAddress();

        window.ethereum.on('accountsChanged', getEthereumAddress);

        return () => {
            window.ethereum.removeListener('accountsChanged', getEthereumAddress);
        };

    }, []);

    const handleSubmit = async (values: FormValues) => {
        const { message, signature } = await createSiweMessageAndSign(provider, 'Sign up with Ethereum in the app.');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}user/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: values.username,
                ethereumAddress: ethereumAddress,
                signature: signature,
                message: message
              }),
            });
        
            if (!response.ok) {
              alert('Request failed')
              throw new Error('Request failed');
            }
            
            const responseData = await response.json();
            localStorage.setItem("user", JSON.stringify(responseData))
            push('/sign-in');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            👋 Welcome! Please Sign Up!
                        </h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <Field type="text" id="username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <ErrorMessage name="username" component="div" className="text-red-900" />
                                </div>
                                <div>
                                    <label htmlFor="ethereum-address" className="curblock mb-2 text-sm font-medium text-gray-900 dark:text-white">Ethereum Address</label>
                                    <input value={ethereumAddress}  type="text" id="ethereumAddress" disabled name="ethereumAddress" className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                
                                <button type="submit" className="w-full text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                                
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link href="/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                                </p>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUpForm;
