import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext"
import { Checkbox } from 'primereact/checkbox';
import * as Service from '../service/joblist'
import { BlackoutLoading } from "../components/BlackoutLoading";
import { Dialog } from 'primereact/dialog';

export const JobList = () => {
    const history = useHistory()
    const [deskripsi, setDeskripsi] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [checked, setChecked] = useState(false)
    const [displayDialogFail, setDisplayDialogFail] = useState(false)
    const [dialogMessageFail, setDialogMessageFail] = useState("")

    const clickReadMore = (data) => {
        history.push({ pathname: '/job-detail', state: { dataParam: data.id } })
    }

    const clickCari = () => {
        getList('search')
    }

    const getList = async (type) => {
        if (!type) {
            setLoading(true)
            let data = {
                "description": deskripsi,
                "location": lokasi,
                "full_time": checked ? true : false,
                "page": page
            }
            try {
                const response = await Service.jobList(data);
                if (response?.success === true) {
                    setDataList(response.data)
                } else {
                    setDataList([])
                    setDialogMessageFail(response?.response_message)
                    setDisplayDialogFail(true)
                }
                setLoading(false)
            } catch (err) {
                setDialogMessageFail(err)
                setDisplayDialogFail(true)
                throw err;
            } finally {
                setLoading(false)
            }
        } else if (type === 'more') {
            setLoading(true)
            let data = {
                "description": deskripsi,
                "location": lokasi,
                "full_time": checked ? true : false,
                "page": page + 1
            }

            try {
                const response = await Service.jobList(data);
                if (response?.success === true) {
                    for (let i = 0; i < response?.data?.length; i++) {
                        dataList.push(response.data[i])
                    }
                    setPage(page + 1)
                } else {
                    setDialogMessageFail(response?.data)
                    setDisplayDialogFail(true)
                }
                setLoading(false)
            } catch (err) {
                setDialogMessageFail(err)
                setDisplayDialogFail(true)
                throw err;
            } finally {
                setLoading(false)
            }
        } else if (type === 'search') {
            setLoading(true)
            let data = {
                "description": deskripsi,
                "location": lokasi,
                "full_time": checked ? true : false,
                "page": 1
            }

            try {
                const response = await Service.jobList(data);
                if (response?.success === true) {
                    setDataList(response.data)
                    setPage(1)
                } else {
                    setDialogMessageFail(response?.data)
                    setDisplayDialogFail(true)
                }
                setLoading(false)
            } catch (err) {
                setDialogMessageFail(err)
                setDisplayDialogFail(true)
                throw err;
            } finally {
                setLoading(false)
            }
        }
    };

    const convertDay = (date) => {
        const sep = new Date(date);
        const today = new Date();
        const diffD = Math.abs(Math.floor((sep - today) / (1000 * 60 * 60 * 24)));

        return diffD
    }

    useEffect(async () => {
        await getList()
    }, [])

    return (

        <>
            <div className='font-montserrat' style={{ margin: '11rem 2rem 0 2rem' }}>

                <div className='grid col-12'>

                    <div className="field col-4">
                        <label style={{ fontSize: '1.2rem' }} htmlFor="description">Job Description</label>
                        <InputText id="description" type="text" style={{ width: '100%' }} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                    </div>

                    <div className="field col-4">
                        <label style={{ fontSize: '1.2rem' }} htmlFor="location">Job Location</label>
                        <InputText id="location" type="text" style={{ width: '100%' }} value={lokasi} onChange={(e) => setLokasi(e.target.value)} />
                    </div>

                    <div className="field-checkbox col-2" style={{ marginTop: '1.5rem' }}>
                        <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />
                        <label htmlFor="binary" style={{ fontSize: '1.2rem' }}>Fulltime Only</label>
                    </div>


                    <div className='field col-1' style={{ marginTop: '1.5rem' }}>
                        <Button label="Search" icon="pi pi-search" onClick={() => clickCari()} style={{ width: '100%', wordBreak: 'break-all', minWidth: '7rem' }} />
                    </div>

                </div>

            </div>

            <div className='main-layout'>

                <div className='font-montserrat'>
                    <h1 style={{ marginBottom: '1rem' }}>Job List</h1>
                </div>

                {
                    dataList?.length > 0 && dataList?.map((item) => {
                        if (item !== null) {
                            return (
                                <div className='grid col-12 font-montserrat' style={{ borderBottom: '1px solid grey', paddingBottom: '0', marginBottom: '5px' }}>

                                    <div className="field col-10" style={{ marginBottom: '0' }}>
                                        <p onClick={() => clickReadMore(item)} style={{ fontSize: '1.1rem', color: 'blue', fontWeight: 'bold', marginBottom: '0', cursor: 'pointer' }}>{item.title}</p>
                                        <p style={{ fontSize: '1rem', marginTop: '7px' }}>{item.company} - <span style={{ color: 'green', fontWeight: 'bold' }}>{item.type}</span></p>
                                    </div>

                                    <div className="field col-2" style={{ margin: 'auto' }}>
                                        <p style={{ margin: '0' }}>{item.location}</p>
                                        <p style={{ color: 'grey', marginTop: '7px', marginBottom: '0' }}>{item.created_at ? convertDay(item.created_at) + " days ago" : "-"}</p>
                                    </div>

                                </div>
                            )
                        }
                    })
                }

                {
                    dataList?.length > 0 &&
                    <div className='col-12 grid' style={{ marginTop: '1rem' }}>
                        <Button style={{ width: '100%', textAlign: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => getList('more')}>More Jobs</Button>
                    </div>
                }

            </div>

            {/* Dialog Fail */}
            <Dialog blockScroll={true} className="dialog-response-fail" header={"Peringatan"} visible={displayDialogFail} onHide={() => setDisplayDialogFail(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '40vw' }} draggable={false}>
                <div className="p-col-12 p-d-flex">
                    <p style={{ marginLeft: '10px', width: '100%' }}>{dialogMessageFail}</p>
                </div>
                <div className="p-col-12" style={{ textAlign: 'end', marginTop: '0.5rem' }}>
                    <Button label="OK" style={{ textAlign: 'center', width: '5rem', backgroundColor: '#D01224' }} onClick={() => setDisplayDialogFail(false)} />
                </div>
            </Dialog>

            <BlackoutLoading loading={loading} />
        </>

    )
}