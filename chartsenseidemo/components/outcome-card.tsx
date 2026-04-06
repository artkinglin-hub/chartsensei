"use client";

import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  MinusCircle,
  Target,
  Shield,
  DollarSign,
  Scale,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";
import type { ChartChallenge, TradeAction } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface OutcomeCardProps {
  challenge: ChartChallenge;
  userAction: TradeAction;
  onNext: () => void;
}

export function OutcomeCard({ challenge, userAction, onNext }: OutcomeCardProps) {
  const isCorrect = userAction === challenge.correctAction;

  const actionLabels: Record<TradeAction, { label: string; icon: React.ReactNode }> = {
    long: { label: "Long", icon: <TrendingUp className="h-4 w-4" /> },
    short: { label: "Short", icon: <TrendingDown className="h-4 w-4" /> },
    "no-trade": { label: "No Trade", icon: <MinusCircle className="h-4 w-4" /> },
  };

  const riskReward =
    challenge.correctAction !== "no-trade"
      ? (
          (challenge.takeProfit - challenge.entry) /
          (challenge.entry - challenge.stopLoss)
        ).toFixed(2)
      : "N/A";

  return (
    <Card
      className={cn(
        "border-2 transition-all",
        isCorrect
          ? "border-primary bg-primary/5"
          : "border-destructive bg-destructive/5"
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <span className="text-primary">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-destructive" />
                <span className="text-destructive">Incorrect</span>
              </>
            )}
          </CardTitle>
          <RiskBadge level={challenge.riskLevel} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Your Answer vs Correct Answer */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Your Answer
            </p>
            <div
              className={cn(
                "flex items-center gap-2 text-lg font-semibold",
                userAction === "long" && "text-primary",
                userAction === "short" && "text-destructive",
                userAction === "no-trade" && "text-muted-foreground"
              )}
            >
              {actionLabels[userAction].icon}
              {actionLabels[userAction].label}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Correct Answer
            </p>
            <div
              className={cn(
                "flex items-center gap-2 text-lg font-semibold",
                challenge.correctAction === "long" && "text-primary",
                challenge.correctAction === "short" && "text-destructive",
                challenge.correctAction === "no-trade" && "text-muted-foreground"
              )}
            >
              {actionLabels[challenge.correctAction].icon}
              {actionLabels[challenge.correctAction].label}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="mb-2 font-semibold">Explanation</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {challenge.explanation}
          </p>
        </div>

        {/* Trade Setup (only for actual trades) */}
        {challenge.correctAction !== "no-trade" && (
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-4">
            <h4 className="mb-4 font-semibold">Ideal Trade Setup</h4>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Entry</p>
                  <p className="font-semibold">${challenge.entry.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                  <Shield className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Stop Loss</p>
                  <p className="font-semibold">${challenge.stopLoss.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Take Profit</p>
                  <p className="font-semibold">${challenge.takeProfit.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                  <Scale className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk:Reward</p>
                  <p className="font-semibold">1:{riskReward}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lesson Takeaway */}
        <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/10 p-4">
          <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning" />
          <div>
            <h4 className="mb-1 font-semibold text-foreground">Key Takeaway</h4>
            <p className="text-sm text-muted-foreground">
              {challenge.lessonTakeaway}
            </p>
          </div>
        </div>

        {/* Next Button */}
        <Button onClick={onNext} size="lg" className="w-full">
          Next Challenge
        </Button>
      </CardContent>
    </Card>
  );
}
