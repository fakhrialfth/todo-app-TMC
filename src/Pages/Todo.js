import { Fragment, useState } from "react"
import Sidebar from "../Components/SideBar"
import TopBar from "../Components/TopBar"
import note from "../note.png"
import todoImage from "../todoImage.png"
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Card, Checkbox, DatePicker, Dropdown, Input, Modal } from "antd";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from "moment/moment"
import { BsThreeDotsVertical } from "react-icons/bs";

const Todo = () => {

    const [addTodo, setAddTodo] = useState(false);

    const [allTodo, setAllTodo] = useState([]);
    const [title, setTitle] = useState("");
    const [errorTodo, setErrorTodo] = useState(false);
    const [dateTime, setDateTime] = useState("");
    const [errorDate, setErrorDate] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenArray, setIsOpenArray] = useState(allTodo.map(() => false));

    console.log("all", allTodo);

    const selisihHari = (date) => {

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const dateNow = `${day}/${month}/${year}`;

        const parts1 = dateNow.split("/");
        const date1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);

        const parts2 = date.split("/");
        const date2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);

        const timeDifference = date2 - date1;

        if (timeDifference < 0) {
            return (
                <span className=" text-red-500">{`Overdue - ${date}`}</span>
            )
        } else if (timeDifference === 0) {
            return (
                <span className=" text-green-500">{`Now - ${date}`}</span>
            )
        } else {
            return (
                <span className=" text-blue-800">{date}</span>
            )
        }
    }

    const handleToggleAccordion = (index) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index];
        setIsOpenArray(newIsOpenArray);
    };

    const showAddTodo = () => {
        setAddTodo(true)
    }
    const closeAddTodo = () => {
        setAddTodo(false)
    }

    const changeTitle = (e) => {
        console.log(e);
        setTitle(e)
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        console.log(`${day}/${month}/${year}`);

        setDateTime(`${day}/${month}/${year}`)
    }

    const changeDate = (e) => {
        console.log(e);
        const inputDate = new Date(e.$d)
        formatDate(inputDate)
    }

    const insertTodo = () => {
        if (title === "" && dateTime === "") {
            setErrorTodo(true)
            setErrorDate(true)
        } else if (title === "") {
            setErrorTodo(true)
            setErrorDate(false)
        } else if (dateTime === "") {
            setErrorTodo(false)
            setErrorDate(true)
        } else {
            setAddTodo(false)
            allTodo.push({
                id: allTodo.length + 1,
                title: title,
                time: dateTime,
                checked: false,
                subTodo: [

                ]
            })
        }
    }

    const checked = (e, targetId) => {
        console.log(`checked = ${e.target.checked}`);
        console.log(`checked = ${targetId}`);

        const updatedAllTodo = allTodo.map((todo) => {
            if (todo.id === targetId) {
                return { ...todo, checked: e.target.checked };
            }
            return todo;
        });
        setAllTodo(updatedAllTodo)
    }

    const editTodo = () => {
        
    }

    const items = [
        {
            key: '1',
            label: (
                <p >
                    Edit
                </p>
            ),
        },
        {
            key: '2',
            label: (
                <p>
                    Delete
                </p>
            ),
        },
        {
            key: '3',
            label: (
                <p>
                    Create Sub To-do
                </p>
            ),
        },
    ];

    return (
        <Fragment>
            <Sidebar />
            <TopBar />
            <div className=" ml-72 mt-8">
                <div className="flex items-center">
                    <img src={note} alt="note" />
                    <p className=' ml-3 text-xl font-bold text-gray-600'>Todo</p>
                    <Button onClick={showAddTodo} className=" ml-8 w-48 h-10 flex items-center justify-between">
                        Created Todo
                        <AiOutlinePlus />
                    </Button>
                </div>

                {allTodo.length > 0 ? (
                    <div className="mt-10 flex justify-around">
                        <div style={{ width: "48%", background: "transparent" }} className=" bg-transparent rounded-md border-2 p-4">
                            <p className="font-semibold">Not Checked</p>
                            {allTodo
                                .filter((data) => !data.checked)
                                .map((data, index) => (
                                    <div className="border rounded-xl p-1 mt-2" key={data.id}>
                                        <button
                                            className="w-full flex gap-4 justify-between items-center p-2 focus:outline-none"
                                            onClick={() => handleToggleAccordion(data.id)}
                                        >
                                            <div className="w-full flex justify-between">
                                                <Checkbox onChange={(e) => checked(e, data.id)}>{data.title}</Checkbox>
                                                {selisihHari(data.time)}
                                            </div>
                                            <Dropdown menu={{ items }} placement="bottomRight" arrow>
                                                <BsThreeDotsVertical />
                                            </Dropdown>
                                        </button>
                                        <div className={`p-2 ${isOpenArray[data.id] ? '' : 'hidden'}`}>
                                            {data.subTodo.map((sub, index) => {
                                                return (
                                                    <div>
                                                        <Checkbox onChange={(e) => checked(e,)}>{ }</Checkbox>
                                                        <span>{ }</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div style={{ width: "48%", background: "transparent" }} className=" bg-transparent rounded-md border-2 p-4">
                            <p className="font-semibold">Checked</p>
                            {allTodo
                                .filter((data) => data.checked)
                                .map((data, index) => (
                                    <div className="border rounded-xl p-1 mt-2" key={data.id}>
                                        <button
                                            className="w-full flex gap-4 justify-between items-center p-2 focus:outline-none"
                                            onClick={() => handleToggleAccordion(data.id)}
                                        >
                                            <div className="w-full flex justify-between">
                                                <Checkbox checked={data.checked} onChange={(e) => checked(e, data.id)}>
                                                    <span className="line-through">{data.title}</span>
                                                </Checkbox>
                                                <span className=" text-blue-800">{data.time}</span>
                                            </div>
                                            <Dropdown menu={{ items }} placement="bottomRight" arrow>
                                                <BsThreeDotsVertical />
                                            </Dropdown>
                                        </button>
                                        <div className={`p-2 ${isOpenArray[data.id] ? '' : 'hidden'}`}>
                                        </div>
                                    </div>
                                ))}
                        </div>


                    </div>
                ) : (
                    <div className="w-full mt-24 flex justify-center items-center">
                        <img src={todoImage} alt="todoImage" />
                    </div>
                )}
            </div>

            <Modal title="Add Todo"
                open={addTodo}
                onCancel={closeAddTodo}
                footer={() => (
                    <>
                        <button onClick={insertTodo} className=" w-24 p-2 bg-sky-700 text-white border-none cursor-pointer rounded-md">Save</button>
                        <button onClick={closeAddTodo} className=" w-24 p-2 bg-gray-300 text-sky-700 border-none cursor-pointer rounded-md ml-3">Cancel</button>
                    </>
                )}
            >
                <div className=" mb-6 mt-6">
                    <label>Todo</label>
                    <a className=" text-red-500 ml-1">*</a>
                    <Input
                        className=' mt-2 h-11'
                        onChange={(e) => changeTitle(e.target.value)}
                        name="todo"
                        placeholder="todo"
                    />
                    {errorTodo ? (
                        <p className=" text-red-500 absolute text-xs">
                            Please input your Todo!
                        </p>
                    ) : (
                        null
                    )}
                </div>
                <div className=" mb-6 mt-6">
                    <label>Date Time</label>
                    <a className=" text-red-500 ml-1">*</a>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker onChange={(value, context) => changeDate(value)} />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorDate ? (
                        <p className=" text-red-500 absolute text-xs">
                            Please input date!
                        </p>
                    ) : (
                        null
                    )}
                </div>
            </Modal>
        </Fragment >
    )
}

export default Todo
