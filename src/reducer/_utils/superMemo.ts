import { Card } from 'reducer/entities';

/**
 * Returns whether or not a card needs review
 * @param card - the card in question
 */
export const needsReview = (card: Card): boolean =>
  daysSinceSeen(card) >= daysUntilReview(card);

/**
 * Returns the number of days since a card was last reviewed
 * @param card - the card in question
 */
const daysSinceSeen = (card: Card): number =>
  (Date.now() - Date.parse(card.last_seen)) / 86400000;

/**
 * Returns the number of days since last review until the card
 * must be reviewed again
 * @param card - the card in question
 */
const daysUntilReview = (card: Card): number =>
  sm2(
    card.score
      .split(',')
      .map(score => parseInt(score, 10))
      .filter(score => !isNaN(score)),
  );

/**
 * Returns the number of days until next review based on the score for a card
 * @param x - previous streak for the card
 */
function sm2(x: number[]): number {
  const a = 6;
  const b = -0.8;
  const c = 0.28;
  const d = 0.02;
  const assumedScore = 2.5;
  const minScore = 1.3;
  const theta = 1;

  // If not answered, return 0
  if (x.length === 0) {
    return 0;
  }

  // If last incorrect, return 1
  if (x[x.length - 1] < 3) {
    return 1;
  }

  let r = 0;
  const reversed = [...x].reverse();
  for (let i = 0; i < x.length; i = i + 1) {
    if (reversed[i] >= 3) {
      r = r + 1;
    } else {
      break;
    }
  }

  return (
    a *
    Math.max(
      minScore,
      assumedScore +
        x.reduce(
          (result: number, current: number) => {
            return result + (b + c * current + d * current * current);
          },
          0,
        ) ** (theta * r),
    )
  );
}
