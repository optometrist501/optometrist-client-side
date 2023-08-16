import React, { useEffect, useState } from 'react';
import paymentHistory from './PanelPaymentHistory.module.css';
import { fetchGetPaymentData } from '../../../../fetchedData/fetchPaymentData';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase/firebase.init';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PanelPaymentHistory = ({ darkmode }) => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const [viewOption, setViewOption] = useState(1);
    const [open, setOpen] = useState(false);
    const [findId, setFindId] = useState('');
    const [myHistory, setMyHistory] = useState([]);
    const [errorHolder, setErrorHolder] = useState('');
    console.log(errorHolder);

    const allMyHistory = myHistory?.data?.result;

    const handleModal = (value, id) => {
        setOpen(true);
        setFindId(id);
        if (value === 1) {
            setViewOption(1)
        } else if (value === 2) {
            setViewOption(2)
        } else if (value === 3) {
            setViewOption(3);
        }

    }

    const findHistory = allMyHistory?.find(f => {
        return f?._id === findId
    })

    useEffect(() => {
        const getPayment = async (paymentId) => {
            await fetchGetPaymentData(paymentId, setErrorHolder)
                .then(res => setMyHistory(res))
        }
        getPayment(user?.email);

        if (errorHolder) {
            navigate('/login');
            toast("please login again");
        }

    }, [user?.email, errorHolder, navigate]);


    const deletePost = async () => {

    }

    return (
        <div className={paymentHistory.main}>
            <div className={paymentHistory.container}>
                <div className={`${paymentHistory.titleContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <br />
                    <div className={paymentHistory.titleMain}>
                        <p className={paymentHistory.title}> Your Payment History :</p>

                    </div>
                    <br />
                    <hr />
                </div>
                <br />
                {
                    allMyHistory?.slice()?.reverse()?.map((history, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={history?._id} className={paymentHistory.detailPart}>
                                        <div className={paymentHistory.detailPartContainer}>
                                            <div className={`${darkmode && 'text-white'} ${paymentHistory.partOne} `}>
                                                <div className={paymentHistory.partOneDetail}>
                                                    <span>{index + 1}. </span>
                                                    <span className='ml-5'>{history?.total_amount}</span>

                                                    <span className='ml-5'>{history?.createdAt?.slice(0, 10)}</span>
                                                </div>
                                            </div>
                                            <div className={paymentHistory.partTwo}>
                                                <div className={paymentHistory.icons}>
                                                    <p>{history?.isPaid && <span className='text-green-600 italic text-sm'>Paid</span>}</p>
                                                    <p title='view' onClick={() => handleModal(1, history?._id)} ><i class="uil uil-eye text-blue-600 cursor-pointer"></i></p>

                                                    <p title='delete' onClick={() => deletePost(history?._id)}><i class="uil uil-trash-alt text-red-600 cursor-pointer"></i></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div className={`${open ? 'block' : 'none'}  ${paymentHistory.modal}    ${darkmode ? 'bg-black text-white' : 'bg-white'} `}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={`${paymentHistory.modalDetail}`}>

                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${paymentHistory.viewPart}`}>
                                <div className={paymentHistory.viewPartMain}>
                                    <div className={paymentHistory.eventsContainer}>

                                        <div style={{ width: '60%', minHeight: '300px', boxShadow: '0 0 2px 2px #e7e4e4', margin: 'auto', marginTop: '50px', padding: '10px' }}>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Name: {findHistory?.cus_name}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Amount: {findHistory?.total_amount}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Transection_id: {findHistory?.tran_id}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Email: {findHistory?.cus_email}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Phone: {findHistory?.cus_phone}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Address: {findHistory?.cus_add1}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>City: {findHistory?.cus_city}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>postcode: {findHistory?.cus_postcode}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>country: {findHistory?.cus_country}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Status: {findHistory?.isPaid && <span>Paid</span>}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }



                    </div>

                </div>
            </div>

        </div>
    );
};

export default PanelPaymentHistory;