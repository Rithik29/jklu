// client/src/components/ResetPassword.js
import React, { useState } from 'react';
import { api } from '../../API';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const token = localStorage.getItem("token");
  const [confirmPassword, setConfirmPassword] = useState('');
  const userId = localStorage.getItem("userId");
  console.log(token)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${api}user/edit/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password }),
      });

      const data = await response.json();
     console.log(data);
      if (response.status === 200) {
        alert(data.message);
        window.location.href = "/dashboard/profile"
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Reset Password</h2>
      <form class="space-y-4" onSubmit={handleSubmit}>
        <div class="relative">
          <label for="new-password" class="block text-gray-700">New Password</label>
          <input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <span class="absolute top-2 right-4 text-xs text-red-500" id="password-error"></span>
        </div>
        <div class="relative">
          <label for="confirm-password" class="block text-gray-700">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <span class="absolute top-2 right-4 text-xs text-red-500" id="confirm-password-error"></span>
        </div>
        <button
          type="submit"
          class="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>
  

  );
}

export default ResetPassword;
