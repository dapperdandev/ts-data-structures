import { HashTable } from './hash-table';

describe('Hash Table', (): void => {

    test('"set" should add a key/value pair', (): void => {
        const initialSize = 2;
        const item: [string, number] = ['grapes', 1];
        const hashTable = new HashTable<string, number>(initialSize);
        
        hashTable.set(item[0], item[1]);

        const result = hashTable.get(item[0]);
        expect(result).toEqual(item[1]);
    });

    test('"set" should overwrite key/value pair if duplicated', (): void => {
        const key = 'grapes';
        const originalValue = 1000;
        const updatedValue = 2000;
        const hashTable = new HashTable<string, number>(2);
        
        hashTable.set(key, originalValue);
        hashTable.set(key, updatedValue);

        const result = hashTable.get(key);
        expect(result).toEqual(updatedValue);
    });

    test('"set" should add items when initial size is exceeded', (): void => {
        const keys = ['grapes', 'apples', 'oranges'];
        const initialSize = 2;

        const hashTable = new HashTable<string, number>(initialSize);
        keys.forEach(k => hashTable.set(k, 1));

        expect(hashTable.count).toEqual(3);
    });

    test('"remove" should half data size when half the values are undefined', (): void => {
        const keys = ['grapes', 'apples', 'oranges'];
        const initialSize = 3;

        const hashTable = new HashTable<string, number>(initialSize);
        keys.forEach(k => hashTable.set(k, 1));
        hashTable.remove(keys[1]);
        hashTable.remove(keys[2]);

        const result = hashTable.keys();

        expect(result).toEqual(expect.arrayContaining([keys[0]]));
        expect(result.length).toEqual(Math.ceil(initialSize / 2));
    });

    test('"get" should return the correct value for a given key', (): void => {
        const key = 'grapes';
        const value = 1000;

        const hashTable = new HashTable<string, number>(2);
        hashTable.set(key, value);

        const result = hashTable.get('grapes');
        expect(result).toEqual(value);
    });
    

    test('"get" should return undefined when value does not exist', (): void => {
        const key = 'grapes';

        const hashTable = new HashTable<string, number>(2);
        
        const result = hashTable.get(key);
        expect(result).toBeUndefined();
    });

    test('"keys" should return all keys', (): void => {
        const keys = ['grapes', 'apples', 'oranges'];
        const hashTable = new HashTable<string, number>(5);
        
        keys.forEach(k => hashTable.set(k, 1));

        const result = hashTable.keys();

        expect(result).toEqual(expect.arrayContaining(keys));
        expect(result.length).toEqual(keys.length);
    });
});
