import React from 'react';
import { Button } from '../atoms/Button';

type Props = {
  title?: string;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
};

export const QuickActionButtonView: React.FC<Props> = ({ title, icon, onClick, disabled, className }) => {
  return (
    <Button variant="ghost" size="xs" className={`btn-square ${className || ''}`} title={title} onClick={onClick} disabled={disabled}>
      {icon}
    </Button>
  );
};

export default QuickActionButtonView;
