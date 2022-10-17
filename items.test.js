process.env.NODE_ENV = "test";

const request = require("supertest");
const app = ("./app");
let items = require("./fakeDb");

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
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).get(`/items/ham`);
        expect(res.statusCode).toBe(404)
    })
})

describe("POST /items", () => {
    test("Creating a item", async () => {
        const res = await (request(app).post("/items")).send({ name: "blueberry" })
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ item: { name: "blueberry" } })
    })
    test("Responds with 400 if name is missing", async () => {
        const res = await (request(app).post("/items")).send({})
        expect(res.statusCode).toBe(500);

    })
})

describe("PATCH /items/:name", () => {
    test("Updating a items name", async () => {
        const res = await (request(app).patch(`/items/${pickles.name}`)).send({ name: "apples" })
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: { name: "apples" } });
    })
    test("Responds with 404 for invalid name", async () => {
        const res = await (request(app).patch(`/items/pork`)).send({ name: "apples" })
        expect(res.statusCode).toBe(404);
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