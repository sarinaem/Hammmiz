import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

import admin from '../../assets/admin.svg';
import search from '../../assets/Search.svg';
// import { getLocations } from "@/api/Location";

import { useNavigate } from 'react-router-dom';
import { getLocations } from '@/api/api';

import LocateButton from '../LocationUser/LocationUser';

const StaticMap = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const [activeLocation, setActiveLocation] = useState(null);

  const [activeId, setActiveId] = useState();
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocations();
      console.log(data);

      setLocations(data);
    };
    fetchLocations();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(true);
  };

  const filteredLocations = locations.filter((loc) => {
    // loc.name.includes(searchTerm.trim());
    const query = searchTerm.trim();
    // const convertedQuery = convertPersian(query);
    return loc.name?.includes(query);
    // || loc.name.includes();
  });

  const handleSelectLocation = (loc) => {
    setActiveLocation(loc);
    setActiveId(loc.id);
    ref.current?.blur();
    setSearchTerm(loc.name);
    setShowResults(false);
  };

  const ZoomToLocation = ({ location }) => {
    const map = useMap();

    useEffect(() => {
      if (location) {
        map.setView([location.latitude, location.longitude], 17, {
          animate: true,
          duration: 1.5,
        });
      }
    }, [location, map]);

    return null;
  };

  const getIcon = (id) => {
    const isActive = activeId === id;
    return new L.Icon({
      iconUrl: isActive ? '/active.svg' : '/disable.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };

  /**
   * Toggle Marker Active State
   */
  const toggleActive = (id) => {
    const loc = locations.find((l) => l.id === id);
    setActiveId((prevId) => (prevId === id ? null : id));
    setActiveLocation(loc);
  };

  // const { data } = useGetLocation();
  // console.log(data);

  return (
    <div style={{ height: '100vh' }} className="relative mx-auto">
      {/* Search Input */}
      <div
        className="absolute font-normal leading-6 text-base top-[10px] flex flex-row-reverse gap-6 p-1 rounded-[40px] justify-between items-center bg-white"
        style={{
          zIndex: 1000,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <img src={admin} alt="admin" />
        <div className="flex items-center flex-row-reverse gap-3">
          <div>
            <input
              value={searchTerm}
              type="text"
              ref={ref}
              placeholder="همممیز خودت رو انتخاب کن"
              onChange={handleSearch}
              className="text-[#525252] leading-[23px] text-base font-dana font-normal text-right bg-transparent border-none outline-none
             placeholder:text-[#525252] w-full"
            />
          </div>
          <div className="bg-[#F87A08] rounded-full object-contain flex justify-center items-center w-[40px] h-[40px] cursor-pointer">
            <img src={search} alt="search" className="w-[18px] h-[18px]" />
          </div>
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <ul className="absolute top-[54px] outline-none border-none right-[40px] w-[86%] rounded-lg rounded-t-none bg-white border mt-1 z-[1000]">
          {filteredLocations.length ? (
            filteredLocations.map((loc) => (
              <li
                key={loc.id}
                onClick={() => {
                  handleSelectLocation(loc);
                }}
                className="p-2 cursor-pointer rounded-md mt-[6px] hover:bg-gray-200 "
              >
                {loc.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">هممیز پیدا نشد 🤷‍♀️</li>
          )}
        </ul>
      )}

      {/* Map */}
      <MapContainer
        center={
          activeLocation
            ? [activeLocation.latitude, activeLocation.longitude]
            : [35.701065, 51.391214]
        }
        // center={("latitude", "longitude")}
        attributionControl={false}
        zoomControl={false}
        scrollWheelZoom={true}
        zoom={20}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.latitude, loc.longitude]}
            icon={getIcon(loc.id)}
            eventHandlers={{
              click: (e) => {
                toggleActive(loc.id), e.target.closePopup();
              },
            }}
          >
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
        {activeLocation && <ZoomToLocation location={activeLocation} />}
        <LocateButton />
      </MapContainer>

      <div
        className=" bottom-10 h-[50px] absolute left-1/2 transform -translate-x-1/2 w-[90%] flex justify-center"
        style={{ zIndex: 1000 }}
      >
        <button
          onClick={() => navigate('/product')}
          disabled={!activeId}
          className={`px-6 py-2 rounded-[50px] w-[95%] font-bold font-dana text-lg leading-[26px] ${
            activeId ? 'bg-orange-500' : 'bg-[#999999]'
          } text-white`}
        >
          برگزیدن
        </button>
      </div>
    </div>
  );
};

export default StaticMap;
