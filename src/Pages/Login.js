import React, { useState } from 'react';
import { Col, Row, Input, Button, notification, Divider } from 'antd';
import logo from '../login.png';
import google from '../Google__G__Logo.svg.png'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const [email, setEamil] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorFormat, setErrorformat] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [incorectPassword, setIncorectPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.success({
            message: `Login Success`,
        });
    };

    const changeEmail = (e) => {
        console.log(e.target.value);
        setEamil(e.target.value);
    };
    const changePassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    };

    const login = () => {
        if (email == '' && password == '') {
            setErrorEmail(true);
            setErrorPassword(true);
        } else if (password == '' && email != '' && email.includes("@") ) {
            setErrorPassword(true);
            setErrorEmail(false);
        } else if (password == '' && email != '' && !email.includes("@") ) {
            setErrorPassword(true);
            setErrorEmail(false);
            setErrorformat(true);
        } else if (email == '') {
            setErrorEmail(true);
            setErrorPassword(false);
        } else if (email != '' && !email.includes("@")) {
            setErrorEmail(false);
            setErrorformat(true);
        } else {
            setErrorEmail(false);
            setErrorPassword(false);
            setErrorformat(false);
            setIncorectPassword(true);

            // setLoading(true);
            // setTimeout(() => {
            //     setLoading(false);
            //     openNotification();
            //     navigate('/dashboard')
            // }, 2000);
        }
    };

    const loginGoogle = () => {
        setLoading(true);

        setTimeout(() => {
            openNotification();
        }, 1500);
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard')
        }, 2000);
    }

    return (
        <>
            {contextHolder}
            <div className="">
                <Row>
                    <Col xs={24} md={12} xl={12} style={{ backgroundColor: "#F8FAFF" }} className=" py-32 px-20">
                        <div className="">
                            <Row>
                                <Col span={24}>
                                    <img src={logo} alt="login" />
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col xs={24} md={12} xl={12} className=" py-40 px-20">
                        <div className=" mb-8">
                            <h1 className=' text-2xl font-medium'>Welcome Back</h1>
                        </div>
                        <div className=" mb-6">
                            <label>Email</label>
                            <a className=" text-red-500 ml-1">*</a>
                            <Input
                                className=' mt-2'
                                onChange={changeEmail}
                                type="email"
                                name="email"
                                placeholder="email"
                            />
                            {errorEmail ? (
                                <p className=" text-red-500 absolute text-xs">
                                    Please input your email!
                                </p>
                            ) : errorFormat ? <p className=" text-red-500 absolute text-xs">
                                Incorrect email format!
                            </p> : (
                                null
                            )}
                        </div>
                        <div className=" mb-8">
                            <label>Password</label>
                            <a className=" text-red-500 ml-1">*</a>
                            <Input.Password style={{ backgroundColor: "white" }} className=' mt-2' placeholder="password" onChange={changePassword} />
                            {errorPassword ? (
                                <p className=" text-red-500 absolute text-xs">
                                    Please input your password!
                                </p>
                            ) : incorectPassword ?

                                <p className=" text-red-500 absolute text-xs">
                                    Password is incorrect
                                </p> : null}
                        </div>

                        <div className="">
                            <button
                                onClick={login}
                                style={{ backgroundColor: "#154886", padding: "6px" }}
                                className=" w-full text-white border-none cursor-pointer rounded-md"
                                loading={loading}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="">
                            <Divider plain>Or</Divider>
                        </div>
                        <div className="">
                            <Button className=" w-full flex gap-5 justify-center items-center" onClick={loginGoogle}>
                                {loading ? 'loading...' :
                                    <div className=' w-full flex gap-5 justify-center items-center'>
                                        <img src={google} style={{ width: "15px" }}></img>
                                        Sign in with Google
                                    </div>
                                }
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Login;
