import { currentFolder } from '../shared/current-folder';
import { loadInput } from '../shared/load-input';

describe(currentFolder(__dirname), () => {
  type CubeColor = 'blue' | 'green' | 'red';

  type LooseCubeColor = CubeColor | Omit<CubeColor, string>;

  function assertIsCubeColor(color?: string): asserts color is CubeColor {
    const cubes = new Set<LooseCubeColor>(['blue', 'green', 'red']);

    if (!color || !cubes.has(color)) {
      throw new Error('Invalid color for cube values');
    }
  }

  describe('first half', () => {
    function entryPuzzle(input: string) {
      const bagOfCubes = new Map<CubeColor, number>([
        ['red', 12],
        ['green', 13],
        ['blue', 14],
      ]);

      return input.split('\n').reduce((total, line, index) => {
        const gameId = index + 1;

        const [, plays] = line.split(': ');
        assert(plays);

        const isGamePossible = plays.split('; ').every((play) =>
          play.split(', ').every((set) => {
            const [amount, color] = set.split(' ');
            assert(amount);
            assertIsCubeColor(color);

            const amountOtCubesInBag = bagOfCubes.get(color) ?? 0;
            return parseInt(amount, 10) <= amountOtCubesInBag;
          }),
        );

        if (!isGamePossible) {
          return total;
        }

        return total + gameId;
      }, 0);
    }

    it('matches the expected sample result', () => {
      const sample = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

      expect(entryPuzzle(sample)).toEqual(8);
    });

    it('matches the expected input result', () => {
      const input = loadInput(__dirname);

      expect(entryPuzzle(input)).toEqual(2679);
    });
  });

  describe('second half', () => {
    function advancedPuzzle(input: string) {
      return input.split('\n').reduce((total, line) => {
        const [, plays] = line.split(': ');
        assert(plays);

        const minimumBagOfCubes = new Map<CubeColor, number>([
          ['red', 0],
          ['green', 0],
          ['blue', 0],
        ]);

        const sets = plays.split('; ').flatMap((play) => play.split(', '));

        for (const set of sets) {
          const [amount, color] = set.split(' ');
          assert(amount);
          assertIsCubeColor(color);

          const currentAmount = parseInt(amount, 10);
          const currentMinimum = minimumBagOfCubes.get(color) ?? 0;

          if (currentAmount <= currentMinimum) {
            // eslint-disable-next-line no-continue
            continue;
          }

          minimumBagOfCubes.set(color, currentAmount);
        }

        const power = [...minimumBagOfCubes.values()].reduce(
          (result, amount) => result * amount,
        );

        return total + power;
      }, 0);
    }

    it('matches the expected sample result', () => {
      const sample = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

      expect(advancedPuzzle(sample)).toEqual(2286);
    });

    it('matches the expected input result', () => {
      const input = loadInput(__dirname);

      expect(advancedPuzzle(input)).toEqual(77607);
    });
  });
});
