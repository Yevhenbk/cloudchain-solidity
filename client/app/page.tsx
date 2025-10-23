import Link from 'next/link'
import { FaEthereum } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <FaEthereum className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Cloudchain</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <h2 className="text-6xl font-bold text-slate-900 leading-tight">
              Modern Crypto
              <br />
              <span className="text-slate-600">Transactions</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Send Ethereum transactions with messages and GIFs on Sepolia testnet. 
              Clean, simple, and secure.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="/wallet"
              className="inline-block bg-slate-900 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-slate-900/10"
            >
              Open Wallet
            </Link>
          </div>

          {/* Features Grid */}
          <div className="pt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-left">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-5">
                <FaEthereum className="h-7 w-7 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">MetaMask Integration</h3>
              <p className="text-slate-600 leading-relaxed">
                Seamless wallet connection with MetaMask for secure transactions.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-left">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-5 text-3xl">
                🎬
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visual Transactions</h3>
              <p className="text-slate-600 leading-relaxed">
                Add keywords to your transactions and see them come alive with GIFs.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-left">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-5 text-3xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Modern Tech</h3>
              <p className="text-slate-600 leading-relaxed">
                Built with Next.js 15, TypeScript, and deployed on Sepolia testnet.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-slate-500">
            <p>&copy; 2025 Cloudchain. Built with modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}