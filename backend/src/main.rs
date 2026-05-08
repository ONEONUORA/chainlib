use axum::{
    extract::Query,
    http::StatusCode,
    response::Json,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tower_http::cors::CorsLayer;
use tracing::{info, Level};

#[derive(Debug, Serialize, Deserialize)]
struct Book {
    id: String,
    title: String,
    author: String,
    description: String,
    price: f64,
    content_hash: String,
    published_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
struct CreateBookRequest {
    title: String,
    author: String,
    description: String,
    price: f64,
    content: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct ApiResponse<T> {
    success: bool,
    data: Option<T>,
    message: String,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize tracing
    tracing_subscriber::fmt().with_max_level(Level::INFO).init();

    // Load environment variables
    dotenv::dotenv().ok();

    // Build our application with routes
    let app = Router::new()
        .route("/", get(health_check))
        .route("/api/books", get(get_books))
        .route("/api/books", post(create_book))
        .route("/api/books/:id", get(get_book))
        .layer(CorsLayer::permissive());

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await?;
    info!("ChainLib Backend server running on http://0.0.0.0:3001");

    axum::serve(listener, app).await?;

    Ok(())
}

async fn health_check() -> Json<ApiResponse<String>> {
    Json(ApiResponse {
        success: true,
        data: Some("ChainLib Backend is running".to_string()),
        message: "Health check successful".to_string(),
    })
}

async fn get_books(Query(_params): Query<HashMap<String, String>>) -> Json<ApiResponse<Vec<Book>>> {
    // TODO: Implement database query
    let books = vec![Book {
        id: "1".to_string(),
        title: "Sample Book".to_string(),
        author: "John Doe".to_string(),
        description: "A sample book for testing".to_string(),
        price: 9.99,
        content_hash: "hash123".to_string(),
        published_at: chrono::Utc::now(),
    }];

    Json(ApiResponse {
        success: true,
        data: Some(books),
        message: "Books retrieved successfully".to_string(),
    })
}

async fn get_book(
    axum::extract::Path(id): axum::extract::Path<String>,
) -> Result<Json<ApiResponse<Book>>, StatusCode> {
    // TODO: Implement database query
    if id == "1" {
        let book = Book {
            id: "1".to_string(),
            title: "Sample Book".to_string(),
            author: "John Doe".to_string(),
            description: "A sample book for testing".to_string(),
            price: 9.99,
            content_hash: "hash123".to_string(),
            published_at: chrono::Utc::now(),
        };

        Ok(Json(ApiResponse {
            success: true,
            data: Some(book),
            message: "Book retrieved successfully".to_string(),
        }))
    } else {
        Err(StatusCode::NOT_FOUND)
    }
}

async fn create_book(Json(payload): Json<CreateBookRequest>) -> Json<ApiResponse<Book>> {
    // TODO: Implement content hashing and blockchain storage
    let book = Book {
        id: uuid::Uuid::new_v4().to_string(),
        title: payload.title,
        author: payload.author,
        description: payload.description,
        price: payload.price,
        content_hash: format!("hash_{}", uuid::Uuid::new_v4()),
        published_at: chrono::Utc::now(),
    };

    Json(ApiResponse {
        success: true,
        data: Some(book),
        message: "Book created successfully".to_string(),
    })
}
