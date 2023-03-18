import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { LoginView } from "./modules/auth/views/LoginView"
import { ContView } from "./modules/cont/views/ContView"
import { DetailContView } from "./modules/cont/views/DetailContView"
import { DashboardView } from "./modules/dashboard/views/DashboardView"
import { UsersView } from "./modules/users/views/UsersView"
import { DashboardLayout } from "./shared/layout/DashboardLayout"

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
    {/*   <Route element={<DashboardLayout><Outlet /></DashboardLayout>}> */}
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/cont" element={<ContView />} />
        <Route path="/cont/detail" element={<DetailContView idasiento="aun no se que poner ni como" />} />
     {/*  </Route> */}
      <Route path='*' element={<Navigate to='/cont' />} />
    </Routes>
  )
}