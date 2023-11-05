import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sidenav, DashboardNavbar, Configurator, Footer } from '../layout'
import routes from '../routes'
import adminRoutes from './adminRoutes'
import { useMaterialTailwindController } from '../context'
import { useStateContext } from '../context/StateContext'
import { logo } from '../assets'

export function Dashboard() {
  const [controller] = useMaterialTailwindController()
  const { sidenavType } = controller
  const { userType, setUserType } = useStateContext()
  const role = localStorage.getItem('role')

  useEffect(() => {
    setUserType(role)
  }, [])

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <Sidenav
        routes={userType === 'admin' ? adminRoutes : routes}
        brandImg={sidenavType === 'dark' ? logo : '/img/logo-ct-dark.png'}
        brandName="Cervicare"
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <Routes>
          {userType === 'admin'
            ? adminRoutes.map(({ layout, pages }) =>
                layout === 'dashboard'
                  ? pages.map(({ path, element, subRoutes }) => (
                      <Route key={path} path={path} element={element}>
                        {subRoutes &&
                          subRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                          ))}
                      </Route>
                    ))
                  : null,
              )
            : routes.map(({ layout, pages }) =>
                layout === 'dashboard'
                  ? pages.map(({ path, element, subRoutes }) => (
                      <Route key={path} path={path} element={element}>
                        {subRoutes &&
                          subRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                          ))}
                      </Route>
                    ))
                  : null,
              )}
        </Routes>
      </div>
    </div>
  )
}

Dashboard.displayName = '/src/layout/dashboard.jsx'

export default Dashboard
