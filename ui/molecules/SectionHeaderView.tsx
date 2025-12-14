import React from 'react';

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
};

export const SectionHeaderView: React.FC<Props> = ({ title, subtitle, className }) => {
  return (
    <div className={"prose max-w-none " + (className || '')}>
      <h2 className="text-3xl font-bold border-b pb-2">{title}</h2>
      {subtitle}
    </div>
  );
};

export default SectionHeaderView;
