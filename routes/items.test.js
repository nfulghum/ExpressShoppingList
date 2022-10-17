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
