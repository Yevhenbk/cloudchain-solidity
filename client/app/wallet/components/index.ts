// Transaction components - Organized by responsibility and render strategy

// Main container (client component)
export { TransactionList } from './TransactionList'

// Individual transaction display (server component)
export { TransactionCard } from './TransactionCard'

// Interactive elements (client components)
export { RefreshButton } from './RefreshButton'

// Wallet wrapper (dynamic client component)
export { WalletWrapper } from './WalletWrapper'

// State presentation (server components)
export { EmptyState, LoadingState } from './TransactionStates'
export { ErrorAlert } from './ErrorAlert'
export { TransactionCounter } from './TransactionCounter'

/**
 * Component Architecture:
 * 
 * TransactionList (Client) - Container with minimal client logic
 * ├── RefreshButton (Client) - Handles user interactions
 * ├── ErrorAlert (Server) - Pure error presentation
 * ├── LoadingState (Server) - Pure loading presentation  
 * ├── EmptyState (Server) - Pure empty state presentation
 * ├── TransactionCard[] (Server) - Pure transaction presentation
 * └── TransactionCounter (Server) - Pure count presentation
 * 
 * Benefits:
 * - Server components are rendered on server (better performance)
 * - Client components only where interaction is needed
 * - Clear separation of concerns
 * - Easy to test and maintain
 * - Follows React Server Component best practices
 */