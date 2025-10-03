import Link from 'next/link'
import { FaEthereum } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <FaEthereum className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Cloudchain</h1>
            </div>
            <nav>
              <Link 
                href="/wallet"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Open Wallet
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <FaEthereum className="h-24 w-24 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              Digital Wallet
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Send and receive Ethereum transactions securely on the Sepolia testnet. 
              Modern, fast, and built with the latest web technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600">
                Your private keys never leave your browser. MetaMask integration ensures maximum security.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast</h3>
              <p className="text-gray-600">
                Built with Next.js 15 and modern React patterns for lightning-fast performance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern</h3>
              <p className="text-gray-600">
                Clean UI, TypeScript safety, and cutting-edge blockchain technology.
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/wallet"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Get Started
            </Link>
            <a
              href="https://sepolia.etherscan.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              View on Etherscan
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            &copy; 2025 Cloudchain. All rights reserved. Built with Next.js 15 & Ethereum.
          </p>
        </div>
      </footer>
    </div>
  )
}