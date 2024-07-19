const {arrangeRikishi} = require('../utils.js');

describe('arrangeRikishi', () => {
    test('should return new array', () => {
        const inputArray = [];
        const actual = arrangeRikishi(inputArray)
        expect(actual).not.toBe(inputArray)
    })
    test('should arrange single-object array into a single-nested array', () => {
        const input = [{rikishi_id: 1}];
        const expected = [[1]];
        const actual = arrangeRikishi(input);
        expect(actual).toEqual(expected);
    })
    test('should arrange multi-object array into nested arrays', () => {
        const input = [{rikishi_id: 1}, {rikishi_id: 2}];
        const expected = [[1], [2]];
        const actual = arrangeRikishi(input)
        expect(actual).toEqual(expected)
    })
    test('should not mutate original arrays', () => {
        const input = [{rikishi_id: 1}, {rikishi_id: 2}];
        const inputCopy = [{rikishi_id: 1}, {rikishi_id: 2}];
        arrangeRikishi(input)
        expect(input).toEqual(inputCopy)
    })
})