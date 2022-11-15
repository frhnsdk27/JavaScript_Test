const request = require("supertest")("http://restapi.adequateshop.com");
const expect = require("chai").expect;
const prompt = require('prompt-sync')({sigint: true});


const name = prompt('Enter name: ');
const email = prompt('Enter email: ');
const password = prompt('Enter Password: ')
const nameUser = prompt('Enter Name User: ')
const emailUser = prompt ('Enter Email User:')
const passwordUser = prompt ('Enter Password User:')

describe("POST /api/authaccount/registration", function () {
 var token
 //Registrasi
  it("create new Registration", async function () {
    const response = await request
      .post("/api/authaccount/registration")
      .send({
        "name":name,
        "email":email,
        "password":password

      })


    expect(response.status).to.eql(200)
    expect(response.body.code).to.eql(0)
    expect(response.body.data.Name).to.eql(name)
    expect(response.body.data.Email).to.eql(email)
  });

// Login
    it("Login", async function () {
        const response = await request
      .post("/api/authaccount/login")
      .send({
        "email":email,
        "password":password
      })

    expect(response.status).to.eql(200)
    expect(response.body.code).to.eql(0)
    expect(response.body.data.Name).to.eql(name)
    expect(response.body.data.Email).to.eql(email)
    expect(response.body.data.Token).to.not.eql(null)

    token = response.body.data.Token
    console.log(response.body)
  });
  //Create New User
  it("Create New User", async function() {
    const response = await request
    .post("/api/users")
    .send({
        "name": nameUser,
        "email": emailUser,
        "password": passwordUser
    })
    .set({
        Authorization: "Bearer "+token
    })

    expect(response.status).to.eql(201)
    expect(response.body.name).to.eql(nameUser)
    expect(response.body.email).to.eql(emailUser)

    })
});