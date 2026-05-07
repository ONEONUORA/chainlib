'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Search, Filter, Star } from 'lucide-react'

interface Book {
  id: string
  title: string
  author: string
  description: string
  price: number
  content_hash: string
  published_at: string
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      // TODO: Replace with actual API call
      const mockBooks: Book[] = [
        {
          id: '1',
          title: 'The Future of Blockchain',
          author: 'Alice Johnson',
          description: 'A comprehensive guide to understanding blockchain technology and its applications.',
          price: 9.99,
          content_hash: 'hash123',
          published_at: '2024-01-15'
        },
        {
          id: '2',
          title: 'Stellar Development Guide',
          author: 'Bob Smith',
          description: 'Learn how to build applications on the Stellar network.',
          price: 14.99,
          content_hash: 'hash456',
          published_at: '2024-02-01'
        },
        {
          id: '3',
          title: 'Decentralized Finance Explained',
          author: 'Carol Davis',
          description: 'Understanding DeFi protocols and their impact on traditional finance.',
          price: 12.99,
          content_hash: 'hash789',
          published_at: '2024-02-10'
        }
      ]
      setBooks(mockBooks)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              <Link href="/books" className="text-indigo-600 font-medium">Browse Books</Link>
              <Link href="/publish" className="text-gray-500 hover:text-gray-900">Publish</Link>
              <Link href="/library" className="text-gray-500 hover:text-gray-900">My Library</Link>
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
          <h1 className="text-3xl font-bold text-gray-900">Browse Books</h1>
          <p className="mt-2 text-gray-600">Discover amazing books published on the blockchain</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search books or authors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-2">by {book.author}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{book.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-gray-300" />
                      <span className="ml-2 text-sm text-gray-600">(4.0)</span>
                    </div>
                    <span className="text-lg font-bold text-indigo-600">${book.price}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/books/${book.id}`}
                      className="flex-1 bg-indigo-600 text-white text-center py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      View Details
                    </Link>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredBooks.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No books found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </main>
    </div>
  )
}