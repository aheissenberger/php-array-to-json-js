import { describe, test, expect } from 'vitest';
import which from 'which';

import phparray2json from './phparray2json';

const phpExecNotExists = (which.sync('php', { nothrow: true }) === null)

describe.skipIf(phpExecNotExists)('check php result string syntax', () => {
    const phpdata = [
        [`1`, `1`],
        [`"string"`, `"string"`],
        [`true`, `true`],
        [`[]`, `[]`],
        [`["key"=>1]`, `{"key":1}`],
        [`[1,2,3]`, `[1,2,3]`],
        [`["key1"=>1,"key2"=>[1,"string",true]]`, `{"key1":1,"key2":[1,"string",true]}`],
    ];
    test.each(phpdata)('php array: %s => %s', async (input, expected) => {
        const json = await phparray2json(input)
        expect(json).toBe(expected)
    })

    test('broken syntax throws Error', async () => {
        await expect(() => phparray2json(`[`)).rejects.toThrowErrorMatchingSnapshot()
    })

    test('php not found', async () => {
        await expect(() => phparray2json(`1`,'phpnotfound')).rejects.toThrowErrorMatchingSnapshot()
    })
})