import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const hours = Array.from({ length: 16 }, (_, i) => i + 10);

const HourLabels = ({ selectedIndex }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[260px] pr-2 text-sm text-right font-vazir leading-5">
      {hours.map((h, i) => {
        const isActive = i === selectedIndex;
        const isAdjacent = Math.abs(i - selectedIndex) === 1;

        return (
          <div
            key={i}
            className={`transition-all duration-300 h-[11px] ${
              isActive
                ? 'text-[#525252] font-bold text-xs leading-[18px]'
                : isAdjacent
                  ? 'text-gray-400 text-xs opacity-[40%] leading-[18px]'
                  : 'invisible'
            }`}
          >
            {h.toLocaleString('fa-IR')}:۰۰
          </div>
        );
      })}
    </div>
  );
};

const TimeSlider = ({ value, onChange }) => {
  return (
    <div className="h-[260px]">
      <Slider
        vertical
        range
        value={value}
        onChange={onChange}
        min={0}
        max={hours.length - 1}
        step={1}
        trackStyle={[
          {
            backgroundColor: '#F87A08',
            width: 14,
            left: '50%',
            transform: 'translateX(-50%)',
          },
        ]}
        railStyle={{
          backgroundColor: '#fff',
          width: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          border: '0.3px solid #000',
          boxShadow: '-4px 4px 3px #00000040 inset',
        }}
        handleStyle={[
          {
            height: 30,
            width: 30,
            border: '3px solid #F87A08',
            background:
              'linear-gradient(to bottom, white, rgba(200, 200, 200, 0.9), #B8B8B8)',
            borderRadius: '9999px',
            left: '11px',
            transform: 'translateX(-50%)',
          },
          {
            height: 30,
            width: 30,
            border: '3px solid #F87A08',
            background: 'linear-gradient(180deg, #FFFBF8 100%, #B0A6A5 0%)',
            borderRadius: '9999px',
            left: '80%',
            transform: 'translateX(-50%)',
          },
        ]}
      />
    </div>
  );
};

export default function TimeSelector({ value, onChange }) {
  const handleTimeChange = (val) => {
    const sorted = [...val].sort((a, b) => a - b);
    onChange(sorted);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex items-center rounded-2xl px-6 py-6">
        <div className="flex items-center">
          <HourLabels selectedIndex={value[1]} />
          <TimeSlider value={value} onChange={handleTimeChange} />
          <HourLabels selectedIndex={value[0]} />
        </div>
      </div>
    </div>
  );
}
