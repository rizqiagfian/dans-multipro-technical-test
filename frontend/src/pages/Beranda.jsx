import { Button } from 'primereact/button';
import React from 'react';
import { Card } from 'primereact/card';
import { useHistory } from 'react-router-dom';

export const Beranda = () => {
    const history = useHistory()
    const username = JSON.parse(localStorage.getItem('userLogin'))?.username ? JSON.parse(localStorage.getItem('userLogin')).username : 'user'
    const clickGo = () => {
        history.push('/job-list')
    }

    const footer = <span>
        <Button onClick={() => clickGo()}>
            <span style={{ marginRight: '0.5rem' }}><i className=' pi pi-check'></i></span>Ke Halaman Job List
        </Button>
    </span>;

    return (

        <>
            <div className='main-layout-new' >

                <Card footer={footer} className='font-montserrat' style={{ textAlign: 'center', margin: '3rem auto', maxWidth: '50rem' }} >
                    <h1>Welcome back, {username}!</h1>
                    <h3>Untuk melihat daftar pekerjaan, silahkan ke halaman Job List.</h3>
                </Card>

            </div>
        </>

    )
}