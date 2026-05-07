'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Download, Eye, Calendar } from 'lucide-react'

interface PurchasedBook {
  id: string
  title: string
  author: string
  description: string
  price: number
  purchased_at: string
  download_url: string
}

export default function LibraryPage() {
  const [books, setBooks] = useState<PurchasedBook[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPurchasedBooks()
  }, [])

  const fetchPurchasedBooks = async () => {
    try {
      // TODO: Replace with actual API call
      const mockBooks: PurchasedBook[] = [
        {
          id: '1',
          title: 'The Future of Blockchain',
          author: 'Alice Johnson',
          description: 'A comprehensive guide to understanding blockchain technology and its applications.',
          price: 9.99,
          purchased_at: '2024-01-20',
          download_url: '#'
        },
        {
          id: '2',
          title: 'Stellar Development Guide',
          author: 'Bob Smith',
          description: 'Learn how to build applications on the Stellar network.',
          price: 14.99,
          purchased_at: '2024-02-05',
          download_url: '#'
        }
      ]
      setBooks(mockBooks)
    } catch (error) {
      console.error('Error fetching purchased books:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (book: PurchasedBook) => {
    // TODO: Implement actual download logic
    console.log('Downloading book:', book.title)
    alert(`Downloading "${book.title}"...`)
  }

  const handleRead = (book: PurchasedBook) => {
    // TODO: Implement reader view
    console.log('Opening book:', book.title)
    alert(`Opening "${book.title}" in reader...`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">ChainLib</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/books" className="text-gray-500 hover:text-gray-900">Browse Books</Link>
              <Link href="/publish" className="text-gray-500 hover:text-gray-900">Publish</Link>
              <Link href="/library" className="text-indigo-600 font-medium">My Library</Link>
            </nav>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
          <p className="mt-2 text-gray-600">Your purchased books and reading history</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{books.length}</p>
                <p className="text-gray-600">Books Owned</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{books.length}</p>
                <p className="text-gray-600">Downloads Available</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">
                  ${books.reduce((total, book) => total + book.price, 0).toFixed(2)}
                </p>
                <p className="text-gray-600">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Books List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : books.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Your Books</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {books.map((book) => (
                <div key={book.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                      <p className="text-gray-600 mb-2">by {book.author}</p>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{book.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Purchased on {new Date(book.purchased_at).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>${book.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-6">
                      <button
                        onClick={() => handleRead(book)}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Read
                      </button>
                      <button
                        onClick={() => handleDownload(book)}
                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No books in your library</h3>
            <p className="mt-1 text-sm text-gray-500">Start building your collection by purchasing books.</p>
            <div className="mt-6">
              <Link
                href="/books"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Browse Books
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}