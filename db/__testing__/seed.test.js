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
        test('stables has a ranking column as an integer that initialises as null', async () => {
            const query = await db.query(
                `SELECT column_name, data_type, column_default
                FROM information_schema.columns
                WHERE table_name = 'stables'
                AND column_name = 'ranking';`
            );
            const column = query.rows[0]
            expect(column.column_name).toBe("ranking");
            expect(column.data_type).toBe("integer");
            expect(column.column_default).toBe(null);
        })
    });
});