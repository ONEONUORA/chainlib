#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_publish_and_get_book() {
    let env = Env::default();
    env.mock_all_auths();
    
    let contract_id = env.register(ChainLibContract, ());
    let client = ChainLibContractClient::new(&env, &contract_id);

    // Initialize the contract
    client.initialize();

    // Create test data
    let author = Address::generate(&env);
    let title = String::from_str(&env, "Test Book");
    let description = String::from_str(&env, "A test book for the e-library");
    let price = 1000i128; // 10.00 in stroops
    let content_hash = String::from_str(&env, "hash123456");

    // Publish a book
    let book_id = client.publish_book(&author, &title, &description, &price, &content_hash);
    assert_eq!(book_id, 1);

    // Get the book
    let book = client.get_book(&book_id).unwrap();
    assert_eq!(book.id, 1);
    assert_eq!(book.title, title);
    assert_eq!(book.author, author);
    assert_eq!(book.price, price);
    assert!(book.is_active);
}

#[test]
fn test_purchase_book() {
    let env = Env::default();
    env.mock_all_auths();
    
    let contract_id = env.register(ChainLibContract, ());
    let client = ChainLibContractClient::new(&env, &contract_id);

    // Initialize the contract
    client.initialize();

    // Create test data
    let author = Address::generate(&env);
    let buyer = Address::generate(&env);
    let title = String::from_str(&env, "Test Book");
    let description = String::from_str(&env, "A test book for the e-library");
    let price = 1000i128;
    let content_hash = String::from_str(&env, "hash123456");

    // Publish a book
    let book_id = client.publish_book(&author, &title, &description, &price, &content_hash);

    // Purchase the book
    let success = client.purchase_book(&buyer, &book_id);
    assert!(success);

    // Check if user has purchased the book
    let has_purchased = client.has_purchased(&buyer, &book_id);
    assert!(has_purchased);
}

#[test]
fn test_get_all_books() {
    let env = Env::default();
    env.mock_all_auths();
    
    let contract_id = env.register(ChainLibContract, ());
    let client = ChainLibContractClient::new(&env, &contract_id);

    // Initialize the contract
    client.initialize();

    // Create test data
    let author = Address::generate(&env);
    let title1 = String::from_str(&env, "Book 1");
    let title2 = String::from_str(&env, "Book 2");
    let description = String::from_str(&env, "Test description");
    let price = 1000i128;
    let content_hash = String::from_str(&env, "hash123");

    // Publish two books
    client.publish_book(&author, &title1, &description, &price, &content_hash);
    client.publish_book(&author, &title2, &description, &price, &content_hash);

    // Get all books
    let books = client.get_all_books();
    assert_eq!(books.len(), 2);
}
