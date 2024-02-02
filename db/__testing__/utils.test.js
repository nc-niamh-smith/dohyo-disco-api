const {arrangeStables} = require('../utils/arrangeData.js');


describe('arrangeStables', () => {
    test('should return a new array', () => {
        const arr = []
        expect(Array.isArray(arrangeStables(arr))).toBe(true)
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