import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { toJalaali } from 'jalaali-js';

const months = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export const getJalaliDays = () => {
  const today = new Date();
  const days = [];

  const todayJalali = toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  const todayLabel = `${todayJalali.jd} ${months[todayJalali.jm - 1]}`;

  let todayIndex = 0;

  for (let i = 0; i < 31; i++) {
    const next = new Date();
    next.setDate(today.getDate() + i);
    const { jm, jd } = toJalaali(
      next.getFullYear(),
      next.getMonth() + 1,
      next.getDate()
    );
    const label = `${jd.toLocaleString('fa-IR')} ${months[jm - 1]}`;
    days.push(label);
    if (label === todayLabel) todayIndex = i;
  }

  return { days, todayIndex };
};

const DateLabels = ({ selectedIndex, days }) => {
  return (
    <div className="flex flex-col-reverse justify-center items-center h-[268px] mr-2 text-xs font-dana font-bold leading-[18px]">
      {days.map((date, i) => {
        const distance = Math.abs(i - selectedIndex);
        const isVisible = distance <= 1 || i === 0 || i === days.length - 1;
        const isPrev = i === selectedIndex - 1;
        const isNext = i === selectedIndex + 1;
        return (
          <div
            key={i}
            className={`h-[calc(268px/31)] flex items-center justify-between transition-all duration-300 mr-2 
              ${
                i === selectedIndex
                  ? 'text-[#525252] mb-1 mt-1'
                  : isVisible
                    ? 'text-[#525252] opacity-40'
                    : 'opacity-0'
              }
             ${isPrev ? 'mb-1' : ''}
             ${isNext ? 'mt-1' : ''}
            `}
          >
            {date}
          </div>
        );
      })}
    </div>
  );
};

export default function DateSlider({ value, onChange }) {
  const { days } = getJalaliDays();

  return (
    <div className="flex items-center justify-between">
      <div className="h-[268px] relative">
        <Slider
          vertical
          min={0}
          max={days.length - 1}
          value={value}
          onChange={onChange}
          step={1}
          trackStyle={[
            {
              backgroundColor: '#F87A08',
              width: 14,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          ]}
          // main slider
          railStyle={{
            backgroundColor: '#fff',
            width: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            border: '0.3px solid #000',
            // boxShadow: "inset -1px 1px 3px rgba(0,0,0,0.2)",
            boxShadow: '-4px 4px 3px #00000040 inset',
            borderRadius: '7',
          }}
          // circle
          handleStyle={[
            {
              height: 30,
              width: 30,
              border: '3px solid #F87A08',
              marginBottom: '-5px',
              // background: "linear-gradient(159deg, #B0A6A5 50%, #FFFBF8 100%)",
              background:
                'radial-gradient(circle at 30% 30%, #FFFBF8, #B0A6A5)',
              boxShadow:
                'inset -2px -2px 4px rgba(255, 255, 255, 0.7), inset 2px 2px 4px rgba(0, 0, 0, 0.15)',
              borderRadius: '50%',
              left: '-4px',
              transform: 'none',
            },
          ]}
        />
      </div>
      <DateLabels selectedIndex={value} days={days} />
    </div>
  );
}
