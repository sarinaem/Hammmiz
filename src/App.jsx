import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './components/Home/Home';
import Product from './components/Product/product';
import './App.css';
import './index.css';
import SelectTabel from './components/Tabs/SelectTabel';
import MapView from './components/Map/Mapview';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className=" font-dana max-w-[627px] w-full mx-auto">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/map"
              element={
                <MapView
                  mapPoint={{ lat: 35.701825570554576, lng: 51.39133193872797 }}
                />
              }
            />
            <Route path="/product" element={<Product />} />
            <Route path="/selectTabel" element={<SelectTabel />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
