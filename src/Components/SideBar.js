import { Link } from "react-router-dom";
// import { AiOutlineHome, AiOutlineFolderOpen, AiOutlineLineChart, AiOutlineSetting } from "react-icons/ai";
// import { useRouter } from 'next/router';
import todoApp from "../TodoApps.png"
import circle from "../circle.png"
import {
    HomeOutlined,
    FileTextOutlined,
} from '@ant-design/icons';

const Sidebar = () => {

    const MENU_ITEMS = [
        {
            name: 'Dashboard',
            icon: HomeOutlined,
            path: '/dashboard'
        },
        {
            name: 'Todo',
            icon: FileTextOutlined,
            path: '/todo'
        },
    ];

    const ACTIVE_STYLING = 'bg-sky-700 text-white';
    const isActivePath = window.location.pathname

    return (
        <aside className='fixed w-64 h-full bg-white shadow-2xl'>
            <div className=" text-center flex items-center justify-between p-4 mb-4 mt-4">
                {/* <div className=' text-xl font-bold text-white'>BeLAundry</div> */}
                <img src={todoApp} alt="logo" className=" w-28" />
                <img src={circle} alt="circle" className=" w-5 h-5" />
            </div>

            <ul className='flex flex-col'>
                {MENU_ITEMS.map(({ name, icon: Icon, path }) => (
                    <li key={name}>
                        <a
                            href={path}
                            className={`pl-4 py-3 rounded-lg text-center cursor-pointer flex items-center gap-1 transition-colors ease-in-out duration-150 hover:bg-sky-700 hover:text-white first-letter
                            ${isActivePath === path ? ACTIVE_STYLING : "text-gray-500"}
                            `}
                        >
                            <Icon className={'text-lg mr-2'} />
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar
