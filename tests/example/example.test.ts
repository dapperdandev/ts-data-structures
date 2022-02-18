// import * as common from '../../src/common';

// const spy = jest.spyOn(common, 'functionName').mockImplementation((): null => null);

describe('EXAMPLE', (): void => {
    test('Auto Option Produces Correct String', (): void => {
        // Arrange
        let truthy = true;

        // Act
        truthy = false;

        // Assert
        expect(truthy).toBeFalsy();
    });
});
