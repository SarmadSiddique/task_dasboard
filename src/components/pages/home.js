// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import { Card, Container } from "react-bootstrap";
// import { FaGoogle } from "react-icons/fa"; // Example icon
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const Home = () => {
//   const data = [
//     { name: 'US', CPC: 3.26 },
//     { name: 'HK', CPC: 3.1 },
//     { name: 'AU', CPC: 3.0 },
//     { name: 'SG', CPC: 2.9 },
//     { name: 'NZ', CPC: 2.8 },
//     { name: 'UK', CPC: 2.75 },
//     { name: 'CA', CPC: 2.7 },
//     { name: 'IE', CPC: 2.6 },
//     { name: 'CH', CPC: 2.5 },
//   ];

//   const globalVolumeData = [
//     { name: 'US', volume: 201000 },
//     { name: 'IN', volume: 110000 },
//     { name: 'JP', volume: 49500 },
//     { name: 'UK', volume: 40500 },
//     { name: 'FR', volume: 33100 },
//     { name: 'DE', volume: 33100 },
//   ];

//   return (
//     <React.Fragment>
//       <section className="bg_primary ">
//         <Container fluid="lg" className="text_white">
//           <div className="max-w-6xl mx-auto p-4">
//             {/* Header Section */}
//             <div className="flex items-center justify-between pb-4 border-b border-gray-200">
//               <div className="text-xl font-semibold">Overview</div>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//                 Bulk Keyword Analysis
//               </button>
//             </div>

//             {/* Search Section */}
//             <div className="mt-4 flex items-center gap-2">
//               <input type="text" value="SEO" className="border border-gray-300 rounded-md px-4 py-2" readOnly />
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Search</button>
//             </div>

//             {/* Main Content Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
//               {/* Difficulty Section */}
//               <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold">Difficulty</h2>
//                 <div className="text-center mt-4">
//                   <div className="text-4xl font-bold">67</div>
//                   <div className="text-sm text-gray-500">Out of 100</div>
//                   <div className="text-orange-500">Not Easy</div>
//                 </div>
//               </div>

//               {/* Search Volume Section */}
//               <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold">Search Volume</h2>
//                 <div className="mt-4 text-2xl font-bold">201K</div>
//                 <div className="text-gray-500 text-sm">Updated</div>

//                 {/* Bar chart for global volume */}
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={globalVolumeData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="volume" fill="#3498db" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* CPC Section */}
//               <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold">CPC</h2>
//                 <div className="mt-4 text-2xl font-bold">$3.26</div>
//                 <div className="text-gray-500 text-sm">Competition: 0.16</div>

//                 {/* Bar chart for CPC */}
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={data}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="CPC" fill="#3498db" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Global Volume Section */}
//               <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold">Global Volume</h2>
//                 <div className="mt-4 text-2xl font-bold">995.1K</div>
//                 <div className="text-gray-500 text-sm">Updated</div>
//               </div>
//             </div>
//           </div>

//         </Container>
//       </section>


//     </React.Fragment>
//   );
// };

// export default Home;
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { ArrowLeft, PlusSquare, Calendar, Database } from 'lucide-react';

const Home = () => {
  const searchData = [
    { month: 'Jan', volume: 150 },
    { month: 'Feb', volume: 180 },
    { month: 'Mar', volume: 200 },
    { month: 'Apr', volume: 250 },
    { month: 'May', volume: 220 },
    { month: 'Jun', volume: 300 }
  ];

  const countryData = [
    { country: 'US', volume: '201K', percentage: '20%' },
    { country: 'IN', volume: '110K', percentage: '11%' },
    { country: 'JP', volume: '49.5K', percentage: '5%' },
    { country: 'UK', volume: '40.5K', percentage: '4%' },
    { country: 'FR', volume: '33.1K', percentage: '3%' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Overview</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <select className="border p-2 rounded-lg">
              <option>October 2024</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <PlusSquare className="w-5 h-5" />
            <span>ADD TO</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Difficulty Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">DIFFICULTY</h2>
            <span className="text-green-500 text-sm">Updated</span>
          </div>
          <div className="w-32 h-32 mx-auto">
            <CircularProgressbar
              value={67}
              text={67}
              styles={buildStyles({
                pathColor: '#f97316',
                textColor: '#000',
                trailColor: '#e5e7eb'
              })}
            />
          </div>
          <p className="text-center mt-4 text-sm text-gray-600">
            NOT EASY
          </p>
        </div>

        {/* Search Volume Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">SEARCH VOLUME</h2>
            <span className="text-green-500 text-sm">Updated</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={searchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="volume" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CPC Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">CPC</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">COMPETITION:</span>
              <span className="font-semibold">0.16</span>
            </div>
          </div>
          <div className="text-2xl font-bold mb-4">$3.26</div>
          {/* Competition bars */}
          <div className="space-y-2">
            {['US', 'HK', 'AU', 'SG', 'NZ'].map((country) => (
              <div key={country} className="flex items-center space-x-2">
                <span className="w-8">{country}</span>
                <div className="flex-1 h-2 bg-blue-500 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Volume Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">GLOBAL VOLUME</h2>
          </div>
          <div className="text-2xl font-bold mb-4">995.1K</div>
          <div className="space-y-3">
            {countryData.map((item) => (
              <div key={item.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-8">{item.country}</span>
                  <div className="w-24 h-2 bg-blue-500 rounded"></div>
                </div>
                <div className="flex space-x-4">
                  <span>{item.volume}</span>
                  <span className="text-gray-500">{item.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;