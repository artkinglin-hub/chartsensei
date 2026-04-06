import { BookOpen, Lightbulb } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlossarySearch } from "@/components/glossary-search";

export default function GlossaryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Trading Dictionary</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Glossary of Trading Terms
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A comprehensive reference of essential trading terminology.
              Search by term or filter by category to find what you need.
            </p>
          </div>

          {/* Quick Tip */}
          <div className="mb-8 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
            <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <p className="font-medium">Pro Tip</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Understanding these terms is crucial for making informed trading
                decisions. Bookmark this page for quick reference during your
                training sessions.
              </p>
            </div>
          </div>

          {/* Glossary Content */}
          <GlossarySearch />
        </div>
      </main>

      <Footer />
    </div>
  );
}
