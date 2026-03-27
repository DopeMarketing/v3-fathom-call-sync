import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'V3 Fathom Call Sync',
  description: 'Sync Fathom transcripts to Google Drive',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-xl font-semibold text-gray-900">V3 Fathom Call Sync</h1>
                <nav className="flex space-x-4">
                  <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                  <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
                  <a href="/connections" className="text-gray-600 hover:text-gray-900">Connections</a>
                  <a href="/history" className="text-gray-600 hover:text-gray-900">History</a>
                  <a href="/settings" className="text-gray-600 hover:text-gray-900">Settings</a>
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}