import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="m-3 p-5">{children}</main>
    </>
  )
}