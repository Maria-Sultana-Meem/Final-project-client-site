import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await axiosSecure.post('payment-success', { sessionId });
        toast.success('Payment successful!');
        navigate('/dashboard/my-loans?payment=success');
      } catch (err) {
        console.error(err);
        toast.error('Payment verification failed');
        navigate('/dashboard/my-loans');
      }
    };

    if (sessionId) verifyPayment();
  }, [axiosSecure,navigate,sessionId]);

  return <p>Verifying payment...</p>;
};

export default PaymentSuccess;
