import type { ReactNode } from "react";
import "./ReportStatCard.css";

type ReportStatCardProps = {
  icon: ReactNode;
  label: string;
  count: number;
  iconClassName?: string;
};

function ReportStatCard({
  icon,
  label,
  count,
  iconClassName = "",
}: ReportStatCardProps) {
  return (
    <article className="ReportStatCard-Global">
      <span className={`ReportStatCard-Icon ${iconClassName}`}>{icon}</span>
      <span className="ReportStatCard-Label">{label}</span>
      <h2 className="ReportStatCard-Count">{count}</h2>
    </article>
  );
}

export default ReportStatCard;
