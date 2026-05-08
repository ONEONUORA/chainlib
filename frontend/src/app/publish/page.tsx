"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Upload, DollarSign, FileText } from "lucide-react";

export default function PublishPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "technology",
    content: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      content: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual publishing logic
      console.log("Publishing book:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Book published successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "technology",
        content: null,
      });
    } catch (error) {
      console.error("Error publishing book:", error);
      alert("Error publishing book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                ChainLib
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/books" className="text-gray-500 hover:text-gray-900">
                Browse Books
              </Link>
              <Link href="/publish" className="text-indigo-600 font-medium">
                Publish
              </Link>
              <Link
                href="/library"
                className="text-gray-500 hover:text-gray-900"
              >
                My Library
              </Link>
            </nav>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Publish Your Book
          </h1>
          <p className="mt-2 text-gray-600">
            Share your knowledge with the world and earn directly from your
            readers
          </p>
        </div>

        {/* Publishing Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your book title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Describe your book, what readers will learn, and why they should read it"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  Price (USD) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="9.99"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="business">Business</option>
                  <option value="science">Science</option>
                  <option value="arts">Arts & Literature</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FileText className="inline h-4 w-4 mr-1" />
                Book Content *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="content"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="content"
                        name="content"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.epub,.txt,.docx"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, EPUB, TXT, DOCX up to 50MB
                  </p>
                  {formData.content && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {formData.content.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Publishing Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Publishing Information
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your book will be stored securely on the blockchain</li>
                <li>• Readers will purchase access using Stellar tokens</li>
                <li>• You&apos;ll receive payments directly to your wallet</li>
                <li>
                  • Publishing fee: 0.5 XLM (covers blockchain transaction
                  costs)
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Publish Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Supported Formats
              </h4>
              <ul className="space-y-1">
                <li>• PDF - Best for formatted books</li>
                <li>• EPUB - Standard e-book format</li>
                <li>• TXT - Plain text documents</li>
                <li>• DOCX - Microsoft Word documents</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pricing Tips</h4>
              <ul className="space-y-1">
                <li>• Research similar books in your category</li>
                <li>• Consider your book&apos;s length and depth</li>
                <li>• Start with competitive pricing</li>
                <li>• You can update pricing later</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
