import { cn } from "@/lib/utils";
import type { RiskLevel, Difficulty } from "@/lib/mock-data";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        level === "low" && "bg-primary/20 text-primary",
        level === "medium" && "bg-warning/20 text-warning",
        level === "high" && "bg-destructive/20 text-destructive",
        className
      )}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)} Risk
    </span>
  );
}

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        difficulty === "beginner" && "bg-primary/20 text-primary",
        difficulty === "intermediate" && "bg-warning/20 text-warning",
        difficulty === "advanced" && "bg-destructive/20 text-destructive",
        className
      )}
    >
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
}
