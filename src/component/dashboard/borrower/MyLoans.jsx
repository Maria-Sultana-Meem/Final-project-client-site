import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaEye, FaTimes, FaCheck } from 'react-icons/fa';

const MyLoans = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: loans = [], isLoading, refetch } = useQuery({
    queryKey: ['my-loans', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`my-loans/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Refetch if redirected from payment success
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') refetch();
  }, [refetch]);

  const handleCancel = (loan) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to cancel the loan "${loan.loanTitle}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/loan-application/${loan._id}`, { status: 'Cancelled' });
          toast.success('Loan cancelled successfully');
          refetch();
        } catch (err) {
          console.error(err);
          toast.error('Failed to cancel loan');
        }
      }
    });
  };

  const handlePay = async (loan) => {
    try {
      const { data } = await axiosSecure.post('create-checkout-session', {
        loanId: loan._id,
        email: user.email,
        amount: 10,
      });
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.error('Failed to initiate payment');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Loan Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Application Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <th>{index + 1}</th>
                <td>{loan.loanTitle}</td>
                <td>${loan.loanAmount}</td>
                <td className="capitalize">{loan.status}</td>
                <td className="capitalize">
                  {loan.applicationFeeStatus === 'Paid' ? (
                    <span
                      className="px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1 cursor-pointer"
                      onClick={() => {
                        setSelectedLoan(loan);
                        document.getElementById('loan_modal').showModal();
                      }}
                    >
                      <FaCheck /> Paid
                    </span>
                  ) : 'Unpaid'}
                </td>
                <td className="flex gap-2">
                  {loan.applicationFeeStatus !== 'Paid' && (
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
                      onClick={() => {
                        setSelectedLoan(loan);
                        document.getElementById('loan_modal').showModal();
                      }}
                    >
                      <FaEye /> View
                    </button>
                  )}

                  {loan.status === 'Pending' && (
                    <button
                      onClick={() => handleCancel(loan)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <FaTimes /> Cancel
                    </button>
                  )}

                  {loan.applicationFeeStatus === 'Unpaid' && loan.status !== 'Cancelled' && (
                    <button
                      onClick={() => handlePay(loan)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="loan_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {selectedLoan && (
            <>
              <h3 className="font-bold text-lg">{selectedLoan.loanTitle}</h3>
              <p><strong>Amount:</strong> ${selectedLoan.loanAmount}</p>
              <p><strong>Status:</strong> {selectedLoan.status}</p>
              <p><strong>Application Fee:</strong> {selectedLoan.applicationFeeStatus}</p>
              {selectedLoan.paymentInfo && (
                <>
                  <p><strong>Transaction ID:</strong> {selectedLoan.paymentInfo.transactionId}</p>
                  <p><strong>Paid By:</strong> {selectedLoan.paymentInfo.email}</p>
                  <p><strong>Amount Paid:</strong> ${selectedLoan.paymentInfo.amount}</p>
                  <p><strong>Payment Date:</strong> {new Date(selectedLoan.paymentInfo.paymentDate).toLocaleString()}</p>
                </>
              )}
            </>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyLoans;
