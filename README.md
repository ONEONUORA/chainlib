# ChainLib - Decentralized E-Library on Stellar

A decentralized e-library platform built on the Stellar blockchain where writers can publish their books and articles, and readers can access and download content.

## 🚀 Features

### For Writers
- Publish books and articles directly on the blockchain
- Set custom pricing for content
- Earn royalties directly without intermediaries
- Manage published content (enable/disable)

### For Readers
- Browse and search published content
- Purchase books with Stellar tokens
- Download and own content forever
- Read books directly in the web app

### Technical Features
- Decentralized storage on Stellar blockchain
- Smart contract-based ownership and access control
- Secure payment processing
- Content hashing for integrity verification

## 📁 Project Structure

```
chainlib/
├── frontend/           # Next.js web application
│   ├── src/app/       # App router pages
│   ├── components/    # Reusable React components
│   └── lib/          # Utility functions
├── backend/           # Rust API server
│   ├── src/          # Rust source code
│   └── Cargo.toml    # Rust dependencies
├── contracts/         # Soroban smart contracts
│   └── chainlib-contracts/
│       └── contracts/chainlib/  # Main contract
└── package.json      # Root package.json for scripts
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Rust, Axum, SQLx, Tokio
- **Smart Contracts**: Soroban (Stellar)
- **Blockchain**: Stellar Network
- **Database**: PostgreSQL (for caching and metadata)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Rust** (latest stable version)
- **Soroban CLI** (`cargo install --locked soroban-cli`)
- **PostgreSQL** (for backend database)
- **Git**

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository (if from git)
git clone <repository-url>
cd chainlib

# Install all dependencies
npm run setup
```

### 2. Environment Configuration

#### Backend (.env)
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

#### Frontend (.env.local)
```bash
cd frontend
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ID=your_contract_id_here
EOF
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb chainlib

# Update DATABASE_URL in backend/.env
# DATABASE_URL=postgresql://username:password@localhost:5432/chainlib
```

### 4. Build and Deploy Smart Contracts

```bash
# Build contracts
npm run build:contracts

# Deploy to Stellar testnet (requires Stellar account)
npm run deploy:contracts
```

### 5. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:3001
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run individual test suites
npm run test:frontend
npm run test:backend
npm run test:contracts
```

## 📖 API Documentation

### Backend Endpoints

- `GET /` - Health check
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get specific book
- `POST /api/books` - Create new book (requires authentication)

### Smart Contract Functions

- `initialize()` - Initialize contract
- `publish_book(author, title, description, price, content_hash)` - Publish book
- `purchase_book(buyer, book_id)` - Purchase book
- `get_book(book_id)` - Get book details
- `has_purchased(buyer, book_id)` - Check purchase status

## 🔧 Development

### Adding New Features

1. **Smart Contract**: Add functions in `contracts/chainlib-contracts/contracts/chainlib/src/lib.rs`
2. **Backend**: Add API endpoints in `backend/src/main.rs`
3. **Frontend**: Add pages/components in `frontend/src/`

### Code Style

- **Rust**: Use `cargo fmt` and `cargo clippy`
- **TypeScript**: Use `npm run lint` in frontend
- **Commits**: Use conventional commit messages

## 🚀 Deployment

### Smart Contracts
```bash
# Deploy to mainnet
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/chainlib.wasm \
  --source your-account \
  --network mainnet
```

### Backend
```bash
# Build for production
cargo build --release

# Run production server
./target/release/chainlib-backend
```

### Frontend
```bash
# Build for production
npm run build:frontend

# Deploy to Vercel, Netlify, or your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Create an issue for bug reports or feature requests
- Join our community discussions
- Check the documentation in each component's README

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Advanced search and filtering
- [ ] Author analytics dashboard
- [ ] Multi-language support
- [ ] Integration with IPFS for content storage
- [ ] Subscription-based reading plans
- [ ] Social features (reviews, ratings)

---

Built with ❤️ on the Stellar blockchain