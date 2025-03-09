
interface ImpactBadgeProps {
  impact: string;
}

export const ImpactBadge = ({ impact }: ImpactBadgeProps) => {
  const colors = {
    alto: 'bg-red-100 text-red-800',
    medio: 'bg-yellow-100 text-yellow-800',
    basso: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[impact as keyof typeof colors]}`}>
      {impact}
    </span>
  );
};
