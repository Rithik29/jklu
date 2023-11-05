import React from 'react'
import InsuranceBanner from './InsuranceBanner'
import PatientQueueTable from './PatientTable'

const Home = () => {
  return (
    <div>
      <InsuranceBanner/>
      <PatientQueueTable/>
    </div>
  )
}

export default Home