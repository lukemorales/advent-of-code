import { currentFolder } from '../shared/current-folder';
import { loadInput } from '../shared/load-input';

describe(currentFolder(__dirname), () => {
  describe.skip('first half', () => {
    function entryPuzzle(input: string) {}

    it('matches the expected sample result', () => {
      const sample = ``;

      expect(entryPuzzle(sample)).toEqual('SAMPLE_RESULT');
    });

    it.skip('matches the expected input result', () => {
      const input = loadInput(__dirname);

      expect(entryPuzzle(input)).toEqual('INPUT_RESULT');
    });
  });

  describe.skip('second half', () => {
    function advancedPuzzle(input: string) {}

    it('matches the expected sample result', () => {
      const sample = ``;

      expect(advancedPuzzle(sample)).toEqual('SAMPLE_RESULT');
    });

    it.skip('matches the expected input result', () => {
      const input = loadInput(__dirname);

      expect(advancedPuzzle(input)).toEqual('INPUT_RESULT');
    });
  });
});
