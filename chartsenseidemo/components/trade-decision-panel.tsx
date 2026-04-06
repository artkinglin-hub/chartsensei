"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, MinusCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TradeAction } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface TradeDecisionPanelProps {
  onSubmit: (decision: {
    action: TradeAction;
    entry?: number;
    stopLoss?: number;
    takeProfit?: number;
    confidence: number;
  }) => void;
  disabled?: boolean;
  currentPrice?: number;
}

export function TradeDecisionPanel({
  onSubmit,
  disabled = false,
  currentPrice,
}: TradeDecisionPanelProps) {
  const [selectedAction, setSelectedAction] = useState<TradeAction | null>(null);
  const [entry, setEntry] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [takeProfit, setTakeProfit] = useState<string>("");
  const [confidence, setConfidence] = useState<number[]>([50]);

  const handleSubmit = () => {
    if (!selectedAction) return;

    onSubmit({
      action: selectedAction,
      entry: entry ? parseFloat(entry) : undefined,
      stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
      takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
      confidence: confidence[0],
    });
  };

  const actions: { action: TradeAction; label: string; icon: React.ReactNode; color: string }[] = [
    {
      action: "long",
      label: "Long",
      icon: <ArrowUp className="h-5 w-5" />,
      color: "bg-primary hover:bg-primary/90 text-primary-foreground",
    },
    {
      action: "short",
      label: "Short",
      icon: <ArrowDown className="h-5 w-5" />,
      color: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
    },
    {
      action: "no-trade",
      label: "No Trade",
      icon: <MinusCircle className="h-5 w-5" />,
      color: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    },
  ];

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="h-5 w-5 text-primary" />
          Make Your Decision
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {actions.map(({ action, label, icon, color }) => (
            <Button
              key={action}
              onClick={() => setSelectedAction(action)}
              disabled={disabled}
              className={cn(
                "h-14 flex-col gap-1 transition-all",
                selectedAction === action
                  ? cn(color, "ring-2 ring-ring ring-offset-2 ring-offset-background")
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              )}
            >
              {icon}
              <span className="text-xs font-medium">{label}</span>
            </Button>
          ))}
        </div>

        {/* Optional Fields */}
        {selectedAction && selectedAction !== "no-trade" && (
          <div className="space-y-4 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-xs text-muted-foreground">
              Optional: Specify your trade levels
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="entry" className="text-xs">
                  Entry Price
                </Label>
                <Input
                  id="entry"
                  type="number"
                  step="0.01"
                  placeholder={currentPrice?.toFixed(2) || "0.00"}
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  disabled={disabled}
                  className="h-9 bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stopLoss" className="text-xs">
                  Stop Loss
                </Label>
                <Input
                  id="stopLoss"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  disabled={disabled}
                  className="h-9 bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="takeProfit" className="text-xs">
                  Take Profit
                </Label>
                <Input
                  id="takeProfit"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  disabled={disabled}
                  className="h-9 bg-background"
                />
              </div>
            </div>
          </div>
        )}

        {/* Confidence Slider */}
        {selectedAction && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Confidence Level</Label>
              <span className="text-sm font-medium text-primary">
                {confidence[0]}%
              </span>
            </div>
            <Slider
              value={confidence}
              onValueChange={setConfidence}
              max={100}
              step={5}
              disabled={disabled}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={disabled || !selectedAction}
          className="w-full"
          size="lg"
        >
          Submit Decision
        </Button>
      </CardContent>
    </Card>
  );
}
