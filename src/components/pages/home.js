import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "react-feather";
import ReactFlagsSelect from "react-flags-select";
import { BsChevronDown } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { currencies } from "../common/globalData";
import { search } from "../icons/icon";
import Optimize from "./optimize";
const Home = () => {
  // states--------------
  const [isMainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setSubDropdownOpen] = useState(false);
  const toggleMainDropdown = () => setMainDropdownOpen(!isMainDropdownOpen);
  const [keyword, setKeyword] = useState("seo");
  const [suggestions] = useState(["seo in guk dramas", "seo in guk drama", "seo in guk", "seo"]);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currency, setCurrency] = useState("USD");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  // functions------------
  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    console.log("Selected keyword:", suggestion);
  };
  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    console.log("Selected country code:", countryCode);
  };

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="flex justify-between items-center gap-3 flex-wrap py-5 px-3">
          <div className="mt-4">
            <div className="flex gap-2 flex-wrap items-center">
              <div className="flex items-center gap-2 w-fit space-x-1 px-2 border b-1 border-gray-400 rounded ">
                <div className="relative md:w-[450px] xss:w-auto">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter a keyword"
                    style={{ borderRight: '1px solid #d4d4d4' }}
                    className="w-full px-3 bg-transparent py-0   rounded-tl rounded-bl outline-none focus:outline-none focus:border-none custom_ focus:ring-2 focus:shadow-none"
                  />
                  <div className="absolute top-full left-0 w-full bg-white  mt-1  z-10">
                    {/* {keyword && (
                  <div className="py-2 text-gray-700 text-xs font-semibold px-3">RECENT SEARCHES</div>
                )} */}
                    {!keyword && (
                      suggestions
                        .filter((s) => s.toLowerCase().includes(keyword.toLowerCase()))
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1 flex items-center cursor-pointer hover:bg-gray-100"
                          >
                            <FaSearch className="mr-2" />
                            {suggestion}
                          </div>
                        ))

                    )
                    }
                  </div>
                </div>

                <div className="relative w-fit flex items-center">
                  <img
                    src={search}
                    alt="Google"
                    className="absolute left-0 border-0 top-1/2 transform -translate-y-1/2 z-20 w-4 h-4"
                  />
                  <ReactFlagsSelect
                    selected={selectedCountry}
                    onSelect={handleCountryChange}
                    searchable
                    selectedSize={16}
                    optionsSize={14}
                    style={{
                      borderLeft: 'none',
                    }}
                    showSelectedLabel={false}
                    className="react-flags-select custom-flags-select border-0 rounded ml-2 mt-1" // Using Tailwind CSS margin-left class
                  />

                </div>

              </div>
              <div className="flex space-x-2 items-center ">
                <button className="flex items-center justify-center bg-[#d4d4d4] text-white font-medium px-4 py-3 rounded shadow-sm">
                  <FaSearch style={{ color: "#a9a9a9" }} size={14} />
                </button>
                <div className="relative inline-block">
                  <button
                    onClick={toggleMainDropdown}
                    className="flex items-center justify-center border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 px-2 rounded shadow-sm space-x-2"
                  >
                    <MdAdd size={20} className="text-green-500" />
                    <span className="text-[13px] text-black font-bold">ADD TO</span>
                    <ChevronDown size={18} />
                  </button>

                  {isMainDropdownOpen && (
                    <div
                      className="absolute mt-2 w-48 bg-white border rounded shadow-lg z-10"
                      onMouseEnter={() => setSubDropdownOpen(true)}
                      onMouseLeave={() => setSubDropdownOpen(false)}
                    >
                      <div className="py-2">
                        <div
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onMouseEnter={() => setSubDropdownOpen(true)}
                          onMouseLeave={() => setSubDropdownOpen(false)}
                        >
                          Option 1
                          <ChevronDown size={14} className="ml-2 inline-block" />
                        </div>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Option 2</button>
                      </div>

                      {isSubDropdownOpen && (
                        <div
                          className="absolute left-full top-0 mt-0 ml-1 w-48 bg-white border rounded shadow-lg z-20"
                          onMouseEnter={() => setSubDropdownOpen(true)}
                          onMouseLeave={() => setSubDropdownOpen(false)}
                        >
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Sub Option 1</button>
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Sub Option 2</button>
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Sub Option 3</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <div className="relative">
              <label className="block text-sm  text-[#6b6d82] font-bold">Data for:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className=" rounded px-3 py-1 mt-1 w-40 bg-gray-50 custom_border text-gray-700 "
              />
            </div>
            <button className="bg-gray-50 hover:bg-gray-300 text-black custom_border  font-bold text-[12px] py-2 px-4 rounded md:mt-6 xss:mt-0 ">
              BULK KEYWORD ANALYSIS
            </button>

            <div className="relative">
              <label className="block text-sm font-bold text-[#6b6d82] ">Currency:</label>
              <div
                className="flex items-center max-w-[110px]  rounded px-3 py-1 mt-1 w-40 custom_border text-gray-700 bg-gray-50  cursor-pointer"
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              >
                {currencies.find((cur) => cur.value === currency)?.label}
                <BsChevronDown className="ml-auto text-gray-500" />
              </div>
              {isCurrencyOpen && (
                <div className="absolute z-10 mt-1 max-w-[100px] bg-white border rounded  max-h-40 overflow-y-auto">
                  {currencies.map((cur) => (
                    <div
                      key={cur.value}
                      onClick={() => {
                        setCurrency(cur.value);
                        setIsCurrencyOpen(false);
                      }}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${currency === cur.value ? "bg-gray-100 font-medium" : ""
                        }`}
                    >
                      {cur.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <Optimize />
      </div>
    </>
  );
};

export default Home;
