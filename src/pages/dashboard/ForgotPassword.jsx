// client/src/components/ForgotPassword.js
import React, { useState } from 'react';
import { api } from '../../API';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${api}forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
  <div class="bg-white p-8 rounded shadow-md max-w-md w-full">
    <h2 class="text-2xl font-semibold mb-6">Forgot Password</h2>
    <form class="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label for="email" class="block text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white rounded-md py-2 font-semibold hover:bg-blue-600"
        >
          Reset Password
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default ForgotPassword;
