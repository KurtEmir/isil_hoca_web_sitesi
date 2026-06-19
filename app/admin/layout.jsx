import '../../styles/admin.css'
import AdminSidebar from '../../components/admin/AdminSidebar'

export const metadata = { title: 'Admin — Dr. Işıl Boy Ergül' }

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  )
}
