import { useState, useEffect } from "react";
import InteractiveGraph from "./InteractiveGraph";
import { ArrowRight, Info, CheckCircle2, TrendingUp, TrendingDown, HelpCircle } from "lucide-react";

type ShiftType = "increase" | "decrease" | "constant";
type MagnitudeType = "equal" | "demand_larger" | "supply_larger";

export default function EquilibriumPlayground() {
  const [demandShift, setDemandShift] = useState<ShiftType>("constant");
  const [supplyShift, setSupplyShift] = useState<ShiftType>("constant");
  const [magnitude, setMagnitude] = useState<MagnitudeType>("equal");

  // Determine actual numerical offsets for our mathematical graph
  const [dOffset, setDOffset] = useState(0);
  const [sOffset, setSOffset] = useState(0);

  useEffect(() => {
    let dVal = 0;
    let sVal = 0;

    if (demandShift === "increase") {
      dVal = magnitude === "demand_larger" ? 30 : magnitude === "supply_larger" ? 12 : 20;
    } else if (demandShift === "decrease") {
      dVal = magnitude === "demand_larger" ? -30 : magnitude === "supply_larger" ? -12 : -20;
    }

    if (supplyShift === "increase") {
      sVal = magnitude === "supply_larger" ? 30 : magnitude === "demand_larger" ? 12 : 20;
    } else if (supplyShift === "decrease") {
      sVal = magnitude === "supply_larger" ? -30 : magnitude === "demand_larger" ? -12 : -20;
    }

    setDOffset(dVal);
    setSOffset(sVal);
  }, [demandShift, supplyShift, magnitude]);

  // Analyze the effects
  const getEffects = () => {
    let priceEffect = "Constant";
    let qtyEffect = "Constant";

    // Simple Single Shift Rules
    if (demandShift === "increase" && supplyShift === "constant") {
      priceEffect = "Increase (↑)";
      qtyEffect = "Increase (↑)";
    } else if (demandShift === "decrease" && supplyShift === "constant") {
      priceEffect = "Decrease (↓)";
      qtyEffect = "Decrease (↓)";
    } else if (supplyShift === "increase" && demandShift === "constant") {
      priceEffect = "Decrease (↓)";
      qtyEffect = "Increase (↑)";
    } else if (supplyShift === "decrease" && demandShift === "constant") {
      priceEffect = "Increase (↑)";
      qtyEffect = "Decrease (↓)";
    }
    // Double shifts
    else if (demandShift === "increase" && supplyShift === "increase") {
      qtyEffect = "Increase (↑)";
      if (magnitude === "equal") priceEffect = "Constant (-)";
      else if (magnitude === "demand_larger") priceEffect = "Increase (↑)";
      else priceEffect = "Decrease (↓)";
    } else if (demandShift === "decrease" && supplyShift === "decrease") {
      qtyEffect = "Decrease (↓)";
      if (magnitude === "equal") priceEffect = "Constant (-)";
      else if (magnitude === "demand_larger") priceEffect = "Decrease (↓)";
      else priceEffect = "Increase (↑)";
    } else if (demandShift === "increase" && supplyShift === "decrease") {
      priceEffect = "Increase (↑)";
      if (magnitude === "equal") qtyEffect = "Constant (-)";
      else if (magnitude === "demand_larger") qtyEffect = "Increase (↑)";
      else qtyEffect = "Decrease (↓)";
    } else if (demandShift === "decrease" && supplyShift === "increase") {
      priceEffect = "Decrease (↓)";
      if (magnitude === "equal") qtyEffect = "Constant (-)";
      else if (magnitude === "demand_larger") qtyEffect = "Decrease (↓)";
      else qtyEffect = "Increase (↑)";
    }

    return { priceEffect, qtyEffect };
  };

  const { priceEffect, qtyEffect } = getEffects();

  const showMagnitudeToggle = demandShift !== "constant" && supplyShift !== "constant";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-gray-900 border-b border-gray-100 pb-3">
            Curve Shifting Lab
          </h3>

          {/* Demand Controls */}
          <div>
            <label className="block text-xs font-display font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Demand (D) Shift
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setDemandShift("decrease")}
                className={`py-2 px-3 text-xs font-display font-bold rounded-xl border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  demandShift === "decrease"
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-xs"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5" />
                Decrease (Left)
              </button>
              <button
                onClick={() => setDemandShift("constant")}
                className={`py-2 px-3 text-xs font-display font-bold rounded-xl border transition-all duration-200 ${
                  demandShift === "constant"
                    ? "bg-gray-100 border-gray-300 text-gray-800 shadow-xs"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Constant
              </button>
              <button
                onClick={() => setDemandShift("increase")}
                className={`py-2 px-3 text-xs font-display font-bold rounded-xl border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  demandShift === "increase"
                    ? "bg-blue-50 border-blue-200 text-blue-700 shadow-xs"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Increase (Right)
              </button>
            </div>
          </div>

          {/* Supply Controls */}
          <div>
            <label className="block text-xs font-display font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Supply (S) Shift
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSupplyShift("decrease")}
                className={`py-2 px-3 text-xs font-display font-bold rounded-xl border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  supplyShift === "decrease"
                    ? "bg-orange-50 border-orange-200 text-orange-700 shadow-xs"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5" />
                Decrease (Left)
              </button>
              <button
                onClick={() => setSupplyShift("constant")}
                className={`py-2 px-3 text-xs font-display font-bold rounded-xl border transition-all duration-200 ${
                  supplyShift === "constant"
                    ? "bg-gray-100 border-gray-300 text-gray-800 shadow-xs"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Constant
              </button>
              <button
                onClick={() => setSupplyShift("increase")}
                className={`py-2 px-3 text-xs font-display font-bold rounded-xl border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  supplyShift === "increase"
                    ? "bg-red-50 border-red-200 text-red-700 shadow-xs"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Increase (Right)
              </button>
            </div>
          </div>

          {/* Magnitude Controls for Double Shifts */}
          {showMagnitudeToggle && (
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-display font-semibold">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                Relative Shift Magnitude (DSE Requirement!)
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setMagnitude("demand_larger")}
                  className={`py-1.5 px-2 text-[10px] font-display font-bold rounded-lg border transition-all duration-200 ${
                    magnitude === "demand_larger"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  ΔD &gt; ΔS
                </button>
                <button
                  onClick={() => setMagnitude("equal")}
                  className={`py-1.5 px-2 text-[10px] font-display font-bold rounded-lg border transition-all duration-200 ${
                    magnitude === "equal"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  ΔD = ΔS
                </button>
                <button
                  onClick={() => setMagnitude("supply_larger")}
                  className={`py-1.5 px-2 text-[10px] font-display font-bold rounded-lg border transition-all duration-200 ${
                    magnitude === "supply_larger"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  ΔD &lt; ΔS
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Analysis Panel */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h4 className="font-display font-bold text-sm text-gray-900 uppercase tracking-wider text-gray-500">
            Equilibrium Analysis
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="text-[10px] font-display font-semibold text-gray-400 block uppercase">
                Equilibrium Price (P*)
              </span>
              <span
                className={`text-lg font-display font-extrabold flex items-center gap-1.5 mt-1 ${
                  priceEffect.includes("Increase")
                    ? "text-red-600"
                    : priceEffect.includes("Decrease")
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {priceEffect}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="text-[10px] font-display font-semibold text-gray-400 block uppercase">
                Equilibrium Quantity (Q*)
              </span>
              <span
                className={`text-lg font-display font-extrabold flex items-center gap-1.5 mt-1 ${
                  qtyEffect.includes("Increase")
                    ? "text-emerald-600"
                    : qtyEffect.includes("Decrease")
                    ? "text-amber-600"
                    : "text-gray-600"
                }`}
              >
                {qtyEffect}
              </span>
            </div>
          </div>

          {/* Step-by-Step explanation */}
          <div className="pt-2 border-t border-gray-100 text-xs text-gray-600 space-y-2">
            <p className="font-display font-bold text-gray-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Economic Reasoning Chain:
            </p>
            <ul className="space-y-2 list-none pl-1">
              <li className="flex items-start gap-2">
                <span className="font-mono bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5">D</span>
                <span>
                  {demandShift === "increase"
                    ? "Demand increases. Buyers are willing and able to purchase more at all prices, shifting D to the right."
                    : demandShift === "decrease"
                    ? "Demand decreases. Buyers purchase less at all prices, shifting D to the left."
                    : "Demand remains constant. Non-price consumer determinants are unchanged."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono bg-red-100 text-red-800 text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5">S</span>
                <span>
                  {supplyShift === "increase"
                    ? "Supply increases. Production costs are lower or factors rise, shifting S right (increasing output)."
                    : supplyShift === "decrease"
                    ? "Supply decreases. Higher production cost or input scarcity shifts S left (contracting output)."
                    : "Supply remains constant. Non-price supply determinants are unchanged."}
                </span>
              </li>
              {showMagnitudeToggle && (
                <li className="flex items-start gap-2">
                  <span className="font-mono bg-purple-100 text-purple-800 text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5">Mag</span>
                  <span>
                    {magnitude === "demand_larger"
                      ? "Because the Demand shift exceeds the Supply shift, the Demand change dominates the final Price & Quantity direction."
                      : magnitude === "supply_larger"
                      ? "Because the Supply shift exceeds the Demand shift, the Supply change dominates the final Price & Quantity direction."
                      : "Demand and Supply curves shift by equal amounts, causing one variable to be perfectly constant."}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Graph Column */}
      <div className="lg:col-span-7 flex flex-col items-center">
        <InteractiveGraph demandShift={dOffset} supplyShift={sOffset} />
      </div>
    </div>
  );
}
