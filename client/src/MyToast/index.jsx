import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const MyToast = ({ success, message }) => {
  console.log("🚀 ~ MyToast ~ success:", success)
  useEffect(() => { 
    if (success){
      toast.success(message)
    } else {
      toast.error(message)
    }
  }, [message, success])
  return <ToastContainer />
}

export default MyToast