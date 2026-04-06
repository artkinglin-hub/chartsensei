"use client";

import { useState, useMemo } from "react";
import {
  Clock,
  BarChart2,
  Target,
  Filter,
  ChevronRight,
  Shuffle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChartPanel } from "@/components/chart-panel";
import { TradeDecisionPanel } from "@/components/trade-decision-panel";
import { OutcomeCard } from "@/components/outcome-card";
import { DifficultyBadge } from "@/components/risk-badge";
import {
  chartChallenges,
  type ChartChallenge,
  type TradeAction,
  type Difficulty,
  type SetupType,
} from "@/lib/mock-data";

const setupTypeLabels: Record<SetupType, string> = {
  breakout: "Breakout",
  "support-bounce": "Support Bounce",
  "resistance-rejection": "Resistance Rejection",
  "trend-continuation": "Trend Continuation",
  reversal: "Reversal",
  consolidation: "Consolidation",
};

export default function TrainingPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">(
    "all"
  );
  const [setupFilter, setSetupFilter] = useState<SetupType | "all">("all");
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [showOutcome, setShowOutcome] = useState(false);
  const [userDecision, setUserDecision] = useState<TradeAction | null>(null);
  const [sessionStats, setSessionStats] = useState({
    completed: 0,
    correct: 0,
  });

  const filteredChallenges = useMemo(() => {
    return chartChallenges.filter((c) => {
      if (difficultyFilter !== "all" && c.difficulty !== difficultyFilter) {
        return false;
      }
      if (setupFilter !== "all" && c.setupType !== setupFilter) {
        return false;
      }
      return true;
    });
  }, [difficultyFilter, setupFilter]);

  const currentChallenge: ChartChallenge | undefined =
    filteredChallenges[currentChallengeIndex];

  const handleSubmitDecision = (decision: {
    action: TradeAction;
    confidence: number;
  }) => {
    setUserDecision(decision.action);
    setShowOutcome(true);

    const isCorrect = decision.action === currentChallenge?.correctAction;
    setSessionStats((prev) => ({
      completed: prev.completed + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }));
  };

  const handleNextChallenge = () => {
    setShowOutcome(false);
    setUserDecision(null);
    setCurrentChallengeIndex((prev) =>
      prev + 1 >= filteredChallenges.length ? 0 : prev + 1
    );
  };

  const handleRandomChallenge = () => {
    setShowOutcome(false);
    setUserDecision(null);
    const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
    setCurrentChallengeIndex(randomIndex);
  };

  const lastVisibleCandle = currentChallenge?.visibleCandles.at(-1);
  const currentPrice = lastVisibleCandle?.close;

  if (!currentChallenge) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <Card className="max-w-md text-center">
            <CardContent className="pt-6">
              <Target className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">No Challenges Found</h2>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your filters to see more challenges.
              </p>
              <Button
                className="mt-6"
                onClick={() => {
                  setDifficultyFilter("all");
                  setSetupFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Training Mode
              </h1>
              <p className="mt-1 text-muted-foreground">
                Analyze the chart and make your trading decision
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {sessionStats.correct}/{sessionStats.completed}
                </span>
                <span className="text-muted-foreground">correct</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filters:</span>
            </div>

            <Select
              value={difficultyFilter}
              onValueChange={(v) =>
                setDifficultyFilter(v as Difficulty | "all")
              }
            >
              <SelectTrigger className="w-[140px] bg-secondary">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={setupFilter}
              onValueChange={(v) => setSetupFilter(v as SetupType | "all")}
            >
              <SelectTrigger className="w-[180px] bg-secondary">
                <SelectValue placeholder="Setup Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Setups</SelectItem>
                {Object.entries(setupTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRandomChallenge}
              className="ml-auto"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Random
            </Button>
          </div>

          {/* Challenge Info Bar */}
          <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BarChart2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">{currentChallenge.ticker}</div>
                <div className="text-sm text-muted-foreground">
                  {currentChallenge.companyName}
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-border" />

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{currentChallenge.timeframe}</span>
            </div>

            <div className="h-8 w-px bg-border" />

            <div className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">
              {setupTypeLabels[currentChallenge.setupType]}
            </div>

            <DifficultyBadge difficulty={currentChallenge.difficulty} />

            <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
              <span>
                Challenge {currentChallengeIndex + 1} of{" "}
                {filteredChallenges.length}
              </span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
            {/* Chart Section */}
            <div className="space-y-4">
              <ChartPanel
                visibleCandles={currentChallenge.visibleCandles}
                hiddenCandles={currentChallenge.hiddenCandles}
                showHidden={showOutcome}
                height={450}
              />

              {currentPrice && (
                <div className="flex items-center justify-between rounded-lg bg-secondary px-4 py-2 text-sm">
                  <span className="text-muted-foreground">Last Price:</span>
                  <span className="font-mono font-semibold">
                    ${currentPrice.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Decision/Outcome Section */}
            <div>
              {showOutcome && userDecision ? (
                <OutcomeCard
                  challenge={currentChallenge}
                  userAction={userDecision}
                  onNext={handleNextChallenge}
                />
              ) : (
                <TradeDecisionPanel
                  onSubmit={handleSubmitDecision}
                  disabled={showOutcome}
                  currentPrice={currentPrice}
                />
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Quick Tips</h3>
            <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <p>
                  Look for key support and resistance levels before making your
                  decision
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <p>
                  Consider the overall trend direction - is it bullish, bearish,
                  or sideways?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <p>
                  Sometimes the best trade is no trade - avoid unclear setups
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <p>
                  Always think about where you would place your stop loss before
                  entering
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
