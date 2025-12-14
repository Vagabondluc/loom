import React from 'react';

type Props = {
  name: string;
  Icon: React.ComponentType<any>;
  size?: number;
  strokeWidth?: number;
  onClick?: () => void;
  title?: string;
  className?: string;
};

export const IconTile: React.FC<Props> = ({ name, Icon, size = 24, strokeWidth = 2, onClick, title, className }) => {
  return (
    <button
      onClick={onClick}
      title={title ?? `Copy "${name}"`}
      className={"flex flex-col items-center justify-center p-2 rounded-lg hover:bg-base-200 hover:text-primary transition-all border border-transparent hover:border-base-300 group active:scale-95 relative " + (className || '')}
      style={{ minHeight: `${size + 40}px` }}
    >
      {/* @ts-ignore */}
      <Icon size={size} strokeWidth={strokeWidth} className="text-base-content/80 group-hover:text-primary transition-colors duration-200" />
      <span className="text-[10px] font-mono opacity-60 group-hover:opacity-100 truncate w-full text-center select-all mt-2 absolute bottom-2 px-2">
        {name}
      </span>
    </button>
  );
};

export default IconTile;
