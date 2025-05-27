import React from 'react';

import { CiLocationOn } from 'react-icons/ci';
import star from '../../assets/Star.svg';
import imgData from '../../assets/hammmizimage.png';
import subwayIcon from '../../assets/metroicon.svg';
import parking from '../../assets/Parking.svg';
import phone from '../../assets/phone.svg';

import data from '../../data/fakeData';

import time from '../../assets/openingicon.svg';
const DataBtn = () => {
  // const formatTime = (m) => {
  //   const hr = Math.floor(m / 60);
  // };

  const timeStringToMinutes = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
  };

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <div className="flex gap-4 flex-col items-center">
              <div className="flex gap-1 w-full justify-around">
                <CiLocationOn className="text-[#F87A08] font-dana w-7 h-7 font-bold" />
                <p className="text-[#525252] text-[14px] font-medium font-dana w-full">
                  {item.address}
                </p>
                <div className="flex items-center justify-center gap-1 ml-6 mt-5 font-medium">
                  <span className="text-[#525252] font-dana text-[14px] font-medium leading-6 ">
                    {Number(item.score)
                      .toLocaleString('fa-IR')
                      .replace('٫', '.')}
                  </span>
                  <img src={star} alt="star icon" />
                </div>
              </div>
              <div className="flex flex-row gap-[72px] text-nowrap">
                <div className="flex gap-1">
                  <img src={subwayIcon} alt="" />
                  {/* {timeStringToMinutes(item.distance_from_metro)
                      .toFixed(0)
                      .toLocaleString("fa-IR")
                      .toLocaleString("fa-IR")}{" "}
                    مترو از انقلاب */}

                  <span className="text-[#525252] text-[14px] font-dana font-medium flex leading-6">
                    {Math.round(
                      timeStringToMinutes(item.distance_from_metro)
                    ).toLocaleString('fa-IR')}{' '}
                    دقیقه از مترو انقلاب
                  </span>
                </div>
                <div className="flex gap-1">
                  <img src={time} alt="time of work" />
                  <span className="text-[#525252] text-[14px] font-dana font-medium leading-6">
                    {Math.round(
                      Number(item.open_at.split(':')[0])
                    ).toLocaleString('fa-IR')}{' '}
                    صبح تا{' '}
                    {Math.round(
                      Number(item.close_at.split(':')[0])
                    ).toLocaleString('fa-IR')}{' '}
                    شب
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-[72px] text-nowrap">
                <div className="flex gap-1">
                  <img src={parking} alt="" />
                  <span className="text-[#525252] font-dana text-[14px] font-medium leading-6">
                    {Math.round(
                      timeStringToMinutes(item.distance_from_parking)
                    ).toLocaleString('fa-IR')}{' '}
                    {''}
                    دقیقه از پارکینگ حافظ
                  </span>
                </div>
                <div className="flex gap-2">
                  <img
                    src={phone}
                    alt="time of work"
                    className="w-5 h-5 -mr-3"
                  />
                  <span className="text-[#525252] text-[14px] font-dana font-medium leading-6">
                    {item.landline_number.replace(
                      /\d/g,
                      (d) => '۰۱۲۳۴۵۶۷۸۹'[d]
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img src={imgData} alt="" className="mt-8" />
            </div>{' '}
          </div>
        );
      })}
    </div>
  );
};

export default DataBtn;
