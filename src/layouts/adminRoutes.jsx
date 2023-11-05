  import {
    PlusCircleIcon,
    ArrowRightOnRectangleIcon,
    UserPlusIcon,
    ArrowLongLeftIcon,
    ArrowLeftOnRectangleIcon,
    ShoppingCartIcon,
    ShoppingBagIcon,
    SwatchIcon,
    UserCircleIcon,
  } from '@heroicons/react/24/solid'
  
  import { SignIn, SignUp } from '../pages/auth'
  
  import { Profile } from '../pages/dashboard/profile'
  import {
    FaBagShopping,
    FaChartBar,
    FaChartGantt,
    FaChartLine,
    FaChartPie,
    FaChartSimple,
    FaFileVideo,
    FaFirstOrder,
    FaHouseMedical,
    FaKey,
    FaMeetup,
    FaMoneyBill,
    FaParagraph,
    FaRegCopyright,
    FaRegFlag,
    FaRegistered,
    FaShop,
    FaSquareSteam,
    FaUpload,
    FaUserDoctor,
    FaVideo,
  } from 'react-icons/fa6'
  import UploadContent from '../pages/dashboard/UploadContent'
  import UploadContentForm from '../pages/dashboard/UploadContentForm'
  import CurrentPage from '../pages/dashboard/CurrentPage'
  
  import StreamingCount from '../pages/dashboard/StreamingCount'
  import StreamingRevenue from '../pages/dashboard/StreamingRevenue'
  import HistoryPage from '../pages/dashboard/HistoryPage'
  import Home from '../pages/dashboard/home'
  const icon = {
    className: 'w-5 h-5 text-inherit',
  }
  
  const token = localStorage.getItem('token')
  
  export const adminRoutes = [
    {
      layout: 'dashboard',
      pages: [
        {
          icon: <FaHouseMedical {...icon} />,
          name: 'Dashboard',
          path: '/home',
          element: <Home />,
        },
        {
          icon: <FaUserDoctor {...icon} />,
          name: 'Consultation Requests',
          path: '/consultation',
          element: <UploadContent />,
        },
  
        {
          icon: <FaRegistered {...icon} />,
          name: 'Patients',
          subRoutes: [
            {
              icon: <FaUpload {...icon} />,
              name: 'Past Patients',
              path: '/current',
              element: <CurrentPage />,
            },
            {
              icon: <FaChartLine {...icon} />,
              name: 'New Patients',
              path: '/history',
              element: <HistoryPage />,
            },
          ],
        },
        {
          icon: <FaVideo {...icon} />,
          name: 'Create a Meeting',
          subRoutes: [
            {
              icon: <FaVideo {...icon} />,
              name: 'Video Call',
              path: '/streaming',
              element: <StreamingCount />,
            },
            {
              icon: <FaMoneyBill {...icon} />,
              name: 'Schedule a Meet Later',
              path: '/streaming-revenue',
              element: <StreamingRevenue />,
            },
          ],
        },
  
        {
          icon: <FaRegCopyright {...icon} />,
          name: 'Report',
          path: '/Profile',
          element: <UploadContentForm />,
        },
       
        {
          icon: <UserCircleIcon {...icon} />,
          name: 'Profile',
          path: '/Profile',
          element: <UploadContentForm />,
        },
      ],
    },
  
    token !== null
      ? {
          title: 'Other Options',
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
  
 
  
  export default adminRoutes
  
  