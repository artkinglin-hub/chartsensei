import Link from "next/link";
import {
  TrendingUp,
  Target,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Zap,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const features = [
  {
    icon: BookOpen,
    title: "Learn Trading Basics",
    description:
      "Master fundamental concepts like support, resistance, breakouts, and trend following with clear explanations.",
  },
  {
    icon: Target,
    title: "Practice with Chart Challenges",
    description:
      "Test your skills on real historical charts. Decide to go long, short, or pass, then see instant feedback.",
  },
  {
    icon: Shield,
    title: "Master Risk Management",
    description:
      "Learn proper stop loss placement, position sizing, and risk-to-reward ratios that protect your capital.",
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description:
      "Monitor your accuracy, identify weak spots, and watch your trading skills improve over time.",
  },
];

const steps = [
  {
    number: "01",
    title: "Learn the Strategies",
    description:
      "Study proven trading setups and understand when each strategy works best.",
  },
  {
    number: "02",
    title: "Practice on Historical Charts",
    description:
      "Make trading decisions on real chart patterns with hidden outcomes.",
  },
  {
    number: "03",
    title: "Review and Improve",
    description:
      "Get detailed feedback on your decisions and track your progress over time.",
  },
];

const testimonials = [
  {
    quote:
      "ChartMaster completely changed how I approach trading. The practice mode helped me develop discipline before risking real money.",
    author: "Alex M.",
    role: "Beginner Trader",
  },
  {
    quote:
      "The instant feedback on my decisions was invaluable. I quickly learned to recognize quality setups versus traps.",
    author: "Sarah K.",
    role: "Part-time Trader",
  },
  {
    quote:
      "Finally, a platform that teaches the importance of risk management and knowing when NOT to trade.",
    author: "Michael R.",
    role: "Aspiring Day Trader",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>Practice trading risk-free with historical data</span>
              </div>

              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Learn to Trade with{" "}
                <span className="text-primary">Real Historical Charts</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Master the art of chart reading through practice. Decide to go
                long, short, or pass on real market setups and get instant
                feedback on your decisions.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/training">
                    Start Training
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link href="/learn">Explore Strategies</Link>
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No real money required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Real historical data</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Instant feedback</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-card px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything You Need to Learn Trading
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Build confidence with a structured approach to trading education
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className="border-border bg-secondary/50 transition-colors hover:bg-secondary"
                  >
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="mt-4 text-lg">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A simple three-step process to accelerate your trading education
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-16 hidden h-0.5 w-full -translate-x-1/2 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                  )}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                      {step.number}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="border-t border-border bg-card px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Experience Real Trading Scenarios
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Our training mode presents you with historical chart setups
                  from real stocks. Analyze the pattern, make your decision, and
                  learn from the outcome.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Choose from multiple setup types and difficulties",
                    "See partial charts and predict the outcome",
                    "Get detailed explanations for each scenario",
                    "Learn proper entry, stop loss, and take profit levels",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Button size="lg" asChild>
                    <Link href="/training">
                      Try Training Mode
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-xl border border-border bg-secondary p-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <LineChart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">NVDA</div>
                        <div className="text-sm text-muted-foreground">
                          Daily Chart
                        </div>
                      </div>
                    </div>
                    <div className="rounded-full bg-warning/20 px-3 py-1 text-xs font-medium text-warning">
                      Breakout Setup
                    </div>
                  </div>

                  <div className="mt-4 aspect-video rounded-lg bg-background/50">
                    <div className="flex h-full items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                        <TrendingUp className="h-12 w-12 text-primary/50" />
                        <p className="text-sm text-muted-foreground">
                          Interactive chart preview
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <Button className="bg-primary hover:bg-primary/90">
                      Long
                    </Button>
                    <Button variant="destructive">Short</Button>
                    <Button variant="outline">No Trade</Button>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-xl bg-primary/20 blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by Aspiring Traders
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our community has to say about their experience
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.author}
                  className="border-border bg-card"
                >
                  <CardContent className="pt-6">
                    <p className="leading-relaxed text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-card px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Begin practicing with real historical charts today. No account
              required to start.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/training">
                  Start Training Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/learn">Browse Learning Content</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
