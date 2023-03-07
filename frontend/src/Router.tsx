import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { LoginView } from "./modules/auth/views/LoginView"
import { DashboardView } from "./modules/dashboard/views/DashboardView"
import { UsersView } from "./modules/users/views/UsersView"
import { DashboardLayout } from "./shared/layout/DashboardLayout"

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/users" element={<UsersView />} />
      </Route>
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}