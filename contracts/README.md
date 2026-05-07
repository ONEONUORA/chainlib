# ChainLib Smart Contracts

Soroban smart contracts for the ChainLib e-library platform on Stellar blockchain.

## Features

- **Book Publishing**: Authors can publish books with metadata and content hashes
- **Purchase System**: Readers can purchase books and gain access to content
- **Access Control**: Only purchased books can be accessed by readers
- **Author Management**: Authors can manage their published books

## Contract Functions

### Core Functions
- `initialize()` - Initialize the contract
- `publish_book(author, title, description, price, content_hash)` - Publish a new book
- `get_book(book_id)` - Get book details
- `get_all_books()` - Get all active books
- `purchase_book(buyer, book_id)` - Purchase a book
- `has_purchased(buyer, book_id)` - Check if user has purchased a book

### Management Functions
- `update_book_status(author, book_id, is_active)` - Enable/disable a book
- `get_books_by_author(author)` - Get all books by an author

## Setup

1. Install Soroban CLI:
   ```bash
   cargo install --locked soroban-cli
   ```

2. Build the contract:
   ```bash
   cd chainlib-contracts
   soroban contract build
   ```

3. Run tests:
   ```bash
   cargo test
   ```

4. Deploy to testnet:
   ```bash
   soroban contract deploy \
     --wasm target/wasm32-unknown-unknown/release/chainlib.wasm \
     --source alice \
     --network testnet
   ```

## Data Structures

### Book
- `id`: Unique book identifier
- `title`: Book title
- `author`: Author's Stellar address
- `description`: Book description
- `price`: Price in stroops
- `content_hash`: IPFS or content hash
- `published_at`: Publication timestamp
- `is_active`: Whether the book is available for purchase

### Purchase
- `book_id`: ID of purchased book
- `buyer`: Buyer's Stellar address
- `purchased_at`: Purchase timestamp
- `price_paid`: Amount paid

## Development

- Format code: `cargo fmt`
- Lint code: `cargo clippy`
- Run tests: `cargo test`