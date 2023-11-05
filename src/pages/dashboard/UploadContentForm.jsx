import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const UploadContent = () => {
  const [newSubLabel, setNewSubLabel] = useState('')
  const [existingSubLabel, setExistingSubLabel] = useState('')

  const [title, setTitle] = useState('')
  const [upc, setUpc] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [goLiveDate, setGoLiveDate] = useState('')
  const [contentType, setContentType] = useState('')
  const [songTitle, setSongTitle] = useState('')
  const [songISRC, setSongISRC] = useState('')
  const [songLanguage, setSongLanguage] = useState('')
  const [songGoLiveDate, setSongGoLiveDate] = useState('')
  const [songGenre, setSongGenre] = useState('')
  const [songSubGenre, setSongSubGenre] = useState('')
  const [songMood, setSongMood] = useState('')
  const [songDescription, setSongDescription] = useState('')
  const [songSinger, setSongSinger] = useState('')
  const [songComposer, setSongComposer] = useState('')
  const [songDirector, setSongDirector] = useState('')
  const [songProducer, setSongProducer] = useState('')
  const [songStarCast, setSongStarCast] = useState('')
  const [songLyricist, setSongLyricist] = useState('')
  const [songIsExplicit, setSongIsExplicit] = useState('')

  const handleSongAudioFileChange = (event) => {
    // Handle audio file change here
    const selectedFile = event.target.files[0]
    // Do something with the selected audio file
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted with values:')
    console.log('New Sub-Label:', newSubLabel)
    console.log('Existing Sub-Label:', existingSubLabel)

    console.log('Title:', title)
    console.log('UPC:', upc)
    console.log('Release Date:', releaseDate)
    console.log('Go Live Date:', goLiveDate)
    console.log('Content Type:', contentType)
  }
  const [imageFiles, setImageFiles] = useState([])

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

  const FileInput = ({ accept, onChange, files, setFiles, label }) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept,
      onDrop: (acceptedFiles) => {
        setFiles([...files, ...acceptedFiles])
      },
    })

    return (
      <div className="file-upload">
        <label className="text-xl text-gray-700 mb-2">{label}:</label>
        <div
          className="relative border-dotted border-2 mt-2 border-blue-400 p-4 rounded-lg transition duration-300 transform hover:scale-105"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="text-blue-500 hover:underline">
            Click to select or drop files here
          </p>
        </div>
        <div className="space-y-2">
          {imageFiles.map((file, index) => (
            <div key={index} className="flex items-center">
              <span>{file.name}</span>
              <button
                onClick={() => removeFile(file, imageFiles)}
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4 text-center">UPLOAD CONTENT</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="newSubLabel"
            className="block text-sm font-medium text-gray-700"
          >
            New sub-label
          </label>
          <input
            type="text"
            id="newSubLabel"
            placeholder="Enter new sub-label"
            value={newSubLabel}
            onChange={(e) => setNewSubLabel(e.target.value)}
            className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="existingSubLabel"
            className="block text-sm font-medium text-gray-700"
          >
            Existing sub-label
          </label>
          <select
            id="existingSubLabel"
            value={existingSubLabel}
            onChange={(e) => setExistingSubLabel(e.target.value)}
            className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="">Select an existing sub-label</option>
            {/* Add options for existing sub-labels */}
          </select>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-3 gap-6">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="upc"
              className="block text-sm font-medium text-gray-700"
            >
              UPC
            </label>
            <input
              type="text"
              id="upc"
              placeholder="Enter UPC"
              value={upc}
              onChange={(e) => setUpc(e.target.value)}
              className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-700"
            >
              Date of release
            </label>
            <input
              type="date"
              id="releaseDate"
              placeholder="Enter release date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="goLiveDate"
              className="block text-sm font-medium text-gray-700"
            >
              Go Live Date
            </label>
            <input
              type="date"
              id="goLiveDate"
              placeholder="Enter Go Live date"
              value={goLiveDate}
              onChange={(e) => setGoLiveDate(e.target.value)}
              className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contentType"
              className="block text-sm font-medium text-gray-700"
            >
              Content Type
            </label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="">Select content type</option>
              <option value="Inlay / Album Art">Inlay / Album Art</option>
              <option value="SONG 1">SONG 1</option>
              <option value="CRBT 1">CRBT 1</option>
              {/* Add other content types */}
            </select>
          </div>
        </div>
        <div className="my-4">
          <FileInput
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleFileChange(e, imageFiles)}
            files={imageFiles}
            setFiles={setImageFiles}
            label="Inlay / Album Art "
          />
        </div>
        <hr />
        <div className='my-4'>
            <h1 className='text-3xl font-semibold'>Song 1</h1>
        </div>
        <hr/>
        <div className="my-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="mb-4">
              <label
                htmlFor="songTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="songTitle"
                placeholder="Enter title"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songISRC"
                className="block text-sm font-medium text-gray-700"
              >
                ISRC
              </label>
              <input
                type="text"
                id="songISRC"
                placeholder="Enter ISRC"
                value={songISRC}
                onChange={(e) => setSongISRC(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songLanguage"
                className="block text-sm font-medium text-gray-700"
              >
                Language
              </label>
              <input
                type="text"
                id="songLanguage"
                placeholder="Enter language"
                value={songLanguage}
                onChange={(e) => setSongLanguage(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songGoLiveDate"
                className="block text-sm font-medium text-gray-700"
              >
                Go Live Date 
              </label>
              <input
                type="date"
                id="songGoLiveDate"
                placeholder="Enter Go Live date"
                value={songGoLiveDate}
                onChange={(e) => setSongGoLiveDate(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songGenre"
                className="block text-sm font-medium text-gray-700"
              >
                Genre
              </label>
              <input
                type="text"
                id="songGenre"
                placeholder="Enter genre"
                value={songGenre}
                onChange={(e) => setSongGenre(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songSubGenre"
                className="block text-sm font-medium text-gray-700"
              >
                Sub Genre
              </label>
              <input
                type="text"
                id="songSubGenre"
                placeholder="Enter sub genre"
                value={songSubGenre}
                onChange={(e) => setSongSubGenre(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songMood"
                className="block text-sm font-medium text-gray-700"
              >
                Mood
              </label>
              <input
                type="text"
                id="songMood"
                placeholder="Enter mood"
                value={songMood}
                onChange={(e) => setSongMood(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="songDescription"
                placeholder="Enter description"
                value={songDescription}
                onChange={(e) => setSongDescription(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songSinger"
                className="block text-sm font-medium text-gray-700"
              >
                Singer
              </label>
              <input
                type="text"
                id="songSinger"
                placeholder="Enter singer"
                value={songSinger}
                onChange={(e) => setSongSinger(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songComposer"
                className="block text-sm font-medium text-gray-700"
              >
                Composer
              </label>
              <input
                type="text"
                id="songComposer"
                placeholder="Enter composer"
                value={songComposer}
                onChange={(e) => setSongComposer(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songDirector"
                className="block text-sm font-medium text-gray-700"
              >
                Director
              </label>
              <input
                type="text"
                id="songDirector"
                placeholder="Enter director"
                value={songDirector}
                onChange={(e) => setSongDirector(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songProducer"
                className="block text-sm font-medium text-gray-700"
              >
                Producer
              </label>
              <input
                type="text"
                id="songProducer"
                placeholder="Enter producer"
                value={songProducer}
                onChange={(e) => setSongProducer(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songStarCast"
                className="block text-sm font-medium text-gray-700"
              >
                Star cast
              </label>
              <input
                type="text"
                id="songStarCast"
                placeholder="Enter star cast"
                value={songStarCast}
                onChange={(e) => setSongStarCast(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songLyricist"
                className="block text-sm font-medium text-gray-700"
              >
                Lyricist
              </label>
              <input
                type="text"
                id="songLyricist"
                placeholder="Enter lyricist"
                value={songLyricist}
                onChange={(e) => setSongLyricist(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songIsExplicit"
                className="block text-sm font-medium text-gray-700"
              >
                Is explicit
              </label>
              <input
                type="text"
                id="songIsExplicit"
                placeholder="Enter explicit"
                value={songIsExplicit}
                onChange={(e) => setSongIsExplicit(e.target.value)}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songAudioFile"
                className="block text-sm font-medium text-gray-700"
              >
                Audio File (.wav)
              </label>
              <input
                type="file"
                id="songAudioFile"
                accept=".wav"
                onChange={handleSongAudioFileChange}
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Submit
          </button>
          <button
            type="reset"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadContent
