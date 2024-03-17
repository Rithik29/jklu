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
import UploadContent from './pages/dashboard/UploadContent'
import Temp from './pages/dashboard/temp'
import Heropage from  './dashboard/Hero'
import Request from './pages/dashboard/request'
import Req from './pages/dashboard/req'


const icon = {
  className: 'w-5 h-5 text-inherit',
}
const token = localStorage.getItem('token')
export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: 'Home',
        path: '/home',
        element: <Heropage />,
      },
      {
        icon: <FaUpload {...icon} />,
        name: 'Evaluation',
        path: '/eval',
        element: <UploadContent />,
      },

      {
        icon: <FaUser {...icon} />,
        name: 'Patients',
        path: '/patients',
        element: <UserList />,
      },
      {
        icon: <PlusCircleIcon {...icon} />,
        name: 'Request a Meeting',
        path: '/meet',
        element: <Request />,
      },

      {
        icon: <PencilSquareIcon {...icon} />,
        name: 'Request',
        path: '/request',
        element: <Req />,
      },

      {
        icon: <UserCircleIcon {...icon} />,
        name: 'Profile',
        path: '/Profile',
        element: <Profile />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'PaP Test',
        path: '/temp',
        element: <Temp />,
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
