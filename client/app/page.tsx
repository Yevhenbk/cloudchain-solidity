import Link from 'next/link'
import { FaEthereum } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <FaEthereum className="h-8 w-8 text-gray-900" />
            <h1 className="text-2xl font-semibold text-gray-900">Cloudchain</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-light text-gray-900">
              Modern Crypto
              <br />
              <span className="font-normal">Transactions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Send Ethereum transactions with messages and GIFs on Sepolia testnet. 
              Clean, simple, and secure.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="/wallet"
              className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Open Wallet
            </Link>
          </div>

          {/* Features */}
          <div className="pt-16 grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FaEthereum className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">MetaMask Integration</h3>
              <p className="text-gray-600">Seamless wallet connection with MetaMask for secure transactions.</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-lg">🎬</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Visual Transactions</h3>
              <p className="text-gray-600">Add keywords to your transactions and see them come alive with GIFs.</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-lg">⚡</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Modern Tech</h3>
              <p className="text-gray-600">Built with Next.js 15, TypeScript, and deployed on Sepolia testnet.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2025 Cloudchain. Built with modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}