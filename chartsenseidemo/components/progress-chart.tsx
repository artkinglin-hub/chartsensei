"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  label: string;
  value: number;
  color?: "primary" | "destructive" | "warning";
}

function ProgressBar({ label, value, color = "primary" }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            color === "primary" && "bg-primary",
            color === "destructive" && "bg-destructive",
            color === "warning" && "bg-warning"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

interface ProgressChartProps {
  longAccuracy: number;
  shortAccuracy: number;
  noTradeDiscipline: number;
}

export function ProgressChart({
  longAccuracy,
  shortAccuracy,
  noTradeDiscipline,
}: ProgressChartProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Performance Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProgressBar label="Long Accuracy" value={longAccuracy} color="primary" />
        <ProgressBar
          label="Short Accuracy"
          value={shortAccuracy}
          color="destructive"
        />
        <ProgressBar
          label="No-Trade Discipline"
          value={noTradeDiscipline}
          color="warning"
        />
      </CardContent>
    </Card>
  );
}
