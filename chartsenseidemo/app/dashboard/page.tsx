import Link from "next/link";
import {
  Target,
  TrendingUp,
  TrendingDown,
  MinusCircle,
  Flame,
  Trophy,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StatsCard } from "@/components/stats-card";
import { ProgressChart } from "@/components/progress-chart";
import { DifficultyBadge } from "@/components/risk-badge";
import {
  mockUserStats,
  mockTrainingHistory,
  type SetupType,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const setupTypeLabels: Record<SetupType, string> = {
  breakout: "Breakout",
  "support-bounce": "Support Bounce",
  "resistance-rejection": "Resistance Rejection",
  "trend-continuation": "Trend Continuation",
  reversal: "Reversal",
  consolidation: "Consolidation",
};

export default function DashboardPage() {
  const stats = mockUserStats;
  const history = mockTrainingHistory;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Your Dashboard
              </h1>
              <p className="mt-1 text-muted-foreground">
                Track your progress and identify areas for improvement
              </p>
            </div>
            <Button asChild>
              <Link href="/training">
                Continue Training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Sessions"
              value={stats.totalSessions}
              description="Training challenges completed"
              icon={Target}
            />
            <StatsCard
              title="Overall Accuracy"
              value={`${stats.accuracy}%`}
              description="Correct decisions"
              icon={BarChart3}
              trend={{ value: 5.2, isPositive: true }}
            />
            <StatsCard
              title="Current Streak"
              value={stats.currentStreak}
              description={`Best: ${stats.longestStreak} in a row`}
              icon={Flame}
            />
            <StatsCard
              title="Best Setup"
              value={setupTypeLabels[stats.bestSetup]}
              description="Your strongest pattern"
              icon={Trophy}
            />
          </div>

          {/* Charts and Insights */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <ProgressChart
              longAccuracy={stats.longAccuracy}
              shortAccuracy={stats.shortAccuracy}
              noTradeDiscipline={stats.noTradeDiscipline}
            />

            <Card className="border-border bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Areas to Improve</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                  <div>
                    <p className="font-medium">Most Missed Setup</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {setupTypeLabels[stats.mostMissedSetup]} - Consider
                      reviewing this pattern in the Learn section
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/10 p-4">
                  <TrendingDown className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning" />
                  <div>
                    <p className="font-medium">Short Accuracy Below Average</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your short trade accuracy is {stats.shortAccuracy}%. Focus
                      on identifying resistance rejections.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
                  <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Strong Long Performance</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your long trade accuracy is {stats.longAccuracy}%!
                      Keep up the good work on bullish setups.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Long Accuracy</p>
                  <p className="text-2xl font-bold">{stats.longAccuracy}%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                  <TrendingDown className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Short Accuracy</p>
                  <p className="text-2xl font-bold">{stats.shortAccuracy}%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                  <MinusCircle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No-Trade Score</p>
                  <p className="text-2xl font-bold">{stats.noTradeDiscipline}%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent History */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Recent Training History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Date</TableHead>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Setup Type</TableHead>
                      <TableHead>Your Decision</TableHead>
                      <TableHead>Correct Answer</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead className="text-right">Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((session) => (
                      <TableRow
                        key={session.id}
                        className="border-border hover:bg-secondary/50"
                      >
                        <TableCell className="font-medium">
                          {new Date(session.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-mono">
                          {session.ticker}
                        </TableCell>
                        <TableCell>
                          {setupTypeLabels[session.setupType]}
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 text-sm",
                              session.userAction === "long" && "text-primary",
                              session.userAction === "short" &&
                                "text-destructive",
                              session.userAction === "no-trade" &&
                                "text-muted-foreground"
                            )}
                          >
                            {session.userAction === "long" && (
                              <TrendingUp className="h-3 w-3" />
                            )}
                            {session.userAction === "short" && (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {session.userAction === "no-trade" && (
                              <MinusCircle className="h-3 w-3" />
                            )}
                            {session.userAction.charAt(0).toUpperCase() +
                              session.userAction.slice(1).replace("-", " ")}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 text-sm",
                              session.correctAction === "long" && "text-primary",
                              session.correctAction === "short" &&
                                "text-destructive",
                              session.correctAction === "no-trade" &&
                                "text-muted-foreground"
                            )}
                          >
                            {session.correctAction === "long" && (
                              <TrendingUp className="h-3 w-3" />
                            )}
                            {session.correctAction === "short" && (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {session.correctAction === "no-trade" && (
                              <MinusCircle className="h-3 w-3" />
                            )}
                            {session.correctAction.charAt(0).toUpperCase() +
                              session.correctAction.slice(1).replace("-", " ")}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DifficultyBadge difficulty={session.difficulty} />
                        </TableCell>
                        <TableCell className="text-right">
                          {session.isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-primary">
                              <CheckCircle2 className="h-4 w-4" />
                              Correct
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-destructive">
                              <XCircle className="h-4 w-4" />
                              Wrong
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
