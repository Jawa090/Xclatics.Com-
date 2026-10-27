import { BriefcaseBusiness, ChartNoAxesCombined, FileCheck2, Users, Wallet, Workflow } from "lucide-react";

const nodes = [
  { Icon: BriefcaseBusiness, position: "operations-sales" },
  { Icon: Users, position: "operations-team" },
  { Icon: Workflow, position: "operations-project" },
  { Icon: FileCheck2, position: "operations-approval" },
  { Icon: Wallet, position: "operations-finance" },
  { Icon: ChartNoAxesCombined, position: "operations-report" },
];

export function OperationsBackground() {
  return (
    <div aria-hidden="true" className="operations-background pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="operations-connections h-full w-full" viewBox="0 0 1440 760" preserveAspectRatio="none" fill="none">
        <g className="operations-lines">
          <path d="M-20 170H145V280H240V460H140V625H-20" />
          <path d="M-20 340H90V460H240" />
          <path d="M1460 160H1295V280H1200V460H1300V630H1460" />
          <path d="M1460 360H1360V460H1200" />
          <path d="M140 625H420V710H1020V630H1300" />
        </g>
        <g className="operations-signals">
          <path d="M-20 170H145V280H240V460H140V625H-20" />
          <path d="M1460 160H1295V280H1200V460H1300V630H1460" />
          <path d="M140 625H420V710H1020V630H1300" />
        </g>
      </svg>
      {nodes.map(({ Icon, position }) => (
        <span key={position} className={`operations-node ${position}`}>
          <Icon size={24} strokeWidth={1.4} />
        </span>
      ))}
    </div>
  );
}