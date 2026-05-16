"use client";

import { useMemo, useState } from "react";

function formatMoney(value: number) {
  if (!Number.isFinite(value) || value < 0) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(2)}%`;
}

const compoundOptions = [
  { value: "1", label: "Annually" },
  { value: "4", label: "Quarterly" },
  { value: "12", label: "Monthly" },
  { value: "365", label: "Daily" },
] as const;

export function ApyCalculatorTool() {
  const [initialDeposit, setInitialDeposit] = useState("10000");
  const [apy, setApy] = useState("4.50");
  const [years, setYears] = useState("5");
  const [monthlyContribution, setMonthlyContribution] = useState("250");
  const [compoundPerYear, setCompoundPerYear] = useState("12");

  const result = useMemo(() => {
    const principal = Number(initialDeposit);
    const annualYield = Number(apy);
    const durationYears = Number(years);
    const contribution = Number(monthlyContribution);
    const compounds = Number(compoundPerYear);

    if (
      !Number.isFinite(principal) || principal < 0 ||
      !Number.isFinite(annualYield) || annualYield < 0 ||
      !Number.isFinite(durationYears) || durationYears <= 0 ||
      !Number.isFinite(contribution) || contribution < 0 ||
      !Number.isFinite(compounds) || compounds <= 0
    ) {
      return null;
    }

    const rate = annualYield / 100;
    const totalMonths = Math.round(durationYears * 12);
    const monthlyRate = Math.pow(1 + rate / compounds, compounds / 12) - 1;

    let balance = principal;
    const checkpoints: { label: string; balance: string }[] = [];

    for (let month = 1; month <= totalMonths; month += 1) {
      balance = balance * (1 + monthlyRate) + contribution;
      if (month % 12 === 0 || month === totalMonths) {
        checkpoints.push({
          label: month === totalMonths ? `Year ${month / 12}` : `After ${month / 12} year${month === 12 ? "" : "s"}`,
          balance: formatMoney(balance),
        });
      }
    }

    const totalContributions = principal + contribution * totalMonths;
    const interestEarned = balance - totalContributions;
    const effectiveAnnualRate = (Math.pow(1 + monthlyRate, 12) - 1) * 100;

    return {
      futureBalance: formatMoney(balance),
      totalContributions: formatMoney(totalContributions),
      interestEarned: formatMoney(interestEarned),
      effectiveAnnualRate: formatPercent(effectiveAnnualRate),
      monthlyGrowth: formatPercent(monthlyRate * 100),
      totalMonths,
      checkpoints,
    };
  }, [initialDeposit, apy, years, monthlyContribution, compoundPerYear]);

  return (
    <section className="panel section" aria-labelledby="apy-tool-heading">
      <div className="tool-grid">
        <div className="panel-stack">
          <div>
            <h2 id="apy-tool-heading" className="section-title">APY growth calculator</h2>
            <p className="note">Enter a starting balance, APY, time horizon, and recurring monthly deposit to project savings growth.</p>
          </div>
          <div className="form-grid form-grid-3">
            <label className="field">
              <span>Initial deposit</span>
              <input className="input" inputMode="decimal" value={initialDeposit} onChange={(event) => setInitialDeposit(event.target.value)} />
            </label>
            <label className="field">
              <span>APY (% per year)</span>
              <input className="input" inputMode="decimal" value={apy} onChange={(event) => setApy(event.target.value)} />
            </label>
            <label className="field">
              <span>Years</span>
              <input className="input" inputMode="decimal" value={years} onChange={(event) => setYears(event.target.value)} />
            </label>
            <label className="field">
              <span>Monthly contribution</span>
              <input className="input" inputMode="decimal" value={monthlyContribution} onChange={(event) => setMonthlyContribution(event.target.value)} />
            </label>
            <label className="field">
              <span>Compounding frequency</span>
              <select className="select" value={compoundPerYear} onChange={(event) => setCompoundPerYear(event.target.value)}>
                {compoundOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="card">
            <h3>How to use</h3>
            <ol className="inline-list">
              <li>Enter your current savings balance or opening deposit.</li>
              <li>Add the APY advertised by your bank or account provider.</li>
              <li>Include any monthly deposit to model regular saving habits.</li>
            </ol>
          </div>
        </div>

        <aside className="panel-stack" aria-live="polite">
          <div className="result-hero">
            <p className="note">Estimated future balance</p>
            <h3>{result?.futureBalance || "—"}</h3>
            <p>{result ? `Projected over ${result.totalMonths} months with an effective annual rate of ${result.effectiveAnnualRate}.` : "Add valid numbers to estimate savings growth."}</p>
          </div>

          <div className="kpi-grid">
            <article className="kpi-card">
              <span className="split-label">Future balance</span>
              <strong>{result?.futureBalance || "—"}</strong>
            </article>
            <article className="kpi-card">
              <span className="split-label">Interest earned</span>
              <strong>{result?.interestEarned || "—"}</strong>
            </article>
            <article className="kpi-card">
              <span className="split-label">Your contributions</span>
              <strong>{result?.totalContributions || "—"}</strong>
            </article>
          </div>

          <div className="card">
            <h3>Growth details</h3>
            {result ? (
              <div className="split-grid compact-grid">
                <div className="split-row"><span>Effective annual return</span><strong>{result.effectiveAnnualRate}</strong></div>
                <div className="split-row"><span>Estimated monthly growth</span><strong>{result.monthlyGrowth}</strong></div>
              </div>
            ) : (
              <p className="note">Yield details will appear here.</p>
            )}
          </div>

          <div className="card">
            <h3>Yearly checkpoints</h3>
            <div className="split-grid compact-grid">
              {result?.checkpoints.length ? (
                result.checkpoints.map((checkpoint) => (
                  <div key={checkpoint.label} className="split-row">
                    <span>{checkpoint.label}</span>
                    <strong>{checkpoint.balance}</strong>
                  </div>
                ))
              ) : (
                <p className="note">Savings checkpoints will appear after a valid calculation.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
