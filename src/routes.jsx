import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  ArrowLongLeftIcon,
  ArrowLeftOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/solid'
import {
  FaCartPlus,
  FaProductHunt,
  FaShop,
  FaUpload,
  FaUser,
  faUser,
} from 'react-icons/fa6'
import { SignIn, SignUp } from './pages/auth'
import ProductList from './pages/dashboard/ProductList'
import UserList from './pages/dashboard/User'
import AdminOrder from './pages/dashboard/AdminOrder'
import Profile from './pages/dashboard/profile'
import ExcelUploader from './pages/dashboard/excelUploader'

const icon = {
  className: 'w-5 h-5 text-inherit',
}
const token = localStorage.getItem('token')
export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <FaShop {...icon} />,
        name: 'Connect with',
        path: '/home',
        element: <ProductList />,
      },
      {
        icon: <FaUpload {...icon} />,
        name: 'Upload Product',
        path: '/excel',
        element: <ExcelUploader />,
      },

      {
        icon: <FaUser {...icon} />,
        name: 'Customers',
        path: '/users',
        element: <UserList />,
      },
      {
        icon: <FaCartPlus {...icon} />,
        name: 'Orders',
        path: '/order',
        element: <AdminOrder />,
      },

      {
        icon: <UserCircleIcon {...icon} />,
        name: 'Profile',
        path: '/Profile',
        element: <Profile />,
      },
    ],
  },
  token !== null
    ? {
        title: '',
        layout: 'auth',
        pages: [
          {
            icon: <ArrowLeftOnRectangleIcon {...icon} />,
            name: 'Logout',
          },
        ],
      }
    : {
        title: '',
        layout: 'auth',
        pages: [
          {
            icon: <ArrowLeftOnRectangleIcon {...icon} />,
            name: 'Sign-in',
            path: '/sign-in',
            element: <SignIn />,
          },
          {
            icon: <UserPlusIcon {...icon} />,
            name: 'Sign-up',
            path: '/sign-up',
            element: <SignUp />,
          },
        ],
      },
]

export default routes
