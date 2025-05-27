import React from 'react';



const statusList = [
  { id: 1, label: 'آزاد', color: '#57A433' },
  { id: 2, label: 'هماهنگ موقت', color: '#FAC438' },
  { id: 3, label: 'هماهنگ‌شده', color: '#CE0A0A' },
];

const Situation = () => {
  return (
    <div className="mt-4 flex gap-[40px] items-center">
      {statusList.map((status) => (
        <div key={status.id} className="flex items-center gap-2">
          <div
            className="w-[14px] h-[14px] rounded-full"
            style={{ backgroundColor: status.color }}
          ></div>
          <span className="text-[#525252] font-dana font-normal text-xs leading-8">
            {status.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Situation;
