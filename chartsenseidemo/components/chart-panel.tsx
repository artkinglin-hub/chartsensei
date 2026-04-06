"use client";

import { useEffect, useRef, useMemo } from "react";
import type { CandleData } from "@/lib/mock-data";

interface ChartPanelProps {
  visibleCandles: CandleData[];
  hiddenCandles?: CandleData[];
  showHidden: boolean;
  height?: number;
}

export function ChartPanel({
  visibleCandles,
  hiddenCandles = [],
  showHidden,
  height = 400,
}: ChartPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const allCandles = useMemo(() => {
    return showHidden ? [...visibleCandles, ...hiddenCandles] : visibleCandles;
  }, [visibleCandles, hiddenCandles, showHidden]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || allCandles.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const chartHeight = rect.height;
    const padding = { top: 20, right: 60, bottom: 30, left: 20 };
    const chartWidth = width - padding.left - padding.right;
    const drawHeight = chartHeight - padding.top - padding.bottom;

    // Clear canvas
    ctx.fillStyle = "#0d0d14";
    ctx.fillRect(0, 0, width, chartHeight);

    // Calculate price range
    const prices = allCandles.flatMap((c) => [c.high, c.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const paddedMin = minPrice - priceRange * 0.1;
    const paddedMax = maxPrice + priceRange * 0.1;
    const paddedRange = paddedMax - paddedMin;

    // Calculate candle dimensions
    const candleWidth = Math.max(4, (chartWidth / allCandles.length) * 0.8);
    const candleGap = chartWidth / allCandles.length;

    // Draw grid lines
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 1;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (drawHeight / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Price labels
      const price = paddedMax - (paddedRange / gridLines) * i;
      ctx.fillStyle = "#6b7280";
      ctx.font = "11px system-ui";
      ctx.textAlign = "left";
      ctx.fillText(`$${price.toFixed(2)}`, width - padding.right + 5, y + 4);
    }

    // Draw candles
    allCandles.forEach((candle, index) => {
      const x = padding.left + candleGap * index + candleGap / 2;
      const isGreen = candle.close >= candle.open;
      const isHiddenCandle = showHidden && index >= visibleCandles.length;

      // Colors
      const bullColor = isHiddenCandle ? "#22c55e" : "#4ade80";
      const bearColor = isHiddenCandle ? "#ef4444" : "#f87171";
      const color = isGreen ? bullColor : bearColor;

      // Calculate Y positions
      const highY =
        padding.top + ((paddedMax - candle.high) / paddedRange) * drawHeight;
      const lowY =
        padding.top + ((paddedMax - candle.low) / paddedRange) * drawHeight;
      const openY =
        padding.top + ((paddedMax - candle.open) / paddedRange) * drawHeight;
      const closeY =
        padding.top + ((paddedMax - candle.close) / paddedRange) * drawHeight;

      // Draw wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Draw body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(Math.abs(closeY - openY), 1);

      if (isGreen) {
        ctx.fillStyle = color;
      } else {
        ctx.fillStyle = color;
      }
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);

      // Add glow effect for hidden candles
      if (isHiddenCandle) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
        ctx.shadowBlur = 0;
      }
    });

    // Draw divider line if showing hidden candles
    if (showHidden && hiddenCandles.length > 0) {
      const dividerX =
        padding.left + candleGap * visibleCandles.length - candleGap * 0.1;
      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(dividerX, padding.top);
      ctx.lineTo(dividerX, chartHeight - padding.bottom);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label
      ctx.fillStyle = "#4ade80";
      ctx.font = "bold 10px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("REVEALED", dividerX + 40, padding.top - 5);
    }

    // Draw time labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px system-ui";
    ctx.textAlign = "center";
    const labelStep = Math.ceil(allCandles.length / 6);
    allCandles.forEach((candle, index) => {
      if (index % labelStep === 0) {
        const x = padding.left + candleGap * index + candleGap / 2;
        const date = new Date(candle.time);
        const label = `${date.getMonth() + 1}/${date.getDate()}`;
        ctx.fillText(label, x, chartHeight - 10);
      }
    });
  }, [allCandles, showHidden, visibleCandles.length, hiddenCandles.length]);

  return (
    <div
      className="w-full overflow-hidden rounded-lg border border-border bg-background"
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
