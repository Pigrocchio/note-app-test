const supertest = require("supertest");

const app = require("../app");
const request = supertest(app);


describe("Test the root path", () => {

    it("tests the base route and returns true for status", async done => {
        const response = await request.get("/");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Welcome to note taking app list");
        done();
    });


    it("Gets the test endpoint", async (done) => {
        const response = await request.get("/api/user/allnotes");
        expect(response.status).toBe(200);
        done();
    })

    test('Sould create a new user', async () => {
        await request
          .post("/api/user/newuser")
          .send({
            name: "Gino",
          })
          .expect(200);
    })
})