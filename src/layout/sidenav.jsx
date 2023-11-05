import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from '@material-tailwind/react'
import { useMaterialTailwindController, setOpenSidenav } from '../context'
import { Fragment, useState } from 'react'

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController()
  const { sidenavColor, sidenavType, openSidenav } = controller
  const sidenavTypes = {
    dark: 'bg-white',
    white: 'bg-white shadow-lg',
    transparent: 'bg-transparent',
  }

  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      // If the same dropdown is clicked again, close it
      setOpenDropdown(null)
    } else {
      setOpenDropdown(index)
    }
  }
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === 'dark' ? 'border-white/20' : 'border-blue-gray-50'
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="md" />
          <Typography
            variant="h6"
            color={sidenavType === 'dark' ? 'black' : 'black'}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, pages, title }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === 'dark' ? 'black' : 'blue-gray'}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, subRoutes }, index) => (
              <li key={name}>
                {subRoutes ? (
                  <Fragment>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center w-full gap-2 my-1 py-3 px-4 capitalize rounded-md ${
                        openDropdown === index ? 'text-black' : 'text-black'
                      } hover:bg-[#03A1A4] hover:text-white transition-colors duration-300 ${
                        openDropdown === index
                          ? 'hover:shadow-lg'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      {icon}
                      <Typography color="inherit" className="font-medium">
                        {name}
                      </Typography>
                    </button>
                    {openDropdown === index && (
                      <ul className="pl-6">
                        {subRoutes.map(({ icon, name, path }) => (
                          <li key={name}>
                            <NavLink to={`/${layout}${path}`}>
                              {({ isActive }) => (
                                <button
                                  variant={isActive ? 'gradient' : 'text'}
                                  style={{
                                    backgroundColor: isActive
                                      ? '#03A1A4'
                                      : 'transparent',
                                  }}
                                  className={`flex items-center w-full gap-2 my-1 py-3 px-4 capitalize rounded-md ${
                                    isActive ? 'text-white' : 'text-black'
                                  } hover:bg-blue-600 transition-colors duration-300 ${
                                    isActive
                                      ? 'hover:shadow-lg'
                                      : 'hover:bg-gray-200'
                                  }`}
                                  fullWidth
                                >
                                  {icon}
                                  <Typography
                                    color="inherit"
                                    className="font-medium"
                                  >
                                    {name}
                                  </Typography>
                                </button>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Fragment>
                ) : (
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <button
                        variant={isActive ? 'gradient' : 'text'}
                        style={{
                          backgroundColor: isActive ?  '#03A1A4' : 'transparent',
                        }}
                        className={`flex items-center w-full gap-2 my-1 py-3 px-4 capitalize rounded-md ${
                          isActive ? 'text-white' : 'text-black'
                        } hover:bg-blue-600 transition-colors duration-300 ${
                          isActive ? 'hover:shadow-lg' : 'hover:bg-gray-200'
                        }`}
                        fullWidth
                      >
                        {icon}
                        <Typography color="inherit" className="font-medium">
                          {name}
                        </Typography>
                      </button>
                    )}
                  </NavLink>
                )}
              </li>
            ))}{' '}
          </ul>
        ))}
      </div>
    </aside>
  )
}

Sidenav.defaultProps = {
  brandImg: '/img/logo-ct.png',
  brandName: 'Material Tailwind React',
}

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

Sidenav.displayName = '/src/widgets/layout/sidenav.jsx'
