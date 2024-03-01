const {arrangeStables, arrangeUsers, arrangeRikishi} = require('../utils/arrangeData.js');


describe('arrangeStables', () => {
    test('should return a new array', () => {
        const arr = []
        expect(Array.isArray(arrangeStables(arr))).toBe(true);
        expect(arrangeStables(arr)).not.toBe(arr);
    });
    test('should deeply nest the value when passed an array with one stable object', () => {
        const stables = [{stable_name: 'honshu'}];
        expect(arrangeStables(stables)).toEqual([['honshu']])
    });
    test('should deeply nest the values when passed an array with multiple stable objects', () => {
        const stables = [
            {stable_name: 'honshu'},
            {stable_name: 'big heya'},
            {stable_name: 'not horses'}
        ];
        const arrangedStables = [
            ["honshu"],
            ["big heya"],
            ["not horses"]
        ]
        expect(arrangeStables(stables)).toEqual(arrangedStables)
    });
    test('should not mutate the original data', () => {
        const stables = [
            {stable_name: 'honshu'},
            {stable_name: 'big heya'},
            {stable_name: 'not horses'}
        ];
        const stablesCopy = [
            {stable_name: 'honshu'},
            {stable_name: 'big heya'},
            {stable_name: 'not horses'}
        ];
        arrangeStables(stables)
        expect(stables).toEqual(stablesCopy)
    })
})

describe("arrangeUsers", () => {
    test('should return a new array', () => {
        const arr = [];
        expect(Array.isArray(arrangeUsers(arr))).toBe(true);
        expect(arrangeUsers(arr)).not.toBe(arr);
    });
    test('should deeply nest the value when passed an array with one user object', () => {
        const users = [{username: 'dinoscaup', stable_name: 'honshu'}];
        expect(arrangeUsers(users)).toEqual([['dinoscaup', 'honshu']]);
    });
    test('should deeply nest the values when passed an array with multiple user objects', () => {
        const users = [
            {username: 'dinoscaup', stable_name: 'honshu'},
            {username: 'sloorfin', stable_name: 'big heya'},
            {username: 'huornchtu', stable_name: 'not horses'}
        ];
        const arrangedUsers = [
            ["dinoscaup", "honshu"],
            ["sloorfin", "big heya"],
            ["huornchtu", "not horses"]
        ];
        expect(arrangeUsers(users)).toEqual(arrangedUsers);
    });
    test('should not mutate the original data', () => {
        const users = [
            {username: 'dinoscaup', stable_name: 'honshu'},
            {username: 'sloorfin', stable_name: 'big heya'},
            {username: 'huornchtu', stable_name: 'not horses'}
        ];
        const usersCopy = [
            {username: 'dinoscaup', stable_name: 'honshu'},
            {username: 'sloorfin', stable_name: 'big heya'},
            {username: 'huornchtu', stable_name: 'not horses'}
        ];
        arrangeUsers(users)
        expect(users).toEqual(usersCopy)
    })
});

describe("arrangeRikishi", () => {
    test('should return a new array', () => {
        const arr = [];
        expect(Array.isArray(arrangeRikishi(arr))).toBe(true);
        expect(arrangeRikishi(arr)).not.toBe(arr);
    });
    test('should deeply nest the value when passed an array with one rikishi object', () => {
        const rikishi = [
            {id: 218, sumodbId: 300, nskId: 1306, shikonaEn: "Dairaido", shikonaJp: '大雷童(だいらいどう)', currentRank: 'Sandanme 37 East', heya: 'Takadagawa', birthDate: "1980-04-17T00:00:00Z", shusshin: "Fukuoka-ken, Onojo-shi", height: 177, weight: 151, debut: '199603'}
        ];
        const arrangedRikishi = [
            [218, 300, 1306, "Dairaido", '大雷童(だいらいどう)', 'Sandanme 37 East', 'Takadagawa', "1980-04-17T00:00:00Z", "Fukuoka-ken, Onojo-shi", 177, 151, '199603']
        ]
        expect(arrangeRikishi(rikishi)).toEqual(arrangedRikishi);
    });
    test('should deeply nest the values when passed an array with multiple user objects', () => {
        const rikishis = [
            {id: 218, sumodbId: 300, nskId: 1306, shikonaEn: "Dairaido", shikonaJp: '大雷童(だいらいどう)', currentRank: 'Sandanme 37 East', heya: 'Takadagawa', birthDate: "1980-04-17T00:00:00Z", shusshin: "Fukuoka-ken, Onojo-shi", height: 177, weight: 151, debut: '199603'},
            {id: 299, sumodbId: 7124, nskId: 2983, shikonaEn: "Kayatoiwa", shikonaJp: '夏野登岩(かやといわ)', currentRank: 'Jonidan 3 East', heya: 'Minato', birthDate: "1991-07-13T00:00:00Z", shusshin: "Gunma-ken, Takasaki-shi", height: 176, weight: 103.5, debut: "200703"},
        ];
        const arrangedRikishis = [
            [218, 300, 1306, "Dairaido", '大雷童(だいらいどう)', 'Sandanme 37 East', 'Takadagawa', "1980-04-17T00:00:00Z", "Fukuoka-ken, Onojo-shi", 177, 151, '199603'],
            [299, 7124, 2983, "Kayatoiwa", "夏野登岩(かやといわ)", 'Jonidan 3 East', 'Minato', "1991-07-13T00:00:00Z", "Gunma-ken, Takasaki-shi", 176, 103.5, "200703"]
        ];
        expect(arrangeRikishi(rikishis)).toEqual(arrangedRikishis);
    });
    test('should not mutate the original data', () => {
        const rikishis = [
            {id: 218, sumodbId: 300, nskId: 1306, shikonaEn: "Dairaido", shikonaJp: '大雷童(だいらいどう)', currentRank: 'Sandanme 37 East', heya: 'Takadagawa', birthDate: "1980-04-17T00:00:00Z", shusshin: "Fukuoka-ken, Onojo-shi", height: 177, weight: 151, debut: '199603'},
            {id: 299, sumodbId: 7124, nskId: 2983, shikonaEn: "Kayatoiwa", shikonaJp: '夏野登岩(かやといわ)', currentRank: 'Jonidan 3 East', heya: 'Minato', birthDate: "1991-07-13T00:00:00Z", shusshin: "Gunma-ken, Takasaki-shi", height: 176, weight: 103.5, debut: "200703"},
        ];
        const rikishisCopy = [
            {id: 218, sumodbId: 300, nskId: 1306, shikonaEn: "Dairaido", shikonaJp: '大雷童(だいらいどう)', currentRank: 'Sandanme 37 East', heya: 'Takadagawa', birthDate: "1980-04-17T00:00:00Z", shusshin: "Fukuoka-ken, Onojo-shi", height: 177, weight: 151, debut: '199603'},
            {id: 299, sumodbId: 7124, nskId: 2983, shikonaEn: "Kayatoiwa", shikonaJp: '夏野登岩(かやといわ)', currentRank: 'Jonidan 3 East', heya: 'Minato', birthDate: "1991-07-13T00:00:00Z", shusshin: "Gunma-ken, Takasaki-shi", height: 176, weight: 103.5, debut: "200703"},
        ];
        arrangeRikishi(rikishis)
        expect(rikishis).toEqual(rikishisCopy)
    })
});
