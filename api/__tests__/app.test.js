const app = require("../app.js");
const seed = require("../../db/seed.js");
const request = require("supertest");
const db = require("../../db/connection.js");
const testData = require("../../db/test-data/index.js");

beforeEach(() => {
    return seed(testData);
});

afterAll(() => {
    return db.end();
});

//getSumos
describe("/api/sumos", () => {
    describe("getSumos", () => {
    test("200: responds with an array of sumos", async () => {
      const req = await request(app).get("/api/sumos").expect(200);
      expect(Array.isArray(req.body.sumos)).toBe(true);
    });
    test("200: each element in the array contains the correct key-value pairs", async () => {
      const { body } = await request(app).get("/api/sumos").expect(200);
      expect(body.sumos.length).toBeGreaterThan(0);
      body.sumos.forEach((sumo) => {
        expect(sumo).toMatchObject({
          id: expect.any(Number),
          sumoapi_id: expect.any(Number),
          sumodb_id: expect.any(Number),
          nsk_id: expect.any(Number),
          shikona_en: expect.any(String),
          shikona_jp: expect.any(String),
          current_rank: expect.any(String),
          heya: expect.any(String),
          birth_date: expect.any(String),
          shusshin: expect.any(String),
          height: expect.any(String),
          weight: expect.any(String),
          debut: expect.any(String),
        });
      });
    });
});
    describe('postSumo', () => {
        test("201: responds with an object containing the added sumo", async () => {
            const sendSumo = {
                sumoapi_id: 10,
                sumodb_id: 10,
                nsk_id: 10,
                shikona_en: "niamh",
                shikona_jp: "明るい",
                current_rank: "twenty",
                heya: "tokyo",
                birth_date: "1994-08-02T04:00:00.000Z",
                shusshin: "tokyo",
                height: 2.2,
                weight: 2.2,
                debut: "2015"
            }
            const req = await request(app).post('/api/sumos').send(sendSumo).expect(201)
            const {sumo} = req.body
            expect(typeof sumo).toBe('object');
            expect(sumo).toMatchObject({
                id: expect.any(Number),
                sumoapi_id: 10,
                sumodb_id: 10,
                nsk_id: 10,
                shikona_en: "niamh",
                shikona_jp: "明るい",
                current_rank: "twenty",
                heya: "tokyo",
                birth_date: expect.any(String),
                shusshin: "tokyo",
                height: "2.2",
                weight: "2.2",
                debut: "2015"
            })
        })
        test("400: responds with a message explaining a bad request has been made when the sumo is empty", async () => {
            const sendSumo = {}
            const req = await request(app).post('/api/sumos').send(sendSumo).expect(400)
            const {msg} = req.body
            expect(msg).toBe("Invalid input")
        })
    })
});

//getSumoById
describe("/api/sumos/:id", () => {
    describe("getSumoById", () => {
        test("200: responds with a sumo object with the corresponding id", async () => {
            const data = await request(app).get("/api/sumos/1").expect(200);
            expect(data.body.sumo).toMatchObject({
                id: 1,
                sumoapi_id: 218,
                sumodb_id: 300,
                nsk_id: 1306,
                shikona_en: "Dairaido",
                shikona_jp: "大雷童(だいらいどう)",
                current_rank: "Sandanme 37 East",
                heya: "Takadagawa",
                birth_date: expect.any(String),
                shusshin: "Fukuoka-ken, Onojo-shi",
                height: "177",
                weight: "151",
                debut: "199603",
            });
        });
        test("404: responds with a not found message", async () => {
            const req = await request(app).get("/api/sumos/12345678").expect(404);
            expect(req.body.msg).toBe("Rikishi not found")
        })
        test("400: responds with an invalid id message", async () => {
            const req = await request(app).get("/api/sumos/not_an_id").expect(400);
            expect(req.body.msg).toBe("Invalid input")
        })
    });
});

//postSumo

//patchSumo

//deleteSumo

//getStables

//getStableById

//postStable

//patchStable

//deleteStable

//getUsers

//getUserById

//postUser

//patchUser

//deleteUser
