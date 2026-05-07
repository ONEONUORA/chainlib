#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, String, Vec, Address, Symbol};

#[derive(Clone)]
#[contracttype]
pub struct Book {
    pub id: u64,
    pub title: String,
    pub author: Address,
    pub description: String,
    pub price: i128,
    pub content_hash: String,
    pub published_at: u64,
    pub is_active: bool,
}

#[derive(Clone)]
#[contracttype]
pub struct Purchase {
    pub book_id: u64,
    pub buyer: Address,
    pub purchased_at: u64,
    pub price_paid: i128,
}

const BOOKS: Symbol = symbol_short!("BOOKS");
const PURCHASES: Symbol = symbol_short!("PURCHASE");
const BOOK_COUNT: Symbol = symbol_short!("B_COUNT");

#[contract]
pub struct ChainLibContract;

#[contractimpl]
impl ChainLibContract {
    /// Initialize the contract
    pub fn initialize(env: Env) {
        env.storage().instance().set(&BOOK_COUNT, &0u64);
    }

    /// Publish a new book
    pub fn publish_book(
        env: Env,
        author: Address,
        title: String,
        description: String,
        price: i128,
        content_hash: String,
    ) -> u64 {
        author.require_auth();

        let mut book_count: u64 = env.storage().instance().get(&BOOK_COUNT).unwrap_or(0);
        book_count += 1;

        let book = Book {
            id: book_count,
            title,
            author: author.clone(),
            description,
            price,
            content_hash,
            published_at: env.ledger().timestamp(),
            is_active: true,
        };

        env.storage().persistent().set(&(BOOKS, book_count), &book);
        env.storage().instance().set(&BOOK_COUNT, &book_count);

        book_count
    }

    /// Get book details
    pub fn get_book(env: Env, book_id: u64) -> Option<Book> {
        env.storage().persistent().get(&(BOOKS, book_id))
    }

    /// Get all books (returns book IDs)
    pub fn get_all_books(env: Env) -> Vec<u64> {
        let book_count: u64 = env.storage().instance().get(&BOOK_COUNT).unwrap_or(0);
        let mut books = Vec::new(&env);
        
        for i in 1..=book_count {
            if let Some(book) = Self::get_book(env.clone(), i) {
                if book.is_active {
                    books.push_back(i);
                }
            }
        }
        
        books
    }

    /// Purchase a book
    pub fn purchase_book(env: Env, buyer: Address, book_id: u64) -> bool {
        buyer.require_auth();

        let book = match Self::get_book(env.clone(), book_id) {
            Some(book) => book,
            None => return false,
        };

        if !book.is_active {
            return false;
        }

        // TODO: Implement payment logic with Stellar tokens
        // For now, we'll just record the purchase

        let purchase = Purchase {
            book_id,
            buyer: buyer.clone(),
            purchased_at: env.ledger().timestamp(),
            price_paid: book.price,
        };

        let purchase_key = (PURCHASES, buyer, book_id);
        env.storage().persistent().set(&purchase_key, &purchase);

        true
    }

    /// Check if user has purchased a book
    pub fn has_purchased(env: Env, buyer: Address, book_id: u64) -> bool {
        let purchase_key = (PURCHASES, buyer, book_id);
        env.storage().persistent().has(&purchase_key)
    }

    /// Update book status (only author can do this)
    pub fn update_book_status(env: Env, author: Address, book_id: u64, is_active: bool) -> bool {
        author.require_auth();

        let mut book = match Self::get_book(env.clone(), book_id) {
            Some(book) => book,
            None => return false,
        };

        if book.author != author {
            return false;
        }

        book.is_active = is_active;
        env.storage().persistent().set(&(BOOKS, book_id), &book);

        true
    }

    /// Get books by author
    pub fn get_books_by_author(env: Env, author: Address) -> Vec<u64> {
        let book_count: u64 = env.storage().instance().get(&BOOK_COUNT).unwrap_or(0);
        let mut author_books = Vec::new(&env);
        
        for i in 1..=book_count {
            if let Some(book) = Self::get_book(env.clone(), i) {
                if book.author == author {
                    author_books.push_back(i);
                }
            }
        }
        
        author_books
    }
}

mod test;
