import { faPlane, faRegistered, faSave, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import doctor from '../../assets/doctor.png'
import axios from 'axios'
// import './testcss.css'
const UploadContent = () => {
  const [xlsxFiles, setXLSXFiles] = useState([])
  const [audioFiles, setAudioFiles] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [data,setdata] = useState(" ")

  const handleFileChange = (event, setFiles) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      setFiles([...setFiles, ...selectedFiles])
      event.target.value = null // Reset the input field
    }
  }

  const removeFile = (file, setFiles) => {
    const newFiles = [...setFiles]
    const index = newFiles.indexOf(file)
    if (index > -1) {
      newFiles.splice(index, 1)
      setFiles(newFiles)
    }
  }

  const handleSubmit = async(e) => {
    // Here, you can handle the file upload logic for each file type.
    // console.log('XLSX Files:', xlsxFiles)
    // console.log('Audio Files:', audioFiles)
    // console.log('Image Files:', imageFiles)

    try{

      const resp= await axios.post('http://localhost:5000/capture', {image : imageFiles})
      const emotion = resp.data
      console.log(emotion)
      
      const str = JSON.stringify(emotion)
      //setdata(str)
      alert(str)
      console.log(str)
      if(str === "[1]")
      {
        setdata("Predected type  : 1   Further Investigation not Necassary")
      }
      else if(str === "[2]")
      {
        setdata("Predected type  : 2   Further Investigation are Required")
      }
      else{
        setdata("Predected type  : 3   Further Investigation are must")
      }
    }catch(error)
    {
      console.log(error)
    }
    // fetch('/api/uploadImage', { 
    //   method: 'POST',
    //   body: JSON.stringify({ image: capturedImage }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
      // .then(response => {
      //   // Handle the response from the server
      // })
      // .catch(error => {
      //   // Handle the error
      // });
  }

  const FileInput = ({ accept, onChange, files, setFiles, label }) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept,
      onDrop: (acceptedFiles) => {
        setFiles([...files, ...acceptedFiles])
      },
    })

    return (
      <div className="file-upload">
        <label className="text-xl text-black mb-2">{label}:</label>
        <div
          className="relative border-dotted border-2 mt-2 border-[#03A1A4] p-4 rounded-lg transition duration-300 transform hover:scale-105"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="text-blue-500 hover:underline">
            Click to select or drop files here
          </p>
        </div>
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center">
              <span>{file.name}</span>
              <button
                onClick={() =>
                  removeFile(
                    file,
                    files === xlsxFiles
                      ? xlsxFiles
                      : files === audioFiles
                      ? audioFiles
                      : imageFiles,
                  )
                }
                className="ml-2 text-red-600 cursor-pointer hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 flex items-center w-full">
      <div className="space-y-4 w-[60%]">
        <h1 className="text-4xl text-start">Evaluation Window</h1>

        <div className="space-y-4">
          <label className="text-xl" htmlFor="patientName">
            Patient Name:
          </label>
          <input
            type="text"
            id="patientName"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter patient name"
            // Add a state or value prop and onChange handler for patient name
          />
        </div>

        <div className="space-y-4">
          <label className="text-xl" htmlFor="patientID">
            Patient ID:
          </label>
          <input
            type="text"
            id="patientID"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter patient ID"
            // Add a state or value prop and onChange handler for patient ID
          />
        </div>

        <FileInput
          accept=".jpg, .jpeg, .png"
          onChange={(e) => handleFileChange(e, imageFiles)}
          files={imageFiles}
          setFiles={setImageFiles}
          label="Upload Results"
        />
        <div className="flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="bg-[#1B263B] text-white px-6 py-2 text-xl text-center rounded  transition duration-300 transform hover:scale-105"
          >
            Result
          </button>
        </div>
      </div>
      {/* <p id="text">{data}</p> */}
      <div style={{position: 'relative', top: '360px', right: '360px', fontSize:'35px', width: '1200px', textAlign: 'center', fontFamily: 'sans-serif'}}>
        {data}
      </div>
      <div>
        <img src={doctor} alt="" className="h-[400px]" />
      </div>
    </div>
  )
}

export default UploadContent
