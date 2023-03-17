import { Button } from 'primereact/button';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'primereact/card';
import * as Service from '../service/joblist'
import { BlackoutLoading } from "../components/BlackoutLoading";

export const JobDetail = () => {
    const history = useHistory()
    const dataParams = history.location.state?.dataParam ? history.location.state?.dataParam : null
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const getList = async () => {
        setLoading(true)
        let data = {
            "id": dataParams
        }
        try {
            const response = await Service.jobList(data);
            console.log(response)
            if (response?.success === true) {
                setData(response?.data)
            } else {
                setData(null)
            }
            setLoading(false)
        } catch (err) {
            throw err;
        } finally {
            setLoading(false)
        }
    };

    useEffect(async () => {
        await getList()
    }, [])

    const UnsafeComponent = ({ html }) => {
        return <div style={{ marginTop: '2rem' }} dangerouslySetInnerHTML={{ __html: html }} />;
    };

    return (

        <>
            <h2 className='font-montserrat' style={{ margin: '11rem 2rem 0 2rem', color: 'blue', cursor: 'pointer' }} onClick={() => history.push('/job-list')}><span><i className="pi pi-arrow-left" style={{ 'fontSize': '1.2rem', marginRight: '0.5rem' }}></i></span>Back</h2>

            <div className='main-layout-new card' style={{ marginTop: '1.5rem', wordBreak: 'break-word' }}>

                <div className='font-montserrat' style={{ textAlign: 'left', margin: '0', maxWidth: '100vw', padding: '1rem 0' }} >

                    <div className='col-12' style={{ borderBottom: '2px solid grey', padding: '0' }}>
                        <h4 style={{ marginBottom: '5px' }}>{data.type + ' / ' + data.location}</h4>
                        <h2 style={{ marginTop: '0' }}>{data.title}</h2>
                    </div>

                    <div className='grid col-12'>
                        <div className='col-8'>
                            <UnsafeComponent html={data.description} />
                        </div>

                        <div className='col-4' style={{ padding: '2rem 0' }}>
                            {
                                data?.company_logo &&

                                // all company logo not found in url response so used default img
                                // <img src={data?.company_logo ? data?.company_logo : 'assets/layout/images/logo_company.png'} alt="company-logo" style={{ height: '5rem' }} />

                                <Card className='col-12' style={{ padding: '0' }}>
                                    <h2 style={{ marginTop: '-1rem' }}>{data.company}</h2>
                                    <div style={{ borderTop: '1px solid grey', marginTop: '-0.5rem', marginBottom: '1rem' }}></div>
                                    <img src={'assets/layout/images/logo_company.png'} alt="company-logo" style={{ width: '100%' }} />
                                </Card>
                            }

                            <Card className='col-12' style={{ marginTop: '3rem', padding: '0' }}>
                                <h2 style={{ marginTop: '-1rem' }}>How to Apply</h2>
                                <div style={{ borderTop: '1px solid grey', marginTop: '-0.5rem', marginBottom: '1rem' }}></div>
                                <div dangerouslySetInnerHTML={{ __html: data.how_to_apply }} />
                            </Card>

                        </div>
                    </div>

                </div>

            </div>
            <BlackoutLoading loading={loading} />
        </>

    )
}