import { currentFolder } from '../shared/current-folder';
import { loadInput } from '../shared/load-input';

describe(currentFolder(__dirname), () => {
  describe('first half', () => {
    function entryPuzzle(input: string): number {
      const lines = input.split('\n');

      function findDigitsInLine(line: string) {
        let firstDigit: string | undefined;
        let lastDigit: string | undefined;

        function isValidDigit(digit: string | undefined): digit is string {
          return digit != null && !Number.isNaN(parseInt(digit, 10));
        }

        for (let index = 0; index < line.length; index++) {
          const LENGTH_OFFSET = 1;

          const start = line[index];

          const opposingCharIndex = line.length - index - LENGTH_OFFSET;
          const end = line[opposingCharIndex];

          if (firstDigit == null && isValidDigit(start)) {
            firstDigit = start;
          }

          if (lastDigit == null && isValidDigit(end)) {
            lastDigit = end;
          }

          if (firstDigit != null && lastDigit != null) {
            break;
          }
        }

        return [firstDigit, lastDigit] as const;
      }

      return lines.reduce((result, line) => {
        const [firstDigit, secondDigit] = findDigitsInLine(line);

        assert(firstDigit);
        assert(secondDigit);

        const calibrationValue = parseInt(firstDigit + secondDigit, 10);

        return result + calibrationValue;
      }, 0);
    }

    it('matches the expected sample result', () => {
      const sample = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

      expect(entryPuzzle(sample)).toEqual(142);
    });

    it.skip('matches the expected input result', () => {
      const input = loadInput(__dirname);

      expect(entryPuzzle(input)).toEqual(54605);
    });
  });

  describe('second half', () => {
    function advancedPuzzle(input: string): number {
      const wordNumbers = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
      ] as const;

      const lines = input.split('\n');

      function findDigitsInLine(line: string) {
        let firstDigit: string | undefined;
        let lastDigit: string | undefined;

        function isValidDigit(digit: string | undefined): digit is string {
          return digit != null && !Number.isNaN(parseInt(digit, 10));
        }

        function findWordNumberValueInLine(currentLine: string, index: number) {
          const ZERO_OFFSET = 1;

          for (const wordNumber of wordNumbers) {
            if (!currentLine.substring(index).startsWith(wordNumber)) {
              // eslint-disable-next-line no-continue
              continue;
            }

            return wordNumbers.indexOf(wordNumber) + ZERO_OFFSET;
          }

          return undefined;
        }

        for (let index = 0; index < line.length; index++) {
          const LENGTH_OFFSET = 1;

          const start = line[index];

          const opposingCharIndex = line.length - index - LENGTH_OFFSET;
          const end = line[opposingCharIndex];

          if (firstDigit == null) {
            if (isValidDigit(start)) {
              firstDigit = start;
            } else {
              firstDigit = findWordNumberValueInLine(line, index)?.toString();
            }
          }

          if (lastDigit == null) {
            if (isValidDigit(end)) {
              lastDigit = end;
            } else {
              lastDigit = findWordNumberValueInLine(
                line,
                opposingCharIndex,
              )?.toString();
            }
          }

          if (firstDigit != null && lastDigit != null) {
            break;
          }
        }

        return [firstDigit, lastDigit] as const;
      }

      return lines.reduce((result, line) => {
        const [firstDigit, secondDigit] = findDigitsInLine(line);

        assert(firstDigit);
        assert(secondDigit);

        const calibrationValue = parseInt(firstDigit + secondDigit, 10);

        return result + calibrationValue;
      }, 0);
    }

    it('matches the expected sample result', () => {
      const sample = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

      expect(advancedPuzzle(sample)).toEqual(281);
    });

    it('matches the expected input result', () => {
      const input = loadInput(__dirname);

      expect(advancedPuzzle(input)).toEqual(55429);
    });
  });
});
