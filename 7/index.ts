import { sum } from "@util/sum";

enum HandRank {
  FiveKind = 7,
  FourKind = 6,
  FullHouse = 5,
  ThreeKind = 4,
  TwoPair = 3,
  OnePair = 2,
  HighCard = 1,
}

const convertCharToNumber = (char: string, jokers: boolean): number => {
  if (char === "A") {
    return 14;
  }
  if (char === "K") {
    return 13;
  }
  if (char === "Q") {
    return 12;
  }
  if (char === "J") {
    return jokers ? 1 : 11;
  }
  if (char === "T") {
    return 10;
  }
  return +char;
};

type Play = {
  handRaw: string;
  hand: Hand;
  bet: number;
  handRank: HandRank;
};

type Hand = Record<number, number>;

export const getHandRank = (hand: Hand): HandRank => {
  const { 1: jokers = 0, ...handWithoutJokers } = hand;
  const handEntries = Object.values(handWithoutJokers).sort((a, b) => b - a);
  if (!handEntries.length) {
    handEntries.push(0);
  }
  if (handEntries[0] + jokers >= 5) {
    return HandRank.FiveKind;
  }
  if (handEntries[0] + jokers >= 4) {
    return HandRank.FourKind;
  }
  if (handEntries[0] + handEntries[1] + jokers >= 5) {
    return HandRank.FullHouse;
  }
  if (handEntries[0] + jokers >= 3) {
    return HandRank.ThreeKind;
  }
  if (handEntries[0] + handEntries[1] + jokers >= 4) {
    return HandRank.TwoPair;
  }
  if (handEntries[0] + jokers >= 2) {
    return HandRank.OnePair;
  }
  return HandRank.HighCard;
};

const sortHands = (a: Play, b: Play, jokers: boolean): number => {
  if (b.handRank === a.handRank) {
    let sortNumber = 0;
    b.handRaw.split("").some((_, i) => {
      const aChar = convertCharToNumber(a.handRaw[i], jokers);
      const bChar = convertCharToNumber(b.handRaw[i], jokers);
      if (aChar > bChar) {
        sortNumber = 1;
        return true;
      }
      if (aChar < bChar) {
        sortNumber = -1;
        return true;
      }
    });
    return sortNumber;
  }
  return a.handRank - b.handRank;
};

export const run = async (list: string[], jokers = false) => {
  const hands = list
    .map((row) => row.split(" "))
    .map<Play>(([cardsRaw, betRaw]) => {
      return {
        bet: +betRaw,
        handRaw: cardsRaw,
        hand: cardsRaw
          .split("")
          .map((char) => convertCharToNumber(char, jokers))
          .reduce((hand, curr) => {
            if (!hand[curr]) {
              hand[curr] = 1;
            } else {
              hand[curr]++;
            }
            return hand;
          }, {} as Hand),
      } as any;
    });

  hands.forEach((hand) => {
    hand.handRank = getHandRank(hand.hand);
  });
  const sortedHands = hands.sort((a, b) => sortHands(a, b, jokers));

  return sortedHands.map((hand, rank) => hand.bet * (rank + 1)).reduce(sum, 0);
};
