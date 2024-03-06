const request = require('supertest');
const app = require('../app');

describe("Book API", () => {
    test("GET /books", async () => {
        const response = await request(app).get("/books");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("books");
    });

    test("GET /books/:id", async () => {
        const response = await request(app).get("/books/978-3-16-148410-0");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("book");
    });

    test("POST /books", async () => {
        const newBook = {
            title: "Test Book",
            amazon_url: "http://amazon.com/fakebook",
            author: "Test Author",
            isbn: "123-456-789",
            language: "English",
            pages: 100,
            publisher: "Test Publisher",
            year: 2020
        };
        const response = await request(app)
            .post("/books")
            .send(newBook);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("book");
    });


    test("should reject a book with invalid data", async () => {
        const invalidBook = {

            isbn: "999-21-58-10-7",
            amazon_url: "not a valid url",
        };
        const response = await request(app)
            .post("/books")
            .send(invalidBook);
        expect(response.statusCode).toBe(400);

        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toContain("instance requires property");
    });
});


