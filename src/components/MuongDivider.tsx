import React from 'react';

export const MuongDivider: React.FC<{ label?: string }> = ({ label }) => {
  return (
    <div aria-hidden="true" className="w-full flex items-center justify-center py-6 bg-transparent">
      <div className="w-24 h-[1px] bg-[#d4c3bc]"></div>
      <div className="mx-3 flex items-center gap-1.5 text-[#7f5600]">
        <span className="inline-block w-2 h-2 rotate-45 bg-[#7f5600]"></span>
        <span className="inline-block w-3.5 h-3.5 rotate-45 border-2 border-[#7f5600] bg-transparent"></span>
        <span className="inline-block w-2 h-2 rotate-45 bg-[#7f5600]"></span>
      </div>
      {label && (
        <span className="font-label-archive font-mono text-[11px] uppercase tracking-widest text-[#7f5600] font-semibold mx-2">
          {label}
        </span>
      )}
      <div className="w-24 h-[1px] bg-[#d4c3bc]"></div>
    </div>
  );
};

export default MuongDivider;

