import React, { useState } from 'react';
import DateSlider, { getJalaliDays } from '../Slider/DateSlider';
import TimeSelector, { hours } from '../Slider/TimeSlider';
import { useNavigate } from 'react-router-dom';

const TimeBtn = () => {
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedTime, setSelectedTime] = useState([4, 8]);

  const { days: dates } = getJalaliDays();
  const navigate = useNavigate();

  const formatHour = (h) => {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const period = h < 12 ? 'قبل‌ازظهر' : 'بعدازظهر';
    return `${hour12.toLocaleString('fa-IR')} ${period}`;
  };

  const convertDateToPersian = (label) => {
    return label.replace(/\d+/g, (num) => Number(num).toLocaleString('fa-IR'));
  };

  const formatHour2 = (h) => {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12.toLocaleString('fa-IR')}`;
  };

  return (
    <div className="flex justify-center items-center flex-col mx-6">
      <p className="font-bold text-base leading-8  mb-[29px] text-center text-[#525252]">
        ساعت و روز دلخواهت رو هماهنگ کن:
      </p>

      <div className="flex flex-col border border-[#F87A08] mb-12 rounded-[40px] ">
        <fieldset className="relative h-[388px] rounded-2xl w-[345px] flex items-center justify-center">
          <legend className="absolute -top-2 right-1 bg-white px-2 text-sm text-gray-600">
            ساعت
          </legend>

          <div className="flex-1 flex justify-center items-center">
            <TimeSelector value={selectedTime} onChange={setSelectedTime} />
          </div>
          <div className="w-px h-full border border-[#8F8F8F] opacity-40 absolute"></div>

          <legend className="absolute -top-3 left-[35%] bg-white px-2 text-sm text-gray-600">
            روز
          </legend>
          <div className="flex-1 flex justify-center items-center">
            <DateSlider value={selectedDate} onChange={setSelectedDate} />
          </div>
        </fieldset>

        <div className="flex justify-between items-center min-h-[50px] bg-[#E6E6EA] text-sm font-bold border-t border-t-[#8F8F8F] text-black rounded-b-[40px]">
          <span className="text-center w-1/2 pl-2 ">
            {`از ${formatHour2(hours[selectedTime[0]])} تا ${formatHour(
              hours[selectedTime[1]]
            )}`}
          </span>

          <div className="w-px bg-[#8F8F8F] self-stretch mx-4" />

          <span className="text-center w-1/2 tex-sx leading-[18px] font-bold">
            {convertDateToPersian(dates[selectedDate])}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate('/selectTabel')}
        // w-[70%]
        className="text-white bg-[#F87A08] w-[345px] border-2 rounded-[50px] px-6 py-3"
      >
        برگزیدن
      </button>
    </div>
  );
};

export default TimeBtn;
