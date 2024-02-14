"use client";
import { useState } from "react";
import { Dialog, Disclosure, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { NavBarItems } from "@/constants/navBarItems";
import { NavItem } from "../navItem";
import Image from "next/image";
import logo from "@/public/Logo.jpeg";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOutUser } from "@/redux/slices/authApiCall";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (user != null || user != undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  const lougOutHandler = () => {
    dispatch(LogOutUser());
    router.push("/");
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image className="h-8 w-auto" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {NavBarItems.map((item, index) => (
            <div key={index}>
              <NavItem title={item.name} path={item.link} />
            </div>
          ))}
        </Popover.Group>

        {isLogin ? (
          <div className="pl-12 ">
            <button
              onClick={lougOutHandler}
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-main-blue text-white hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="py-6 flex pl-12  ">
            <Link
              href="/login"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-main-blue hover:bg-gray-50 "
            >
              Log In
            </Link>
            <span className="m-3" />
            <Link
              href="/create-account"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-main-blue hover:bg-gray-50"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => <></>}
                </Disclosure>
                {NavBarItems.map((item, index) => (
                  <div key={index}>
                    <NavItem title={item.name} path={item.link} />
                  </div>
                ))}
              </div>

              {isLogin ? (
                <div className="pl-12">
                  <button
                    onClick={lougOutHandler}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-main-blue text-white hover:bg-red-700"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="py-6">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-main-blue hover:bg-gray-50"
                  >
                    Log In
                  </Link>
                  <span className="m-3" />
                  <Link
                    href="/create-account"
                    className="text-sm font-semibold leading-6 text-black"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
