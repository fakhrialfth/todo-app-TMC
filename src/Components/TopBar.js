import React, { useState, useEffect, useContext } from 'react';
// import { useRouter } from 'next/router';
import {
    BsFilterLeft,
    BsCalendar4,
    BsSearch,
} from 'react-icons/bs';
import { FiLogIn } from "react-icons/fi";
import { Menu, Popover, Transition } from '@headlessui/react';
import profile from "../profile.png"
import { Input, Space } from 'antd';

// Assuming you have already defined AuthContext
// Import it here, e.g., import { AuthContext } from 'pages/_app';

function TopBar() {
    const [name, setName] = useState("");

    const isActivePath = window.location.pathname

    return (
        <section
            className={`bg-white w-full h-20 flex items-center transition-all duration-[400ms] shadow-md`}
        >
            <ul className={'flex justify-between items-center flex-1 px-4 md:px-16 gap-6'}>
                <li className="">
                    <BsFilterLeft
                        className={
                            'h-8 w-8 cursor-pointer text-gray-700 hover:text-sky-600 transition-colors ease-in-out duration-300'
                        }
                    // onClick={() => setShowNav((prev) => !prev)}
                    />
                </li>
                <li className=" w-full pl-40">
                    <Input addonBefore={<BsSearch className=' text-gray-500' />} placeholder='Search' />
                </li>
                <li className="flex items-center gap-5 md:gap-8">
                    <Popover className={'relative'}>
                        <Popover.Button className={'outline-none cursor-pointer text-gray-700'}>
                            <BsCalendar4 className={'h-6 w-6 hover:text-sky-600'} />
                        </Popover.Button>
                    </Popover>
                    <Menu as={'div'} className={'relative inline-block text-left'}>
                        <Menu.Button
                            className={'inline-flex w-full justify-center items-center gap-1'}
                        >
                            <div className=' grid justify-items-end mr-1 '>
                                <span className="hidden md:block font-medium text-gray-700">Sudarsono</span>
                                <span className="hidden md:block text-xs text-gray-700">Admin</span>
                            </div>

                            <img src={profile} alt="profile" />
                        </Menu.Button>

                        <Transition
                            as={React.Fragment}
                            enter={'transition ease-out duration-100'}
                            enterFrom={'transform slace-95'}
                            enterTo={'transform scale-100'}
                            leave={'transition ease-in duration-75'}
                            leaveFrom={'transform scale-100'}
                            leaveTo={'transform scale-95'}
                        >
                            <Menu.Items
                                className={
                                    'absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white shadow-lg rounded p-4'
                                }
                            >
                                <Menu.Item>
                                    <a
                                        href={'/'}
                                        className={
                                            'flex items-center hover:text-sky-600 hover-text-white text-gray-700 rounded p-2 text-sm transition-colors ease-in-out duration-300 gap-4'
                                        }
                                    >
                                        <FiLogIn className={'w-5 h-5 mt-1'} />
                                        <p>Log Out</p>
                                    </a>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </li>
            </ul>
        </section>
    );
}

export default TopBar;