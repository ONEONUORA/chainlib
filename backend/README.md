# ChainLib Backend

Rust backend server for the ChainLib e-library platform.

## Features

- RESTful API for book management
- Integration with Stellar blockchain
- Content hashing and storage
- User authentication and authorization

## Setup

1. Install Rust and Cargo
2. Install dependencies:
   ```bash
   cargo build
   ```

3. Create a `.env` file with your configuration:
   ```
   DATABASE_URL=postgresql://username:password@localhost/chainlib
   STELLAR_NETWORK=testnet
   STELLAR_SECRET_KEY=your_secret_key
   ```

4. Run the server:
   ```bash
   cargo run
   ```

The server will start on `http://localhost:3001`

## API Endpoints

- `GET /` - Health check
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book

## Development

- Run tests: `cargo test`
- Format code: `cargo fmt`
- Lint code: `cargo clippy`