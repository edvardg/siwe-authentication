'use client'
import React, { FC, useEffect, useState  } from 'react';
import Link from "next/link";
const Header: FC = () => {
    const [accessTokenExists, setAccessTokenExists] = useState(false);
    useEffect(() => {
        const token = window.localStorage.getItem('access_token');
        setAccessTokenExists(!!token);
    }, []);
    const logout = () => {
        window.localStorage.clear();
        window.location.href="/";
    }
    return (
        <div className="bg-gray-200">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">

                </div>
                {
                    accessTokenExists  ? <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <div onClick={logout}  className="cursor-pointer     text-sm font-semibold leading-6 text-gray-900">Logout</div>
                    </div> : <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link href="sign-in" className="text-sm font-semibold leading-6 text-gray-900 mr-[10px]">Sign In<span aria-hidden="true"></span></Link>
                        <Link href="sign-up" className="text-sm font-semibold leading-6 text-gray-900">Sign Up<span aria-hidden="true"></span></Link>
                    </div>
                }

            </nav>
        </div>
    )
}
export default Header;
