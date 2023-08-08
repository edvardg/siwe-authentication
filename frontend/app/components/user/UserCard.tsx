'use client'

import React, { FC, useEffect, useState } from 'react';
import Image from "next/image";

const UserCard: FC = () => {
    const [userInfo, setUserInfo] = useState<{ value: string }>({ value: '' });

    const getUserInformation = async () => {
        const tokenString = localStorage.getItem("access_token");
        const token = tokenString ? JSON.parse(tokenString) : null;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        const userInfo = await res.json();
        setUserInfo(userInfo)
    }

    useEffect(() => {
        getUserInformation()
    }, [])

    return (
        userInfo ? <section className="pt-16 bg-blueGray-50">
            <div className="w-full  lg:w-4/12 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded-lg mt-16">
                    <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                            <Image src={`https://api.multiavatar.com/${userInfo && userInfo.ethereumAddress}.png`} width={100} height={100} alt="User Avatar" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        {userInfo.username}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        {userInfo.ethereumAddress}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section> : "Loading data. Please be patient!"
    );
};

export default UserCard;