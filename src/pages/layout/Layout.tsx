import React, { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>{children}</div>
}

export default Layout
