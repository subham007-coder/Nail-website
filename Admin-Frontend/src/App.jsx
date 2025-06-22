import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Contact from './pages/Contact'
import ContactSubmissions from './pages/ContactSubmissions'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="contact" element={<Contact />} />
          <Route path="contact-submissions" element={<ContactSubmissions />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
