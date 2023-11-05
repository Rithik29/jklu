import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { api } from './../../API'
import Loading from '../../components/Loading'
import { FaDeleteLeft, FaMarker, FaPencil, FaTrash } from 'react-icons/fa6'
import { PencilIcon } from '@heroicons/react/24/outline'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [showNotification, setShowNotification] = useState('')
  const [categoryShowNotification, setCategoryShowNotification] = useState('')
  const [productId, setProductId] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showCategory, setShowCategory] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState({
    medicineName: '',
    price: '',
    description: '',
    size: '1ml',
    outOfStock: false,
    potency: '',
    manufacturedBy: '',
    categoryId: '',
  })
  const [EditProductData, setEditProductData] = useState({
    name: '',
    price: '',
    description: '',
    outOfStock: '',
    categoryId: '',
  })
  const [EditCategory, setEditCategory] = useState({
    name: '',
  })

  const [editFormVisible, setEditFormVisible] = useState(false)
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("");

  // Simulating fetching categories from an API

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setProductData({ ...productData, [name]: checked })
    } else {
      // For other input types, handle value changes
      setProductData({ ...productData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${api}api/products`, productData)
      console.log(response.data)
      toast.success(`New ${response.data.name} has been added`)
      setTimeout(() => window.location.reload(), 1200)
    } catch (error) {
      console.error('Error creating product:', error)

      if (error.response) {
        // The request was made, but the server responded with a non-2xx status code
        const errorMessage =
          error.response.data.message ||
          'An error occurred while creating the product'
        toast.error(errorMessage)
      } else if (error.request) {
        // The request was made, but no response was received
        toast.error('No response from the server')
      } else {
        // Something else went wrong
        toast.error('An unexpected error occurred')
      }
    }
  }

  // Create a new category
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${api}categories`, {
        name: categoryName,
      })
      console.log('Category created:', response.data)
      toast.success(`New Category ${categoryName} has been added`)
      setTimeout(() => window.location.reload(), 1200)
      // You can show a success message here
    } catch (error) {
      toast.error('Error creating product:', error.message)
      // You can show an error message here
    }
  }

  const [expandedCategory, setExpandedCategory] = useState(null)

  const handleToggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null) // Collapse if already expanded
    } else {
      setExpandedCategory(categoryId) // Expand if not expanded
    }
  }
  // delete Product by Id
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${api}categories/${categoryId}`)
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== categoryId),
      )
      setTimeout(() => window.location.reload(), 1200)
      toast.success(`${categoryId} has been deleted`)
    } catch (error) {
      console.error('Error deleting product:', error.message)
    }
  }

  // Display all Products Details
  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api}categories`)

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()

        setProducts(data)
        setLoading(false)
      } catch (error) {
        toast.error(error.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // delete Product by Id
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`${api}api/products/${productId}/${categoryId}`)
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId),
      )
      setTimeout(() => window.location.reload(), 1200)
      toast.success(`${productId} has been deleted`)
    } catch (error) {
      console.error('Error deleting product:', error.message)
    }
  }

  const hideEditForm = () => {
    setEditFormVisible(false)
  }

  const handleEditProduct = async (e) => {
    e.preventDefault()
    const newBody = {}

    if (EditProductData.name !== '') {
      newBody.name = EditProductData.name
    }
    if (EditProductData.price !== '') {
      newBody.price = EditProductData.price
    }
    if (EditProductData.description !== '') {
      newBody.description = EditProductData.description
    }
    if (EditProductData.outOfStock !== '') {
      newBody.outOfStock = EditProductData.outOfStock
    }
    if (EditProductData.categoryId !== '') {
      newBody.categoryId = EditProductData.categoryId
    }

    console.log(EditProductData)
    try {
      const apiUrl = `${api}api/products/${productId}`
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBody),
      })

      if (!response.ok) {
        // Handle non-OK responses (e.g., HTTP error status codes)
        console.error('Error:', response.status, response.statusText)
        toast.error(`An unexpected error occurred: ${response.statusText}`)
        return
      }

      const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json()
        toast.success('Product data updated successfully!')
        setProductData((prevData) => ({
          ...prevData,
          [productId]: { ...prevData[productId], ...EditProductData },
        }))
        hideEditForm()
        setTimeout(() => window.location.reload(), 1200)
      } else {
        // Handle non-JSON responses (e.g., HTML or other content types)
        console.error('Error: Unexpected content type:', contentType)
        toast.error('An unexpected error occurred: Invalid response format')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(`An unexpected error occurred: ${error.message}`)
    }
  }

  // update the category
  const handleEditCategorySubmit = async (e) => {
    e.preventDefault()
    const newBody = {}

    if (EditCategory.name !== '') {
      newBody.name = EditCategory.name
    }

    try {
      const apiUrl = `${api}categories/${categoryId}`
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBody),
      })

      const data = await response.json()

      toast.success('Category updated successfully!')
      setProductData((prevData) => ({
        ...prevData,
        [productId]: { ...prevData[productId], ...EditProductData },
      }))
      hideEditForm()
      setTimeout(() => window.location.reload(), 1200)
    } catch (error) {
      console.error('Error:', error)
      toast.error(`An unexpected error occurred: ${error.message}`)
    }
  }

  const handleConfirm = () => {
    // Logic for handling confirm action
    handleDeleteProduct(productId)
    setShowNotification(false)
  }
  const handleCategoryConfirm = () => {
    // Logic for handling confirm action
    handleDeleteCategory(categoryId)
    setCategoryShowNotification(false)
  }

  const handleCancel = () => {
    // Logic for handling cancel action
    setShowNotification(false)
  }
  const handleCategoryCancel = () => {
    // Logic for handling cancel action
    setCategoryShowNotification(false)
  }

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <Toaster />
      <div className="flex justify-between">
        <h1 className="text-4xl text-bold text-center">Medicines</h1>
        <div className="space-x-6">
          <button
            className="bg-[#4868B1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowCategory(true)}
          >
            Create Category
          </button>
          <button
            className="bg-[#4868B1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowForm(true)}
          >
            Create Medicine
          </button>
        </div>
        {showCategory && (
          <div className="fixed inset-0 flex justify-center items-center overflow-y-auto z-[1000]  bg-black bg-opacity-50">
            <div className="min-w-6xl w-[400px] p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Add New Category</h2>
                </div>
                <div className="">
                  <button
                    className="text-xl font-bold"
                    onClick={() => setShowCategory(false)}
                  >
                    X
                  </button>
                </div>
              </div>
              <form onSubmit={handleCategorySubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Add New Category"
                    onChange={(e) => setCategoryName(e.target.value)}
                    className=" w-[350px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-[350px] bg-[#4868B1] text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Submit Category
                </button>
              </form>
            </div>
          </div>
        )}
        {showForm && (
          <div className="fixed inset-0 flex z-[1000] items-center justify-center overflow-y-auto  bg-black bg-opacity-25">
            <div className="min-w-2xl p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold pb-10 ">
                  Add New Medicine
                </h2>
                <div className="flex items-end justify-end pb-6">
                  <button onClick={() => setShowForm(false)}>X</button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Medicine Name
                      </label>
                      <input
                        type="text"
                        id="medicineName"
                        name="medicineName"
                        placeholder="Medicine Name"
                        onChange={handleChange}
                        className="w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="price"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        className="w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="price"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="description"
                        placeholder="description"
                        onChange={handleChange}
                        className="w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="price"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Manufactured By
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="manufacturedBy"
                        placeholder="Manufactured By"
                        onChange={handleChange}
                        className="w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div></div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Potency
                      </label>
                      <input
                        type="text"
                        id="potency"
                        name="potency"
                        placeholder="Potency"
                        onChange={handleChange}
                        className="w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      ></input>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="potency"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Size
                      </label>
                      <select
                        id="size"
                        name="size"
                        onChange={handleChange}
                        className="w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      >
                        <option value="1ml">1 ml</option>
                        <option value="2ml">2 ml</option>
                        <option value="3ml">3 ml</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Category
                      </label>
                      <select
                        id="categoryId"
                        name="categoryId"
                        value={productData.categoryId}
                        onChange={handleChange} // Assuming handleChange is a function that handles the change
                        className="w-[400px] border rounded px-3 mb-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      >
                        <option value="">Select a category</option>
                        {products.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4 mt-4">
                      <label htmlFor="outOfStock" className="flex items-center">
                        <input
                          type="checkbox"
                          id="outOfStock"
                          name="outOfStock"
                          checked={productData.outOfStock}
                          onChange={handleChange}
                          className="mr-2 focus:ring"
                        />
                        <span className="text-gray-700">Out of Stock</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                <button
                  type="submit"
                  className="w-[400px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Add Product
                </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {loading === true ? (
        <Loading color={'#4868B1'} />
      ) : (
        <div className="overflow-x-auto mt-8">
          {products?.map((category, index) => (
            <div key={category._id} className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    className="text-2xl font-600 my-2 cursor-pointer text-[#4868B1] hover:underline"
                    onClick={() => handleToggleCategory(category._id)}
                  >
                    {index + 1}. {category.name}
                  </h2>
                </div>
                <div>
                  <div className="flex">
                    <button
                      className="  text-white font-bold p-3 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => {
                        setShowEditCategory(true)
                        setCategoryId(category._id)
                        setEditCategory({
                          ...EditCategory,
                          name: category.name,
                        })
                      }}
                    >
                      <FaPencil className="text-gray-700" />
                    </button>
                    <button
                      className=" text-white font-bold p-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => {
                        setCategoryId(category._id)
                        setCategoryShowNotification(true)
                      }}
                    >
                      <FaTrash className="text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
              {expandedCategory === category._id && (
                <div className="rounded-lg overflow-hidden text-center  shadow-lg mt-4">
                  <table className="w-full text-center  border divide-y divide-gray-200">
                    <thead className="bg-[#4868B1] text-white">
                      <tr>
                        <th className="py-3 pl-4 pr-2 ">Medicine Name</th>
                        <th className="py-3 pl-4 pr-2 ">Manufactured By</th>
                        <th className="py-3 px-2 ">Potency</th>
                        <th className="py-3 px-2 ">Size</th>
                        <th className="py-3 px-2 ">Price</th>
                        <th className="py-3 px-2 ">Description</th>
                        <th className="py-3 px-2 ">Out of Stock</th>
                        <th className="py-3 px-2 ">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-100">
                          <td className="py-3 pl-4 pr-2 border">
                            {product.medicineName}
                          </td>
                          <td className="py-3 px-2 border">
                            {product.manufacturedBy}
                          </td>
                          <td className="py-3 px-2 border">
                            {product.potency}
                          </td>
                          <td className="py-3 px-2 border">{product.size}</td>
                          <td className="py-3 px-2 border">₹{product.price}</td>
                          <td className="py-3 px-2 border">
                            {product.description}
                          </td>
                          <td className="py-3 px-2 border">
                            {product.outOfStock ? 'Yes' : 'No'}
                          </td>

                          <td className="py-3 px-2 border">
                            <div className="flex items-center justify-center">
                              <button
                                className=" hover:bg-blue-700 text-white font-bold  p-3 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => {
                                  setEditFormVisible(true)
                                  setProductId(product._id)
                                  setEditProductData({
                                    name: product.name,
                                    price: product.price,
                                    description: product.description,
                                    outOfStock: product.outOfStock,
                                    categoryId: product._id,
                                  })
                                }}
                              >
                                <FaPencil className="text-gray-700" />
                              </button>
                              <button
                                className=" text-white font-bold  p-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => {
                                  setShowNotification(true)
                                  setProductId(product._id)
                                  setCategoryId(category._id)
                                }}
                              >
                                <FaTrash className="text-gray-700" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showEditCategory && (
        <div className="fixed inset-0 flex justify-center items-center overflow-y-auto  bg-black bg-opacity-50">
          <div className="max-w-8xl w-96 p-8 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold pb-10 ">
                Edit Your Category
              </h2>
              <div className="pb-10">
                <button onClick={() => setShowEditCategory(false)}>X</button>
              </div>
            </div>
            <form onSubmit={handleEditCategorySubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={EditCategory.name}
                  placeholder="Update Category"
                  onChange={(e) =>
                    setEditCategory({
                      ...EditCategory,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-[#4868B1]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Update Category
              </button>
            </form>
          </div>
        </div>
      )}

      {editFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg max-w-7xl shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
              <div className="flex items-end justify-end pb-6">
                <button onClick={() => setEditFormVisible(false)}>X</button>
              </div>
            </div>
            <form onSubmit={handleEditProduct}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Product Name"
                  value={EditProductData.name}
                  onChange={(e) =>
                    setEditProductData({
                      ...EditProductData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={EditProductData.price}
                  placeholder="Price"
                  onChange={(e) =>
                    setEditProductData({
                      ...EditProductData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={EditProductData.description}
                  onChange={(e) =>
                    setEditProductData({
                      ...EditProductData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="outOfStock" className="flex items-center">
                  <input
                    type="checkbox"
                    id="outOfStock"
                    name="outOfStock"
                    checked={EditProductData.outOfStock}
                    onChange={(e) =>
                      setEditProductData({
                        ...EditProductData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="mr-2 focus:ring"
                  />
                  <span className="text-gray-700">Out of Stock</span>
                </label>
              </div>

              <div className="flex justify-end">
                <input
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  value="Submit"
                />
                <button
                  type="button"
                  onClick={hideEditForm}
                  className="px-4 py-2 ml-4 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        {showNotification && (
          <div className="bg-white border  top-0 fixed z-[1000] rounded-lg p-4 mt-4">
            <p className="text-gray-800 text-lg mb-2">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        {categoryShowNotification && (
          <div className="bg-white border  top-0 fixed z-[1000] rounded-lg p-4 mt-4">
            <p className="text-gray-800 text-lg mb-2">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCategoryConfirm}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCategoryCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
