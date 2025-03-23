
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  className?: string;
  onClick?: () => void;
}

const MetricCard = ({
  title,
  value,
  icon,
  trend,
  color = 'blue',
  className,
  onClick
}: MetricCardProps) => {
  const colorClasses = {
    blue: 'from-health-blue/20 to-health-blue/5 border-health-blue/30 text-health-blue',
    green: 'from-health-green/20 to-health-green/5 border-health-green/30 text-health-green',
    yellow: 'from-health-yellow/20 to-health-yellow/5 border-health-yellow/30 text-health-yellow',
    red: 'from-health-red/20 to-health-red/5 border-health-red/30 text-health-red',
    purple: 'from-health-purple/20 to-health-purple/5 border-health-purple/30 text-health-purple'
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-5 border backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md",
        "bg-gradient-to-br bg-white/80 dark:bg-gray-800/80",
        colorClasses[color],
        className,
        onClick && "cursor-pointer hover:translate-y-[-2px] hover:shadow-lg"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
        <div className={`text-${color} transition-transform duration-300 hover:scale-110`}>{icon}</div>
      </div>
      
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <span className={`ml-2 text-xs font-medium ${trend.isPositive ? 'text-health-green' : 'text-health-red'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
