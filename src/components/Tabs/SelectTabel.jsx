import React from 'react';

import price from '../../assets/chairpriceicon.svg';
import tabel from '../../assets/plane.svg';
import Situation from '../Situation/Situation';
const SelectTabel = () => {
  return (
    <div className="mx-6 sm:flex sm:justify-center sm:items-center sm:flex-col">
      <span className="font-bold text-base leading-8 text-right text-[#525252]">
        میز دلخواهت رو انتخاب و شخصی‌سازی کن:
      </span>
      <div className="flex mt-2 items-center text-right">
        <img src={price} alt="price for chair" />
        <p className="font-medium text-sm leading-6 text-[#525252]">
          هزینه اجاره هر صندلی: 30 هزارتومان
        </p>
      </div>
      <img src={tabel} alt="" className="mt-3" />
      <div className="mt-4 flex gap-[40px] items-center">
        <Situation />
      </div>
      <div className="flex items-center gap-3 sm:w-[70%] mt-[44px] justify-between mb-8">
        <button
          className="
        bg-[#F87A08] font-bold text-lg leading-8 font-dana p-3 w-[50%] rounded-[40px] text-white"
        >
          شخصی‌سازی
        </button>
        <button
          className="border-2 border-[#F87A08] rounded-[40px] text-[#F87A08] p-3 w-[50%]
          font-bold text-lg leading-8 font-dana
          
        "
        >
          رد کردن
        </button>
      </div>
    </div>
  );
};

export default SelectTabel;
