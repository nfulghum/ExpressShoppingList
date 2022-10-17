process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app")
let items = require("../fakeDb")

let apples = { name: "apples", price: 1.20 };

beforeEach(() => {
    items.push(apples);
});

afterEach(() => {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items: [apples] })
    })
})