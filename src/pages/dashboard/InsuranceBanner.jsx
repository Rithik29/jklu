import React, { useState } from 'react'
import chat from '../../assets/chat.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FaUserDoctor } from 'react-icons/fa6'

const InsuranceBanner = () => {
  const [close, setClose] = useState(true)
  const handleClose = () => {
    setClose(false)
  }
  const message = [
    {
      topic: 'OPD Claims',
      desc: 'Book Your Claims through OPDSure',
      text: '240 Doctors Online',
      icon: '',
    },
    {
      topic: "Doctor Consultations's",
      desc: 'Book a Doctor Consultation with ODPSure',
      text: '200+ Labs Registered',
      icon: <FaUserDoctor />,
    },
    {
      topic: 'Diagnostic Tests',
      desc: 'Book your Diagnostic Test with OPDSure ',
      text: '',
    },
    {
      topic: 'Pharmacy',
      desc: 'Book your medicines with OPDSure',
      text: 'Book your medicines ',
    },
  ]

 
  return (
    <div
      className={`bg-white border-2 border-gray-300 ${
        close ? 'visible' : 'hidden'
      } shadow-md p-4 rounded-lg mb-12 flex flex-col items-start justify-between md:flex-row  `}
    >
      {/* <div className="flex flex-col items-end justify-end">
        <button className="md:hidden flex" onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} className="text-3xl" />
        </button>
      </div> */}
      <div className='pt-16 px-4'>
        <h1 className='text-4xl text-black font-bold'>Create a Meeting</h1>
        <p className='mt-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, eum.</p>
        <button className='mt-12 bg-[#1B263B] rounded-lg py-2 px-6 text-lg text-white'>Create Meeting</button>

      </div>

      {/* <div className="md:flex hidden flex-col items-start justify-start">
        <button className="relative left-[100%]" onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} className="text-3xl" />
        </button>
      </div> */}
      <div>
        <img src={chat} alt="" className="h-[280px]" />
      </div>
    </div>
  )
}

export default InsuranceBanner
