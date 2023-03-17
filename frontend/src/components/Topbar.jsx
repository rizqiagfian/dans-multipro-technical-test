import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar'
import { useHistory } from 'react-router-dom';

export const TopBar = () => {
    const history = useHistory()
    const username = JSON.parse(localStorage.getItem('userLogin'))?.username ? JSON.parse(localStorage.getItem('userLogin')).username : 'user'
    const items = [
        {
            label: 'Beranda',
            command: () => {
                goTo('beranda')
            }
        },
        {
            label: 'Job List',
            command: () => {
                goTo('job-list')
            }
        },
        {
            label: 'Log Out',
            command: () => {
                goTo('logout')
            }
        }
    ];
    const [visible, setVisible] = useState(false)

    const goTo = async (item) => {
        if (item === 'beranda') {
            history.push('/beranda')
        } else if (item === 'job-list') {
            history.push('/job-list')
        } else if (item === 'logout') {
            await localStorage.clear()
            history.push('/login')
        }
    };

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 245) {
            setVisible(true)
        } else if (scrolled <= 245) {
            setVisible(false)
        }
    };
    window.addEventListener('scroll', toggleVisible);

    return (
        <>
            <div style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '999', backgroundColor: "#427fbe" }}>
                <div style={{ padding: '0.5rem 1rem' }} className='grid'>
                    <div className='col-6' style={{ margin: 'auto' }}>
                        <p style={{ margin: '0 0 0 1rem', color: '#fff', fontSize: '2.5rem' }} onClick={() => goTo('beranda')}><strong>GitHub</strong> Jobs</p>
                    </div>
                    <div className='col-6' style={{ textAlign: 'end', fontSize: '1rem', padding: '0 1.5rem 0 0', color: '#fff' }}>
                        <i className='pi pi-user' style={{ fontSize: '2rem', margin: '5px 10px 0 0' }}></i>
                        <p style={{ padding: 0, margin: '0' }}>Username <br /> {username}</p>
                    </div>
                </div>

                <Menubar
                    className={`top-bar ${visible ? 'top-bar-fixed' : ''}`}
                    model={items}
                />
            </div>
        </>
    )
}