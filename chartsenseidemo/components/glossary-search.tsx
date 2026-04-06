"use client";

import { useState, useMemo } from "react";
import { Search, X, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { glossaryTerms, type GlossaryTerm } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const categories = ["All", "Position", "Technical", "Pattern", "Risk", "Market", "Trade"];

const categoryColors: Record<string, string> = {
  Position: "bg-primary/20 text-primary",
  Technical: "bg-chart-3/20 text-chart-3",
  Pattern: "bg-warning/20 text-warning",
  Risk: "bg-destructive/20 text-destructive",
  Market: "bg-chart-5/20 text-chart-5",
  Trade: "bg-chart-4/20 text-chart-4",
};

export function GlossarySearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const firstLetter = term.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredTerms.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No terms found</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Try adjusting your search or filters to find what you&apos;re looking
              for.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedTerms)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, terms]) => (
              <div key={letter}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
                    {letter}
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {terms.map((term) => (
                    <Card
                      key={term.term}
                      className="border-border bg-card transition-colors hover:border-primary/50"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold">{term.term}</h3>
                          <span
                            className={cn(
                              "flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                              categoryColors[term.category] ||
                                "bg-secondary text-secondary-foreground"
                            )}
                          >
                            {term.category}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {term.definition}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {filteredTerms.length} of {glossaryTerms.length} terms
      </div>
    </div>
  );
}
