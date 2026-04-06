export type Difficulty = "beginner" | "intermediate" | "advanced";
export type RiskLevel = "low" | "medium" | "high";
export type TradeAction = "long" | "short" | "no-trade";
export type SetupType =
  | "breakout"
  | "support-bounce"
  | "resistance-rejection"
  | "trend-continuation"
  | "reversal"
  | "consolidation";

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface ChartChallenge {
  id: string;
  ticker: string;
  companyName: string;
  timeframe: string;
  setupType: SetupType;
  difficulty: Difficulty;
  correctAction: TradeAction;
  entry: number;
  stopLoss: number;
  takeProfit: number;
  riskLevel: RiskLevel;
  explanation: string;
  lessonTakeaway: string;
  visibleCandles: CandleData[];
  hiddenCandles: CandleData[];
}

export interface Strategy {
  id: string;
  title: string;
  description: string;
  whenToUse: string;
  riskLevel: RiskLevel;
  commonMistakes: string[];
  stopLossGuidance: string;
  icon: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface UserStats {
  totalSessions: number;
  accuracy: number;
  longAccuracy: number;
  shortAccuracy: number;
  noTradeDiscipline: number;
  mostMissedSetup: SetupType;
  bestSetup: SetupType;
  currentStreak: number;
  longestStreak: number;
}

export interface TrainingSession {
  id: string;
  date: string;
  ticker: string;
  setupType: SetupType;
  userAction: TradeAction;
  correctAction: TradeAction;
  isCorrect: boolean;
  difficulty: Difficulty;
}

// Generate realistic candlestick data
function generateCandleData(
  startPrice: number,
  count: number,
  trend: "up" | "down" | "sideways",
  volatility: number = 0.02
): CandleData[] {
  const candles: CandleData[] = [];
  let currentPrice = startPrice;
  const baseDate = new Date("2024-01-15");

  for (let i = 0; i < count; i++) {
    const trendBias =
      trend === "up" ? 0.6 : trend === "down" ? 0.4 : 0.5;
    const direction = Math.random() > trendBias ? -1 : 1;
    const change = currentPrice * volatility * Math.random() * direction;

    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.abs(change) * Math.random() * 0.5;
    const low = Math.min(open, close) - Math.abs(change) * Math.random() * 0.5;

    candles.push({
      time: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    });

    currentPrice = close;
  }

  return candles;
}

export const chartChallenges: ChartChallenge[] = [
  {
    id: "1",
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    timeframe: "Daily",
    setupType: "breakout",
    difficulty: "beginner",
    correctAction: "long",
    entry: 485.5,
    stopLoss: 472.0,
    takeProfit: 520.0,
    riskLevel: "medium",
    explanation:
      "This is a classic breakout setup. The stock consolidated near resistance at $480 for several days, building energy. The increasing volume on up days indicated accumulation. When price broke above resistance with strong volume, it signaled a valid breakout entry.",
    lessonTakeaway:
      "Breakouts work best when preceded by consolidation and confirmed by volume. Always wait for confirmation before entering.",
    visibleCandles: generateCandleData(450, 20, "sideways", 0.015),
    hiddenCandles: generateCandleData(485, 10, "up", 0.025),
  },
  {
    id: "2",
    ticker: "AAPL",
    companyName: "Apple Inc.",
    timeframe: "4H",
    setupType: "support-bounce",
    difficulty: "beginner",
    correctAction: "long",
    entry: 178.25,
    stopLoss: 175.0,
    takeProfit: 186.0,
    riskLevel: "low",
    explanation:
      "Price approached a well-established support level at $176 that had held multiple times previously. The formation of a bullish hammer candle at support, combined with RSI showing oversold conditions, provided a high-probability long entry.",
    lessonTakeaway:
      "Support levels gain strength each time they hold. Look for reversal candlestick patterns at key support for entry confirmation.",
    visibleCandles: generateCandleData(185, 25, "down", 0.012),
    hiddenCandles: generateCandleData(178, 8, "up", 0.018),
  },
  {
    id: "3",
    ticker: "TSLA",
    companyName: "Tesla Inc.",
    timeframe: "Daily",
    setupType: "resistance-rejection",
    difficulty: "intermediate",
    correctAction: "short",
    entry: 265.0,
    stopLoss: 275.0,
    takeProfit: 240.0,
    riskLevel: "high",
    explanation:
      "Tesla rallied into major resistance at $268, a level that rejected price twice before. The shooting star candle pattern with above-average volume indicated strong selling pressure. The risk-reward for a short position was favorable.",
    lessonTakeaway:
      "Resistance levels that have rejected price multiple times are high-probability short zones. Volume and candlestick patterns confirm the rejection.",
    visibleCandles: generateCandleData(230, 22, "up", 0.022),
    hiddenCandles: generateCandleData(265, 12, "down", 0.028),
  },
  {
    id: "4",
    ticker: "META",
    companyName: "Meta Platforms Inc.",
    timeframe: "1H",
    setupType: "consolidation",
    difficulty: "intermediate",
    correctAction: "no-trade",
    entry: 0,
    stopLoss: 0,
    takeProfit: 0,
    riskLevel: "high",
    explanation:
      "The stock was trapped in a tight consolidation range with no clear directional bias. Volume was declining, indicating lack of institutional interest. Taking a position here would be gambling on direction without an edge.",
    lessonTakeaway:
      "Sometimes the best trade is no trade. Avoid choppy, directionless markets where your edge is minimal. Wait for clearer setups.",
    visibleCandles: generateCandleData(320, 30, "sideways", 0.008),
    hiddenCandles: generateCandleData(322, 10, "sideways", 0.01),
  },
  {
    id: "5",
    ticker: "AMD",
    companyName: "Advanced Micro Devices",
    timeframe: "Daily",
    setupType: "trend-continuation",
    difficulty: "beginner",
    correctAction: "long",
    entry: 142.5,
    stopLoss: 136.0,
    takeProfit: 158.0,
    riskLevel: "medium",
    explanation:
      "AMD was in a strong uptrend, making higher highs and higher lows. The pullback to the 20-day moving average provided an ideal entry point in the direction of the trend. The pullback was on lower volume, indicating healthy profit-taking rather than distribution.",
    lessonTakeaway:
      "Trading with the trend increases your probability of success. Pullbacks to moving averages in trending markets offer excellent risk-reward entries.",
    visibleCandles: generateCandleData(125, 28, "up", 0.018),
    hiddenCandles: generateCandleData(142, 10, "up", 0.022),
  },
  {
    id: "6",
    ticker: "GOOGL",
    companyName: "Alphabet Inc.",
    timeframe: "Daily",
    setupType: "reversal",
    difficulty: "advanced",
    correctAction: "long",
    entry: 138.0,
    stopLoss: 132.0,
    takeProfit: 152.0,
    riskLevel: "high",
    explanation:
      "After an extended downtrend, GOOGL formed a double bottom pattern at $134. The second bottom showed bullish divergence on RSI, indicating weakening selling pressure. The break above the neckline at $140 confirmed the reversal.",
    lessonTakeaway:
      "Reversal trades are riskier but offer excellent reward potential. Look for multiple confirmation signals like divergences and pattern completions.",
    visibleCandles: generateCandleData(155, 35, "down", 0.015),
    hiddenCandles: generateCandleData(138, 15, "up", 0.02),
  },
  {
    id: "7",
    ticker: "MSFT",
    companyName: "Microsoft Corporation",
    timeframe: "4H",
    setupType: "breakout",
    difficulty: "intermediate",
    correctAction: "no-trade",
    entry: 0,
    stopLoss: 0,
    takeProfit: 0,
    riskLevel: "high",
    explanation:
      "While this appeared to be a breakout setup, several warning signs suggested caution: the breakout occurred on below-average volume, there was bearish divergence on momentum indicators, and the market was approaching major resistance. False breakouts are common in these conditions.",
    lessonTakeaway:
      "Not all breakouts are created equal. Volume confirmation is essential. Learn to recognize low-quality setups and pass on them.",
    visibleCandles: generateCandleData(375, 25, "sideways", 0.012),
    hiddenCandles: generateCandleData(385, 8, "down", 0.018),
  },
  {
    id: "8",
    ticker: "AMZN",
    companyName: "Amazon.com Inc.",
    timeframe: "Daily",
    setupType: "support-bounce",
    difficulty: "advanced",
    correctAction: "short",
    entry: 178.0,
    stopLoss: 184.0,
    takeProfit: 162.0,
    riskLevel: "medium",
    explanation:
      "Although price was at a historical support level, the context suggested weakness: the bounce attempt showed weak volume, there were lower highs forming, and the broader market was in risk-off mode. The support break was more likely than a bounce.",
    lessonTakeaway:
      "Support levels can fail, especially in weak market conditions. Analyze the broader context and look for signs of weakening before assuming support will hold.",
    visibleCandles: generateCandleData(195, 30, "down", 0.014),
    hiddenCandles: generateCandleData(178, 12, "down", 0.02),
  },
];

export const strategies: Strategy[] = [
  {
    id: "long-short",
    title: "Long vs Short",
    description:
      "Going long means buying a stock expecting it to rise. Going short means borrowing and selling a stock expecting it to fall, then buying it back cheaper.",
    whenToUse:
      "Go long when you identify bullish setups like breakouts or support bounces. Go short when you see bearish setups like resistance rejections or breakdown patterns.",
    riskLevel: "medium",
    commonMistakes: [
      "Fighting the trend",
      "Not understanding short selling mechanics",
      "Overleveraging positions",
    ],
    stopLossGuidance:
      "For longs, place stops below recent swing lows or support levels. For shorts, place stops above recent swing highs or resistance levels.",
    icon: "arrow-up-down",
  },
  {
    id: "support-resistance",
    title: "Support and Resistance",
    description:
      "Support is a price level where buying pressure typically prevents further decline. Resistance is where selling pressure prevents further advance.",
    whenToUse:
      "Use support levels for long entries and resistance levels for short entries or profit targets. The more times a level has held, the stronger it is.",
    riskLevel: "low",
    commonMistakes: [
      "Drawing too many levels",
      "Ignoring level breaks",
      "Not adjusting levels as price action evolves",
    ],
    stopLossGuidance:
      "Place stops just beyond the support/resistance level to account for false breaks. A 1-2% buffer is common.",
    icon: "git-compare",
  },
  {
    id: "breakouts",
    title: "Breakouts",
    description:
      "A breakout occurs when price moves beyond a defined support or resistance level with increased volume, signaling a potential new trend.",
    whenToUse:
      "Trade breakouts when price consolidates near a key level and then breaks through with volume confirmation. Best in trending markets.",
    riskLevel: "medium",
    commonMistakes: [
      "Entering without volume confirmation",
      "Chasing extended breakouts",
      "Ignoring overall market conditions",
    ],
    stopLossGuidance:
      "Place stops just below the breakout level for longs, or above for shorts. If the breakout fails and price re-enters the range, exit.",
    icon: "trending-up",
  },
  {
    id: "trend-following",
    title: "Trend Following",
    description:
      "Trading in the direction of the established trend. The trend is your friend until it bends.",
    whenToUse:
      "Use pullbacks to moving averages or previous breakout levels to enter in the trend direction. Higher probability than counter-trend trades.",
    riskLevel: "low",
    commonMistakes: [
      "Entering at trend exhaustion",
      "Not using proper pullback entries",
      "Overtrading in ranging markets",
    ],
    stopLossGuidance:
      "Use the most recent swing low for uptrends or swing high for downtrends. Trail stops as the trend progresses.",
    icon: "activity",
  },
  {
    id: "reversals",
    title: "Reversals",
    description:
      "Trading against the current trend when signs indicate the trend is ending. Higher risk but can offer excellent reward.",
    whenToUse:
      "Look for divergences, exhaustion candles, and pattern completions at major support/resistance levels after extended moves.",
    riskLevel: "high",
    commonMistakes: [
      "Trying to catch falling knives",
      "Not waiting for confirmation",
      "Underestimating trend strength",
    ],
    stopLossGuidance:
      "Use tight stops beyond the reversal point. These trades require multiple confirmations before entry.",
    icon: "refresh-cw",
  },
  {
    id: "stop-loss",
    title: "Stop Loss",
    description:
      "An order to sell when price reaches a certain level to limit losses. Essential for risk management.",
    whenToUse:
      "Always use stop losses on every trade. Place them at logical levels based on chart structure, not arbitrary percentages.",
    riskLevel: "low",
    commonMistakes: [
      "Moving stops to avoid being stopped out",
      "Using mental stops instead of actual orders",
      "Placing stops at obvious levels",
    ],
    stopLossGuidance:
      "Calculate position size based on stop distance. Never risk more than 1-2% of your account on any single trade.",
    icon: "shield",
  },
  {
    id: "take-profit",
    title: "Take Profit",
    description:
      "Predefined price levels where you exit a profitable trade. Helps secure gains and avoid giving back profits.",
    whenToUse:
      "Set take profit at logical resistance (for longs) or support (for shorts) levels. Consider scaling out at multiple targets.",
    riskLevel: "low",
    commonMistakes: [
      "Being too greedy",
      "Not having predefined targets",
      "Exiting too early out of fear",
    ],
    stopLossGuidance:
      "Your take profit should give you at least a 2:1 reward-to-risk ratio. Consider trailing stops for trending moves.",
    icon: "target",
  },
  {
    id: "risk-reward",
    title: "Risk-to-Reward Ratio",
    description:
      "The ratio of potential loss (risk) to potential gain (reward). A 1:3 ratio means risking $1 to potentially make $3.",
    whenToUse:
      "Calculate R:R before every trade. Only take trades with at least 1:2 ratio. Higher ratios compensate for lower win rates.",
    riskLevel: "low",
    commonMistakes: [
      "Ignoring the ratio entirely",
      "Adjusting ratio mid-trade",
      "Not factoring in transaction costs",
    ],
    stopLossGuidance:
      "If you cannot achieve at least 1:2 R:R with logical stop and target levels, skip the trade.",
    icon: "scale",
  },
  {
    id: "position-sizing",
    title: "Position Sizing",
    description:
      "Determining how many shares to buy based on your risk tolerance and stop loss distance.",
    whenToUse:
      "Calculate position size on every trade: Position Size = (Account Risk $) / (Entry - Stop Loss). This ensures consistent risk.",
    riskLevel: "low",
    commonMistakes: [
      "Betting too big on high conviction trades",
      "Ignoring volatility differences",
      "Not adjusting for account changes",
    ],
    stopLossGuidance:
      "Risk 1-2% of your account per trade. Adjust position size based on stop distance, not the other way around.",
    icon: "calculator",
  },
  {
    id: "no-trade",
    title: "Why No Trade is Sometimes Best",
    description:
      "Recognizing when market conditions or setups don&apos;t favor trading. Capital preservation is key to long-term success.",
    whenToUse:
      "Sit out when markets are choppy, setups are unclear, or you&apos;re not in the right mental state. Quality over quantity.",
    riskLevel: "low",
    commonMistakes: [
      "Fear of missing out (FOMO)",
      "Forcing trades in bad conditions",
      "Overtrading to recover losses",
    ],
    stopLossGuidance:
      "Your best stop loss is not entering a bad trade in the first place. Develop strict criteria for trade entry.",
    icon: "pause",
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Long",
    definition:
      "Buying a security with the expectation that its price will rise. You profit when the price goes up.",
    category: "Position",
  },
  {
    term: "Short",
    definition:
      "Selling a borrowed security with the expectation that its price will fall. You profit when the price goes down.",
    category: "Position",
  },
  {
    term: "Resistance",
    definition:
      "A price level where selling pressure tends to prevent further price increases. Acts as a ceiling for price.",
    category: "Technical",
  },
  {
    term: "Support",
    definition:
      "A price level where buying pressure tends to prevent further price decreases. Acts as a floor for price.",
    category: "Technical",
  },
  {
    term: "Breakout",
    definition:
      "When price moves above resistance or below support with increased volume, signaling a potential new trend.",
    category: "Pattern",
  },
  {
    term: "Pullback",
    definition:
      "A temporary price decline within an uptrend, or temporary rally within a downtrend. Often provides entry opportunities.",
    category: "Pattern",
  },
  {
    term: "Stop Loss",
    definition:
      "An order to sell a security when it reaches a certain price, used to limit potential losses.",
    category: "Risk",
  },
  {
    term: "Take Profit",
    definition:
      "An order to sell a security when it reaches a target price, used to lock in gains.",
    category: "Risk",
  },
  {
    term: "Risk-to-Reward",
    definition:
      "The ratio comparing the potential loss of a trade to its potential gain. A 1:2 ratio means risking $1 to make $2.",
    category: "Risk",
  },
  {
    term: "Volatility",
    definition:
      "A measure of how much a security&apos;s price fluctuates. Higher volatility means larger price swings.",
    category: "Market",
  },
  {
    term: "Trend",
    definition:
      "The general direction of price movement over time. Can be uptrend, downtrend, or sideways.",
    category: "Technical",
  },
  {
    term: "Consolidation",
    definition:
      "A period where price moves sideways in a range, often before a breakout or breakdown.",
    category: "Pattern",
  },
  {
    term: "Candlestick",
    definition:
      "A chart type showing open, high, low, and close prices for a period. Green/white indicates price went up, red/black indicates down.",
    category: "Technical",
  },
  {
    term: "Volume",
    definition:
      "The number of shares traded during a given period. High volume confirms price moves, low volume suggests weakness.",
    category: "Market",
  },
  {
    term: "Entry",
    definition:
      "The price at which you open a position. A good entry improves risk-to-reward ratio.",
    category: "Trade",
  },
  {
    term: "Exit",
    definition:
      "The price at which you close a position. Can be at a profit target, stop loss, or manual decision.",
    category: "Trade",
  },
  {
    term: "Divergence",
    definition:
      "When price makes a new high/low but an indicator doesn&apos;t confirm it. Often signals potential reversals.",
    category: "Technical",
  },
  {
    term: "Moving Average",
    definition:
      "An indicator that smooths price data to show the trend direction. Common periods are 20, 50, and 200 days.",
    category: "Technical",
  },
];

export const mockUserStats: UserStats = {
  totalSessions: 147,
  accuracy: 68.5,
  longAccuracy: 72.3,
  shortAccuracy: 61.8,
  noTradeDiscipline: 75.2,
  mostMissedSetup: "reversal",
  bestSetup: "breakout",
  currentStreak: 5,
  longestStreak: 12,
};

export const mockTrainingHistory: TrainingSession[] = [
  {
    id: "1",
    date: "2024-03-15",
    ticker: "NVDA",
    setupType: "breakout",
    userAction: "long",
    correctAction: "long",
    isCorrect: true,
    difficulty: "beginner",
  },
  {
    id: "2",
    date: "2024-03-15",
    ticker: "AAPL",
    setupType: "support-bounce",
    userAction: "long",
    correctAction: "long",
    isCorrect: true,
    difficulty: "beginner",
  },
  {
    id: "3",
    date: "2024-03-14",
    ticker: "TSLA",
    setupType: "resistance-rejection",
    userAction: "long",
    correctAction: "short",
    isCorrect: false,
    difficulty: "intermediate",
  },
  {
    id: "4",
    date: "2024-03-14",
    ticker: "META",
    setupType: "consolidation",
    userAction: "long",
    correctAction: "no-trade",
    isCorrect: false,
    difficulty: "intermediate",
  },
  {
    id: "5",
    date: "2024-03-13",
    ticker: "AMD",
    setupType: "trend-continuation",
    userAction: "long",
    correctAction: "long",
    isCorrect: true,
    difficulty: "beginner",
  },
  {
    id: "6",
    date: "2024-03-13",
    ticker: "GOOGL",
    setupType: "reversal",
    userAction: "no-trade",
    correctAction: "long",
    isCorrect: false,
    difficulty: "advanced",
  },
  {
    id: "7",
    date: "2024-03-12",
    ticker: "MSFT",
    setupType: "breakout",
    userAction: "no-trade",
    correctAction: "no-trade",
    isCorrect: true,
    difficulty: "intermediate",
  },
  {
    id: "8",
    date: "2024-03-12",
    ticker: "AMZN",
    setupType: "support-bounce",
    userAction: "short",
    correctAction: "short",
    isCorrect: true,
    difficulty: "advanced",
  },
];
