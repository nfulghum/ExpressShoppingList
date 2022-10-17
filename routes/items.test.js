process.env.NODE_ENV = "test";

const request = require("supertest");
const app = ("../app");
let items = require("../fakeDb");

let pickles = { name: "pickles", price: 1.20 };

beforeEach(() => {
    items.push(pickles);
})

afterEach(() => {
    items.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items: [pickles] })
    })
})

describe("GET /items", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${pickles.name}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ item: pickles })
    })
})

describe("POST /items", () => {
    test("Creating a item", async () => {
        const res = await (request(app).post("/items")).send({ name: "blueberry", price: 3.00 })
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ item: { name: "blueberry", price: 3.00 } })
    })
})

describe("PATCH /items/:name", () => {
    test("Updating a items name", async () => {
        const res = await (request(app).patch(`/items/${pickles.name}`)).send({ name: "oranges", price: pickles.price })
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: { name: "oranges", price: pickles.price } });
    })
})

describe("DELETE /items/:name", () => {
    test("Deleting a item", async () => {
        const res = await request(app).delete(`/items/${pickles.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Deleted' })
    })
    test("Responds with 404 for deleting invalid item", async () => {
        const res = await request(app).delete(`/items/ham`);
        expect(res.statusCode).toBe(404);
    })
})