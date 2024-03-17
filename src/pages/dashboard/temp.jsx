import { faPlane, faRegistered, faSave, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import doctor from '../../assets/doctor.png'
import axios from 'axios'

// import './testcss.css'
const Temp = () => {
  const [xlsxFiles, setXLSXFiles] = useState([])
  const [audioFiles, setAudioFiles] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [data,setdata] = useState(" ")
  const [id1, setid] = useState("")

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

      const temp = {image: imageFiles, id : id1 }

      const resp= await axios.post('http://127.0.0.1:5000/capture', temp)
      const emotion = resp.data
      console.log(emotion)
      
      const str = JSON.stringify(emotion)
      //setdata(str)
      alert(str)
      console.log(str)
      if(str === "[0]")
      {
        setdata("Positive Hopes, Eveything seems to be great ")
      }
      else if(str === "[2]" || str === "[1]")
      {
        setdata("Seems fishy , please there are some chances")
      }
      else if(str ==="[3]" || str === "[4]")
      {
        setdata("Results are not what they should be, should be handeled with utmost urgency")
      }
      else
      {
        setTimeout(() => {
          window.location.reload();
        }, 3500)
        setdata("User Not Registered, Please Register Yourself First , visit your nearest hospital today")
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
        <h1 className="text-3xl text-start">PaP Smear Test Evaluation Window</h1>

        <div className="space-y-4">
          <label className="text-xl" htmlFor="patientName">
            Patient Name:
          </label>
          <input
            type="text"
            id="patientName"
            className="w-full border border-gray-800 rounded p-3"
            placeholder="Enter patient name"
            // Add a state or value prop and onChange handler for patient name
          />
        </div>

        <div className="space-y-4">
          <label className="text-xl" htmlFor="patientID">
            Email  ID:
          </label>
          <input
            type="text"
            id="patientID"
            className="w-full border border-gray-800 rounded p-3"
            placeholder="Enter patient ID"
            onChange={(e) => setid(e.target.value)}
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
        <img src='https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg?w=1060&t=st=1708212483~exp=1708213083~hmac=d833bf836aa24dfb7f6b732ec69cb3490b68e731780661119c5c29136118f1e8' alt="" className="[700px]" />
      </div>
    </div>
  )
}

export default Temp
