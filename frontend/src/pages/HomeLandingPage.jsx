import React, { useState } from 'react';
import { Background } from '../components/Background';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom';
import * as Service from '../service/login';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';

export const HomeLandingPage = () => {
    const history = useHistory()
    const logo = "assets/layout/images/logo_company.png"
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    const [displayDialogFail, setDisplayDialogFail] = useState(false)
    const [dialogMessageFail, setDialogMessageFail] = useState('error')

    const login = async () => {
        let data = {
            "username": username,
            "password": password
        }
        try {
            const response = await Service.login(data);
            console.log(response)
            if (response?.success === true) {
                await localStorage.setItem('userLogin', JSON.stringify(response.data))
                history.push('/beranda')
            } else {
                setDialogMessageFail(response.message)
                setDisplayDialogFail(true)
            }
        } catch (err) {
            throw err;
        } finally {
        }
    };

    const changeUsername = (e) => {
        setUsername(e.target.value)
        setErrorUsername(false)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
        setErrorPass(false)
    }

    const clickLogin = () => {
        if (username && password) {
            login()
        } else if (!username) {
            setErrorUsername(true)
        } else if (!password) {
            setErrorPass(true)
        }
    }

    return (
        <>
            <Background />

            <div className="font-montserrat section-login-page col-12 md:col-4" >
                <div className='top-login'>
                    <img src={logo} alt="logo-company" style={{ height: '5rem' }} />
                    <h2 style={{ marginBottom: '5px' }}>Selamat Datang!</h2>
                    <p style={{ fontSize: '15px', margin: '0' }}>
                        Masuk untuk menlanjutkan ke Aplikasi Job Portal
                    </p>
                </div>

                <div className="p-fluid mid-login">
                    <div className="p-field mid-login-text">
                        <label htmlFor="firstname1">Username</label>
                        <InputText className={errorUsername ? 'p-invalid' : ''} id="firstname1" type="text" value={username} onChange={changeUsername} />
                        {errorUsername &&
                            <div className="col-12">
                                <small style={{ color: "#B00020", fontSize: '14px', fontStyle: 'italic' }}>*username tidak boleh kosong</small>
                            </div>
                        }
                    </div>
                    <div className="p-field mid-login-text" style={{ marginTop: '1rem' }}>
                        <label htmlFor="password mid-login-text">Password</label>
                        <Password className={errorPass ? 'p-invalid' : ''} id="password" type="text" value={password} onChange={changePassword} feedback={false} />
                        {errorPass &&
                            <div className="col-12">
                                <small style={{ color: "#B00020", fontSize: '14px', fontStyle: 'italic' }}>*password tidak boleh kosong</small>
                            </div>
                        }
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Button className='btn-login' onClick={() => clickLogin()}>Masuk</Button>
                </div>

            </div>

            <Dialog blockScroll={true} className="dialog-response-fail" header={'Peringatan'} visible={displayDialogFail} breakpoints={{ '960px': '75vw' }} style={{ width: '40vw' }} draggable={false} onHide={() => setDisplayDialogFail(false)}>
                <div className="p-col-12 p-d-flex">
                    <p style={{ marginLeft: '10px', width: '100%' }}>{dialogMessageFail}</p>
                </div>
            </Dialog>

        </>
    )
}