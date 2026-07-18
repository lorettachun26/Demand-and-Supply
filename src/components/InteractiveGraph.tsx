import React from "react";

interface InteractiveGraphProps {
  demandShift: number; // horizontal offset, e.g. -30 to +30
  supplyShift: number; // horizontal offset, e.g. -30 to +30 (positive = increase/shift right)
  showOriginal?: boolean;
  customPrice?: number; // if set, shows horizontal line at this price
  highlightShortageSurplus?: boolean;
  interactive?: boolean;
  onShiftChange?: (type: "demand" | "supply", val: number) => void;
  labelD1?: string;
  labelS1?: string;
  labelD2?: string;
  labelS2?: string;
}

export default function InteractiveGraph({
  demandShift,
  supplyShift,
  showOriginal = true,
  customPrice,
  highlightShortageSurplus = true,
  labelD1 = "D₀",
  labelS1 = "S₀",
  labelD2 = "D₁",
  labelS2 = "S₁",
}: InteractiveGraphProps) {
  // SVG configuration
  const width = 460;
  const height = 360;
  const padding = 50;

  // Convert economics coords (0-100) to SVG pixels
  const toX = (q: number) => padding + (q / 100) * (width - 2 * padding);
  const toY = (p: number) => height - padding - (p / 100) * (height - 2 * padding);

  // Convert SVG pixels back to economics coords
  const toQ = (x: number) => ((x - padding) / (width - 2 * padding)) * 100;
  const toP = (y: number) => ((height - padding - y) / (height - 2 * padding)) * 100;

  // Math equations:
  // Original Demand: P = 90 - Q  => Q = 90 - P
  // Shifted Demand:  P = 90 - Q + dShift => Q = 90 - P + dShift
  // Original Supply: P = 10 + Q  => Q = P - 10
  // Shifted Supply:  P = 10 + Q - sShift => Q = P - 10 + sShift (sShift > 0 means supply increases, shifting right)

  // original Equilibrium
  const q0 = 40;
  const p0 = 50;

  // Shifted Equilibrium calculation
  // 90 - Q + dShift = 10 + Q - sShift
  // 2Q = 80 + dShift + sShift
  const q1 = Math.min(Math.max(40 + 0.5 * (demandShift + supplyShift), 5), 95);
  const p1 = Math.min(Math.max(50 + 0.5 * (demandShift - supplyShift), 5), 95);

  // Original curves coordinates
  const originalDemand = {
    x1: toX(10),
    y1: toY(80),
    x2: toX(80),
    y2: toY(10),
  };

  const originalSupply = {
    x1: toX(10),
    y1: toY(20),
    x2: toX(80),
    y2: toY(90),
  };

  // Shifted curves coordinates
  const shiftedDemand = {
    x1: toX(10 + demandShift),
    y1: toY(80),
    x2: toX(80 + demandShift),
    y2: toY(10),
  };

  // Supply increases (shifts right/down)
  const shiftedSupply = {
    x1: toX(10 + supplyShift),
    y1: toY(20),
    x2: toX(80 + supplyShift),
    y2: toY(90),
  };

  // Shortage/Surplus Calculations for customPrice
  let shortageAmount = 0;
  let surplusAmount = 0;
  let qdAtPrice = 0;
  let qsAtPrice = 0;

  if (customPrice !== undefined) {
    // Q_d = 90 - P + dShift
    qdAtPrice = Math.max(90 - customPrice + demandShift, 0);
    // Q_s = P - 10 + sShift
    qsAtPrice = Math.max(customPrice - 10 + supplyShift, 0);

    if (qdAtPrice > qsAtPrice) {
      shortageAmount = qdAtPrice - qsAtPrice;
    } else {
      surplusAmount = qsAtPrice - qdAtPrice;
    }
  }

  const hasDemandShift = Math.abs(demandShift) > 1;
  const hasSupplyShift = Math.abs(supplyShift) > 1;

  return (
    <div className="relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center select-none w-full">
      <svg width={width} height={height} className="overflow-visible" id="economic-chart-svg">
        {/* Grids and Axes */}
        <g stroke="#f3f4f6" strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => {
            const val = (i + 1) * 10;
            return (
              <React.Fragment key={i}>
                {/* Horizontal grid lines */}
                <line x1={toX(0)} y1={toY(val)} x2={toX(100)} y2={toY(val)} />
                {/* Vertical grid lines */}
                <line x1={toX(val)} y1={toY(0)} x2={toX(val)} y2={toY(100)} />
              </React.Fragment>
            );
          })}
        </g>

        {/* Main Axes */}
        <line
          x1={toX(0)}
          y1={toY(0)}
          x2={toX(100)}
          y2={toY(0)}
          stroke="#1f2937"
          strokeWidth="2"
          markerEnd="url(#arrow-x)"
        />
        <line
          x1={toX(0)}
          y1={toY(0)}
          x2={toX(0)}
          y2={toY(100)}
          stroke="#1f2937"
          strokeWidth="2"
          markerEnd="url(#arrow-y)"
        />

        {/* Axis Labels */}
        <text
          x={toX(100) + 10}
          y={toY(0) + 5}
          className="font-display font-medium text-xs fill-gray-700"
          textAnchor="start"
        >
          Quantity (Q)
        </text>
        <text
          x={toX(0) - 15}
          y={toY(100) - 12}
          className="font-display font-medium text-xs fill-gray-700"
          textAnchor="middle"
        >
          Price (P)
        </text>

        {/* ORIGINAL REFERENCE CURVES (Dashed Grey) */}
        {showOriginal && (hasDemandShift || hasSupplyShift) && (
          <>
            {/* Original Demand D0 */}
            <line
              x1={originalDemand.x1}
              y1={originalDemand.y1}
              x2={originalDemand.x2}
              y2={originalDemand.y2}
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text
              x={originalDemand.x2 + 8}
              y={originalDemand.y2 + 4}
              className="text-xs font-mono fill-gray-400"
            >
              {labelD1}
            </text>

            {/* Original Supply S0 */}
            <line
              x1={originalSupply.x1}
              y1={originalSupply.y1}
              x2={originalSupply.x2}
              y2={originalSupply.y2}
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text
              x={originalSupply.x2 + 8}
              y={originalSupply.y2 + 4}
              className="text-xs font-mono fill-gray-400"
            >
              {labelS1}
            </text>

            {/* Original Equilibrium Lines */}
            <line
              x1={toX(0)}
              y1={toY(p0)}
              x2={toX(q0)}
              y2={toY(p0)}
              stroke="#9ca3af"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <line
              x1={toX(q0)}
              y1={toY(0)}
              x2={toX(q0)}
              y2={toY(p0)}
              stroke="#9ca3af"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle cx={toX(q0)} cy={toY(p0)} r="4" fill="#9ca3af" />
            <text x={toX(q0) + 6} y={toY(p0) - 6} className="text-xs font-mono fill-gray-500">
              E₀
            </text>
            <text x={toX(0) - 20} y={toY(p0) + 4} className="text-[10px] font-mono fill-gray-500" textAnchor="end">
              P₀
            </text>
            <text x={toX(q0)} y={toY(0) + 16} className="text-[10px] font-mono fill-gray-500" textAnchor="middle">
              Q₀
            </text>
          </>
        )}

        {/* ACTIVE DEMAND CURVE */}
        <line
          x1={shiftedDemand.x1}
          y1={shiftedDemand.y1}
          x2={shiftedDemand.x2}
          y2={shiftedDemand.y2}
          stroke="#2563eb"
          strokeWidth="3"
          clipPath="url(#chart-clip)"
        />
        <text
          x={Math.min(shiftedDemand.x2 + 10, width - 25)}
          y={shiftedDemand.y2 + 4}
          className="text-sm font-display font-bold fill-blue-600"
        >
          {hasDemandShift ? labelD2 : labelD1}
        </text>

        {/* Shift Demand Arrow */}
        {hasDemandShift && (
          <path
            d={`M ${toX(45)} ${toY(45)} L ${toX(45 + demandShift)} ${toY(45)}`}
            stroke="#2563eb"
            strokeWidth="2"
            markerEnd="url(#arrow-blue)"
            fill="none"
          />
        )}

        {/* ACTIVE SUPPLY CURVE */}
        <line
          x1={shiftedSupply.x1}
          y1={shiftedSupply.y1}
          x2={shiftedSupply.x2}
          y2={shiftedSupply.y2}
          stroke="#dc2626"
          strokeWidth="3"
          clipPath="url(#chart-clip)"
        />
        <text
          x={Math.min(shiftedSupply.x2 + 10, width - 25)}
          y={shiftedSupply.y2 + 4}
          className="text-sm font-display font-bold fill-red-600"
        >
          {hasSupplyShift ? labelS2 : labelS1}
        </text>

        {/* Shift Supply Arrow */}
        {hasSupplyShift && (
          <path
            d={`M ${toX(45)} ${toY(55)} L ${toX(45 + supplyShift)} ${toY(55)}`}
            stroke="#dc2626"
            strokeWidth="2"
            markerEnd="url(#arrow-red)"
            fill="none"
          />
        )}

        {/* ACTIVE EQUILIBRIUM POINT */}
        {customPrice === undefined && (
          <>
            {/* Equilibrium Dashed lines */}
            <line
              x1={toX(0)}
              y1={toY(p1)}
              x2={toX(q1)}
              y2={toY(p1)}
              stroke="#4b5563"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <line
              x1={toX(q1)}
              y1={toY(0)}
              x2={toX(q1)}
              y2={toY(p1)}
              stroke="#4b5563"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Label P1, Q1 on Axes */}
            <rect x={toX(0) - 34} y={toY(p1) - 8} width="28" height="16" rx="3" fill="#f3f4f6" />
            <text x={toX(0) - 20} y={toY(p1) + 4} className="text-xs font-mono font-bold fill-gray-800" textAnchor="middle">
              P₁
            </text>

            <rect x={toX(q1) - 14} y={toY(0) + 4} width="28" height="16" rx="3" fill="#f3f4f6" />
            <text x={toX(q1)} y={toY(0) + 16} className="text-xs font-mono font-bold fill-gray-800" textAnchor="middle">
              Q₁
            </text>

            <circle cx={toX(q1)} cy={toY(p1)} r="6" fill="#1f2937" className="animate-pulse" />
            <circle cx={toX(q1)} cy={toY(p1)} r="3" fill="#ffffff" />
            <text x={toX(q1) + 8} y={toY(p1) - 8} className="text-xs font-display font-extrabold fill-gray-900 bg-white px-1 rounded border border-gray-100 shadow-sm">
              E₁
            </text>
          </>
        )}

        {/* CUSTOM MARKET PRICE LINE (for ceilings, floors, CHT shortage analysis) */}
        {customPrice !== undefined && (
          <>
            {/* Market Price line */}
            <line
              x1={toX(0)}
              y1={toY(customPrice)}
              x2={toX(Math.max(qdAtPrice, qsAtPrice) + 10)}
              y2={toY(customPrice)}
              stroke="#0f766e"
              strokeWidth="2.5"
              strokeDasharray="5 3"
            />
            <text
              x={toX(0) - 20}
              y={toY(customPrice) + 4}
              className="text-xs font-mono font-bold fill-teal-700"
              textAnchor="end"
            >
              P_m (${customPrice})
            </text>

            {/* Intersection dots */}
            <circle cx={toX(qdAtPrice)} cy={toY(customPrice)} r="5" fill="#2563eb" />
            <text x={toX(qdAtPrice)} y={toY(customPrice) - 10} className="text-[10px] font-bold fill-blue-600" textAnchor="middle">
              Q_d ({Math.round(qdAtPrice)})
            </text>

            <circle cx={toX(qsAtPrice)} cy={toY(customPrice)} r="5" fill="#dc2626" />
            <text x={toX(qsAtPrice)} y={toY(customPrice) - 10} className="text-[10px] font-bold fill-red-600" textAnchor="middle">
              Q_s ({Math.round(qsAtPrice)})
            </text>

            {/* Vertical lines from intersections to Q axis */}
            <line
              x1={toX(qdAtPrice)}
              y1={toY(customPrice)}
              x2={toX(qdAtPrice)}
              y2={toY(0)}
              stroke="#2563eb"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <line
              x1={toX(qsAtPrice)}
              y1={toY(customPrice)}
              x2={toX(qsAtPrice)}
              y2={toY(0)}
              stroke="#dc2626"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Shortage or Surplus Bracket */}
            {highlightShortageSurplus && (
              <>
                {shortageAmount > 0 ? (
                  <g>
                    {/* Draw a bracket or colored rect for shortage */}
                    <rect
                      x={toX(qsAtPrice)}
                      y={toY(customPrice) + 8}
                      width={toX(qdAtPrice) - toX(qsAtPrice)}
                      height="12"
                      fill="#fef2f2"
                      stroke="#dc2626"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      rx="3"
                    />
                    <text
                      x={toX(qsAtPrice + shortageAmount / 2)}
                      y={toY(customPrice) + 18}
                      className="text-[10px] font-display font-extrabold fill-red-600"
                      textAnchor="middle"
                    >
                      SHORTAGE (Excess Demand): {Math.round(shortageAmount)} units
                    </text>
                  </g>
                ) : surplusAmount > 0 ? (
                  <g>
                    {/* Draw a bracket or colored rect for surplus */}
                    <rect
                      x={toX(qdAtPrice)}
                      y={toY(customPrice) + 8}
                      width={toX(qsAtPrice) - toX(qdAtPrice)}
                      height="12"
                      fill="#ecfdf5"
                      stroke="#0f766e"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      rx="3"
                    />
                    <text
                      x={toX(qdAtPrice + surplusAmount / 2)}
                      y={toY(customPrice) + 18}
                      className="text-[10px] font-display font-extrabold fill-emerald-600"
                      textAnchor="middle"
                    >
                      SURPLUS (Excess Supply): {Math.round(surplusAmount)} units
                    </text>
                  </g>
                ) : null}
              </>
            )}
          </>
        )}

        {/* DEFINITIONS OF SVG MARKERS */}
        <defs>
          <clipPath id="chart-clip">
            <rect
              x={toX(0)}
              y={toY(100)}
              width={toX(100) - toX(0)}
              height={toY(0) - toY(100)}
            />
          </clipPath>
          <marker id="arrow-x" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#1f2937" />
          </marker>
          <marker id="arrow-y" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#1f2937" />
          </marker>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
          </marker>
          <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
          </marker>
        </defs>
      </svg>

      {/* Numerical Stats Dashboard */}
      <div className="mt-4 w-full bg-gray-50 rounded-xl p-3 grid grid-cols-3 gap-2 text-center border border-gray-100">
        <div>
          <p className="text-[10px] font-display font-semibold text-gray-500 uppercase tracking-wider">Demand Shift</p>
          <p className={`text-sm font-mono font-bold ${demandShift > 0 ? "text-blue-600" : demandShift < 0 ? "text-indigo-600" : "text-gray-600"}`}>
            {demandShift > 0 ? `+${Math.round(demandShift)}% (Right)` : demandShift < 0 ? `${Math.round(demandShift)}% (Left)` : "Constant"}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-display font-semibold text-gray-500 uppercase tracking-wider">Supply Shift</p>
          <p className={`text-sm font-mono font-bold ${supplyShift > 0 ? "text-red-600" : supplyShift < 0 ? "text-orange-600" : "text-gray-600"}`}>
            {supplyShift > 0 ? `+${Math.round(supplyShift)}% (Right)` : supplyShift < 0 ? `${Math.round(supplyShift)}% (Left)` : "Constant"}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-display font-semibold text-gray-500 uppercase tracking-wider">Equilibrium</p>
          <p className="text-sm font-mono font-extrabold text-gray-900">
            {customPrice === undefined ? (
              `P* = $${Math.round(p1)} | Q* = ${Math.round(q1)}`
            ) : (
              `P_m = $${customPrice} (Market)`
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
