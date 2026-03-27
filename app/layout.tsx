import './globals.css'

export const metadata = {
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
      <body>
        <header className="border-b bg-white px-6 py-4">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-xl font-semibold">V3 Fathom Call Sync</h1>
          </div>
        </header>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}