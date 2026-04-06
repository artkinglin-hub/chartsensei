import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StrategyCard } from "@/components/strategy-card";
import { strategies } from "@/lib/mock-data";
import { BookOpen, GraduationCap, Shield } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span>Trading Education</span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Learn Trading{" "}
                <span className="text-primary">Strategies</span>
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">
                Master the essential trading concepts and strategies used by
                successful traders. Each strategy includes practical guidance
                on when to use it and how to manage risk.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">10 Key Concepts</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Comprehensive coverage of essential trading strategies
                </p>
              </div>

              <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Risk Management</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Learn to protect your capital with proper risk controls
                </p>
              </div>

              <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Practical Examples</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Clear explanations with real-world application guidance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight">
                Trading Strategies & Concepts
              </h2>
              <p className="mt-2 text-muted-foreground">
                Click on each card to expand and see detailed guidance
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {strategies.map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
              ))}
            </div>
          </div>
        </section>

        {/* Key Takeaways Section */}
        <section className="border-t border-border bg-card px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-2xl font-bold tracking-tight">
                Key Takeaways
              </h2>

              <div className="mt-10 space-y-6">
                <div className="rounded-lg border border-border bg-secondary p-6">
                  <h3 className="font-semibold">
                    1. Risk Management is Everything
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Never risk more than 1-2% of your account on a single trade.
                    Position sizing based on stop loss distance ensures you stay
                    in the game long enough to succeed.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-secondary p-6">
                  <h3 className="font-semibold">2. Trade with the Trend</h3>
                  <p className="mt-2 text-muted-foreground">
                    Trading in the direction of the established trend
                    significantly increases your probability of success.
                    Counter-trend trades require more skill and tighter risk
                    management.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-secondary p-6">
                  <h3 className="font-semibold">
                    3. Quality Over Quantity
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    The best traders know when NOT to trade. Waiting for
                    high-quality setups with clear risk-reward is more
                    profitable than overtrading in choppy conditions.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-secondary p-6">
                  <h3 className="font-semibold">
                    4. Always Have a Plan
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Before entering any trade, know your entry, stop loss, and
                    take profit levels. Calculate your risk-to-reward ratio and
                    only take trades with favorable odds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
