import { ToastContainer } from "react-toastify"
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collabudget',
  description: 'Gérez votre budget facilement',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <div>
          <ToastContainer position="bottom-right" newestOnTop={false} closeOnClick theme="dark" hideProgressBar={false} autoClose={5000} pauseOnFocusLoss={false} pauseOnHover={false} />
        </div>
      </body>
    </html>
  )
}
