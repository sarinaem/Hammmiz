import { useMap } from 'react-leaflet';
import L from 'leaflet';
import React from 'react';

export default function LocateButton() {
  const map = useMap();

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert('لطفا لوکیشن خودتون رو انتخاب کنید.');
      return;
    }
    console.log('start locating...');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        map.setView([latitude, longitude], 20, { animate: true });

        const myIcon = L.icon({
          iconUrl: '/mylocation.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        L.marker([latitude, longitude], { icon: myIcon })
          .addTo(map)
          .openPopup();
      },
      (err) => {
        alert('خطا در دریافت موقعیت.');
        console.error(err);
      }
    );
  };

  return (
    <div className="absolute bottom-24 right-4 z-[1000]">
      <button onClick={handleLocate} className="p-2 rounded-full">
        <img
          src="/userLocation.svg"
          className="w-[35px] h-[35px] mb-[40px] ml-6"
          alt=""
        />
      </button>
    </div>
  );
}



