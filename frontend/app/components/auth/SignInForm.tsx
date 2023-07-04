'use client'

import React, { FC, useEffect, useState } from 'react';
import Link from "next/link";
import { SiweMessage } from 'siwe';
import { BrowserProvider } from 'ethers';

const domain = window.location.host;
const origin = window.location.origin;

const SignInForm: FC = () => {
    const [ethereumAddress, setEthereumAddress] = useState<string>('');
    const provider = new BrowserProvider(window.ethereum);


    useEffect(() => {

        const getEthereumAddress = async () => {
            provider.send('eth_requestAccounts', [])
            .then((accounts) => {
                const ethereumAddress = accounts[0];
                setEthereumAddress(ethereumAddress)
            })
            .catch(() => console.log('user rejected request'));
        };

        getEthereumAddress();

        window.ethereum.on('accountsChanged', getEthereumAddress);

        return () => {
            window.ethereum.removeListener('accountsChanged', getEthereumAddress);
        };

    }, []);

    async function createSiweMessage(address: string, statement: string) {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}user/nonce`);
        const { nonce } = await res.json();

        const message = new SiweMessage({
          domain,
          address,
          statement,
          uri: origin,
          version: '1',
          chainId: 1,
          nonce,
        });

      
        return message.prepareMessage();
    }
      

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        
        const signer = await provider.getSigner();

        const message = await createSiweMessage(
            await signer.getAddress(),
            'Sign in with Ethereum to the app.'
        );

        const signature = await signer.signMessage(message);

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API}user/signin`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ethereumAddress: ethereumAddress,
                signature: signature,
                message: message
              }),
            });
        
            if (!response.ok) {
              alert('Request failed')
              throw new Error('Request failed');
            }
            
            const {access_token} = await response.json();

            localStorage.setItem("access_token", JSON.stringify(access_token))
            window.location.href="/profile"

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
                        👋 Welcome! Please Sign In!
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={signIn}>
                        <div>
                            <label htmlFor="ethereumAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Ethereum Address</label>
                            <input
                                value={ethereumAddress}
                                onChange={(e) => { setEthereumAddress(e.target.value) }}
                                type="text"
                                disabled
                                id="ethereumAddress"
                                name="ethereumAddress"
                                className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div> 
                                            
                        <button type="submit" disabled={!ethereumAddress || ethereumAddress.trim().length === 0} 
                        className="disabled:cursor-not-allowed disabled:bg-sky-300 w-full text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account? <Link href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
};

export default SignInForm;