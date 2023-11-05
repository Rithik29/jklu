import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard, Auth } from './layouts'
import OrderDetails from './pages/dashboard/orderDetails'
import ResetPassword from './pages/dashboard/ResetPassword'
import ForgotPassword from './pages/dashboard/ForgotPassword'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    localStorage.setItem('token', 'yuaihdbaonaosnonoa')
  }, [])
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dashboard/orderDetail/:id" element={<OrderDetails />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/*" element={<Auth />} />
      {/* <Route path="*" element={<Navigate to="/auth/sign-in" replace />} /> */}
    </Routes>
  )
}

export default App
