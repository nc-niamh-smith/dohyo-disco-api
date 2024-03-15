const db = require('../connection.js');
const seed = require('../seed.js');
const data = require('../test-data');

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("seed", () => {
    describe("stables table", () => {
        test("stables table exists", async () => {
            const query = await db.query(
                `SELECT EXISTS (
                    SELECT FROM
                    information_schema.tables
                    WHERE
                    table_name = 'stables'
                );`
            )
            const exists = query.rows[0].exists;
            expect(exists).toBe(true);
        })
        test("stables table has a stable_name column as VARCHAR", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'stables'
                AND column_name = 'stable_name';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("stable_name");
            expect(column.data_type).toBe("character varying");
        });
        test("stables has a stable_id column as a serial primary key", async () => {
            const query = await db.query(
                `SELECT column_name, data_type, column_default
                FROM information_schema.columns
                WHERE table_name = 'stables'
                AND column_name = 'stable_id';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("stable_id");
            expect(column.data_type).toBe("integer");
            expect(column.column_default).toBe(
                "nextval('stables_stable_id_seq'::regclass)"
            );
        });
        test('stables has a ranking column as an integer that initialises as 0', async () => {
            const query = await db.query(
                `SELECT column_name, data_type, column_default
                FROM information_schema.columns
                WHERE table_name = 'stables'
                AND column_name = 'ranking';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("ranking");
            expect(column.data_type).toBe("integer");
            expect(column.column_default).toBe("0");
        })
        test.only("stables table has a rikishi column as a reference to rikishi table", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'stables'
                AND column_name = 'rikishi';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("rikishi");
            expect(column.data_type).toBe("integer");
        });
        test('insert into stables table', async () => {
                const stables = await db.query(`SELECT * FROM stables;`);
                expect(stables.rows).toHaveLength(3);
                stables.rows.forEach((stable) => {
                    expect(stable).toHaveProperty("stable_name");
                    expect(stable).toHaveProperty("stable_id")
                    expect(stable).toHaveProperty("ranking")
                })
        })
    });
    describe("users table", () => {
        test("users table exists", async () => {
            const query = await db.query(
                `SELECT EXISTS (
                    SELECT FROM
                    information_schema.tables
                    WHERE
                    table_name = 'users'
                );`
            )
            const exists = query.rows[0].exists;
            expect(exists).toBe(true);
        });
        test("users table has a username column as VARCHAR", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'users'
                AND column_name = 'username';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("username");
            expect(column.data_type).toBe("character varying");
        });
        test("users table has a stable_name column as a reference to stables table", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'users'
                AND column_name = 'stable_name';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("stable_name");
            expect(column.data_type).toBe("character varying");
        });
        test("users table has a user_id column as a serial primary key", async () => {
            const query = await db.query(
                `SELECT column_name, data_type, column_default
                FROM information_schema.columns
                WHERE table_name = 'users'
                AND column_name = 'user_id';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("user_id");
            expect(column.data_type).toBe("integer");
            expect(column.column_default).toBe(
                "nextval('users_user_id_seq'::regclass)"
            );
        });
        test('insert data into users table', async () => {
            const users = await db.query(`SELECT * FROM users;`);
            expect(users.rows).toHaveLength(3);
            users.rows.forEach((user) => {
                expect(user).toHaveProperty("username");
                expect(user).toHaveProperty("user_id")
                expect(user).toHaveProperty("stable_name")
            });
        });
    });
    describe("rikishi table", () => {
        test("rikishi table exists", async () => {
            const query = await db.query(
                `SELECT EXISTS (
                    SELECT FROM
                    information_schema.tables
                    WHERE
                    table_name = 'rikishi'
                );`
            )
            const exists = query.rows[0].exists;
            expect(exists).toBe(true);
        });
        test("rikishi table has a sumoapi_id column as integer", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'sumoapi_id';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("sumoapi_id");
            expect(column.data_type).toBe("integer");
        });
        test("rikishi table has a sumodb_id column as integer", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'sumodb_id';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("sumodb_id");
            expect(column.data_type).toBe("integer");
        });
        test("rikishi table has a nsk_id column as integer", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'nsk_id';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("nsk_id");
            expect(column.data_type).toBe("integer");
        });
        test("rikishi table has a id column as a serial primary key", async () => {
            const query = await db.query(
                `SELECT column_name, data_type, column_default
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'id';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("id");
            expect(column.data_type).toBe("integer");
            expect(column.column_default).toBe(
                "nextval('rikishi_id_seq'::regclass)"
            );
        });
        test("rikishi table has a shikona_en column as VARCHAR", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'shikona_en';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("shikona_en");
            expect(column.data_type).toBe("character varying");
        });
        test("rikishi table has a shikona_jp column as VARCHAR", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'shikona_jp';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("shikona_jp");
            expect(column.data_type).toBe("character varying");
        });
        test("rikishi table has a current_rank column as VARCHAR", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'current_rank';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("current_rank");
            expect(column.data_type).toBe("character varying");
        });
        test("rikishi table has a heya column as VARCHAR", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'heya';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("heya");
            expect(column.data_type).toBe("character varying");
        });
        test("rikishi table has a birth_date column as VARCHAR", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'birth_date';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("birth_date");
            expect(column.data_type).toBe("character varying");
        });
        test("rikishi table has a shusshin column as VARCHAR", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'shusshin';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("shusshin");
            expect(column.data_type).toBe("character varying");
        });
        test("rikishi table has a height column as integer", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'height';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("height");
            expect(column.data_type).toBe("numeric");
        });
        test("rikishi table has a weight column as integer", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'weight';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("weight");
            expect(column.data_type).toBe("numeric");
        });
        test("rikishi table has a debut column as VARCHAR", async () => {
            const query = await db.query(
                `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'rikishi'
                AND column_name = 'debut';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("debut");
            expect(column.data_type).toBe("character varying");
        });
        test('insert data into rikishi table', async () => {
            const rikishi = await db.query(`SELECT * FROM rikishi;`);
    
            expect(rikishi.rows).toHaveLength(13);
            rikishi.rows.forEach((sumo) => {
                expect(sumo).toHaveProperty("id");
                expect(sumo).toHaveProperty("sumoapi_id")
                expect(sumo).toHaveProperty("sumodb_id")
                expect(sumo).toHaveProperty("nsk_id")
                expect(sumo).toHaveProperty("shikona_en")
                expect(sumo).toHaveProperty("shikona_jp")
                expect(sumo).toHaveProperty("current_rank")
                expect(sumo).toHaveProperty("heya")
                expect(sumo).toHaveProperty("birth_date")
                expect(sumo).toHaveProperty("shusshin")
                expect(sumo).toHaveProperty("height")
                expect(sumo).toHaveProperty("weight")
                expect(sumo).toHaveProperty("debut")
            });
        });
    });
});