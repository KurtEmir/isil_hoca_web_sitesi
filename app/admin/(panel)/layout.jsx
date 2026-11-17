import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminPanelLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  )
}
