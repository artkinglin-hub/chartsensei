"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  GitCompare,
  TrendingUp,
  Activity,
  RefreshCw,
  Shield,
  Target,
  Scale,
  Calculator,
  Pause,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";
import type { Strategy } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "arrow-up-down": ArrowUpDown,
  "git-compare": GitCompare,
  "trending-up": TrendingUp,
  activity: Activity,
  "refresh-cw": RefreshCw,
  shield: Shield,
  target: Target,
  scale: Scale,
  calculator: Calculator,
  pause: Pause,
};

interface StrategyCardProps {
  strategy: Strategy;
}

export function StrategyCard({ strategy }: StrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[strategy.icon] || Activity;

  return (
    <Card className="border-border bg-card transition-all hover:border-primary/50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{strategy.title}</CardTitle>
              <RiskBadge level={strategy.riskLevel} className="mt-2" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          {strategy.description}
        </p>

        <div className="rounded-lg bg-secondary p-4">
          <h4 className="mb-2 text-sm font-semibold text-foreground">
            When to Use
          </h4>
          <p className="text-sm text-muted-foreground">{strategy.whenToUse}</p>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm">
            {isExpanded ? "Show Less" : "Show More Details"}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        <div
          className={cn(
            "space-y-4 overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h4 className="text-sm font-semibold text-foreground">
                Common Mistakes
              </h4>
            </div>
            <ul className="space-y-2">
              {strategy.commonMistakes.map((mistake, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                  {mistake}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/10 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">
                Stop Loss Guidance
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">
              {strategy.stopLossGuidance}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
