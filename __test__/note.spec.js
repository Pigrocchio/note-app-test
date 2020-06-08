const supertest = require("supertest");

const app = require("../app");
const request = supertest(app);
const User = require('../models/UserSchema')
const Note = require("../models/NoteSchema");



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

    it('Sould create a new user', async () => {
        await request
          .post("/api/user/newuser")
          .send({
            name: "Gino",
          })
            .expect(200);
        const user = await User.findOne({ name: "Gino" })
          expect(user.name).toBeTruthy();

    })

 it("Sould create a new note", async () => {
   await request
     .post("/api/user/newnote")
     .send({
         title: "TEST 1",
         content: 'Lorem Ipsum'
     })
     .expect(200)
   const note = await Note.findOne({ title: "TEST 1" });
     expect(note.title).toBeTruthy();
     expect(note.content).toBeTruthy();
 });
    
     it("retrive specific note", async (done) => {
    const response = await request.post("/api/user/newnote").send({
      title: "TEST 2",
      content: "Cave Canem",
    })
         expect(200)
         const id = response.body._id
         console.log(id)
         
         const  result  = await request.get(`/api/user/${id}`);
         const noteId = result.body._id;
         expect(id).toBe(noteId);


    done();
  });


afterEach(async () => {
    await User.deleteMany();
    await Note.deleteMany();
});

})