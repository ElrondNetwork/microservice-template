expect.extend({
    toHaveStructure<T>(received: T, keys: string[]) {
        const objectSortedKeys = JSON.stringify(Object.keys(received).sort());
        const expectedKeys = JSON.stringify(keys.sort());

        const pass = objectSortedKeys === expectedKeys;
        if (pass) {
            return {
                pass: true,
                message: () => `expected ${objectSortedKeys} not to have structure ${expectedKeys} `,
            };
        }
        else {
            return {
                pass: false,
                message: () => `expected ${objectSortedKeys} to have structure ${expectedKeys} `,
            };
        }
    },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Matchers<R> {
    toHaveStructure<T>(received: T, keys: string[]): R;
}
