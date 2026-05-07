import Link from 'next/link'
import { BookOpen, Users, Download, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">ChainLib</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/books" className="text-gray-500 hover:text-gray-900">Browse Books</Link>
              <Link href="/publish" className="text-gray-500 hover:text-gray-900">Publish</Link>
              <Link href="/library" className="text-gray-500 hover:text-gray-900">My Library</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Decentralized</span>
            <span className="block text-indigo-600">E-Library</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Publish, discover, and read books on the Stellar blockchain. Authors earn directly, readers own their content forever.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/books"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Browse Books
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/publish"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Start Publishing
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Publish Easily</h3>
              <p className="mt-2 text-base text-gray-500">
                Upload your books and articles directly to the blockchain with just a few clicks.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Direct Earnings</h3>
              <p className="mt-2 text-base text-gray-500">
                Authors receive payments directly without intermediaries taking a cut.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Own Your Content</h3>
              <p className="mt-2 text-base text-gray-500">
                Download and keep your purchased books forever. No subscription required.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Blockchain Security</h3>
              <p className="mt-2 text-base text-gray-500">
                All transactions and ownership records are secured by the Stellar blockchain.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 bg-white rounded-lg shadow px-6 py-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-indigo-600">1,000+</p>
              <p className="mt-2 text-base text-gray-500">Books Published</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-indigo-600">500+</p>
              <p className="mt-2 text-base text-gray-500">Active Authors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-indigo-600">10,000+</p>
              <p className="mt-2 text-base text-gray-500">Happy Readers</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-24">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">ChainLib</span>
            </div>
            <p className="text-gray-500">© 2024 ChainLib. Built on Stellar blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}