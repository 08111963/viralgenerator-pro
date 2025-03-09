
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrendValidationTooltipProps {
  issues: string[];
  children: React.ReactNode;
}

export const TrendValidationTooltip = ({ issues, children }: TrendValidationTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{issues.join(', ')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
