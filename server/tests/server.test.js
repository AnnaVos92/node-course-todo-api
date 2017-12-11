const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const sampleTodos = [{
    text: 'some text'
  }, {
    text: 'some more text'
}];

// beforeEach: testing lifecycle method that 
// lets us run code before test cases start
beforeEach((done) => {
  Todo.remove({}).then(() => {  // remove all todos before moving on
    return Todo.insertMany(sampleTodos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    // request appropriate app (server.js) and post text to /todos
    request(app)
      .post('/todos')   // post to /todos
      .send({text})    // supertest will convert object to json
      .expect(200)      // expect code of 200 (ok)
      .expect((res) => {      // expect function result to be true
        expect(res.body.text).toBe(text);  // expect body text to equal var text
      })
      .end((err, res) => {
        if (err){
          return done(err);     // return to break (if err)
        };

        Todo.find({text}).then((todos) => {   // find all todos, then
          expect(todos.length).toBe(1)  // expect number of todos to be 1 (because one todo was added in this test)
          expect(todos[0].text).toBe(text); // expect this todo text to equal the sent todo text
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        };

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});