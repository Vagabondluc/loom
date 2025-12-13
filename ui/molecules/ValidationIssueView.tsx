import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { clsx } from 'clsx';

type Issue = { id: string; type: 'error' | 'warning' | 'info'; message: string };

type Props = { issue: Issue };

export const ValidationIssueView: React.FC<Props> = ({ issue }) => {
  const classes = clsx(
    "flex items-start gap-2 text-xs p-2 rounded",
    issue.type === 'error' && "bg-error/10 text-error",
    issue.type === 'warning' && "bg-warning/10 text-warning-content",
    issue.type === 'info' && "bg-info/10 text-info-content"
  );

  const Icon = issue.type === 'error' ? AlertCircle : issue.type === 'warning' ? AlertTriangle : Info;

  return (
    <div className={classes}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="opacity-90 leading-relaxed">{issue.message}</span>
    </div>
  );
};

export default ValidationIssueView;
