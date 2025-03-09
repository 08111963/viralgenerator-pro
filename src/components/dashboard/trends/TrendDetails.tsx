
import { TrendIndicator } from "./TrendIndicator";
import { ImpactBadge } from "./ImpactBadge";
import { type TrendDetail } from "@/hooks/usePredictiveTrends";

interface TrendDetailsProps {
  details: TrendDetail;
}

export const TrendDetails = ({ details }: TrendDetailsProps) => (
  <div className="space-y-2 mt-4 p-4 bg-muted rounded-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TrendIndicator trend={details.trend} />
        <span className={`font-medium ${details.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {details.percentageChange > 0 ? '+' : ''}{details.percentageChange}%
        </span>
      </div>
      <ImpactBadge impact={details.impact} />
    </div>
    <div className="text-sm">
      <p className="text-muted-foreground">Velocità: <span className="font-medium">{details.velocity}</span></p>
      <div className="mt-2">
        <p className="font-medium mb-1">Fattori chiave:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          {details.factors.map((factor, idx) => (
            <li key={idx}>{factor}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
