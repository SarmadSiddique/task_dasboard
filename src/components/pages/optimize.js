import React from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Check, Info } from 'lucide-react'

const difficultyData = [
    { name: 'Difficulty', value: 67 },
    { name: 'Remaining', value: 33 },
]

const searchVolumeData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 120 },
    { name: 'Mar', value: 110 },
    { name: 'Apr', value: 130 },
    { name: 'May', value: 140 },
    { name: 'Jun', value: 130 },
    { name: 'Jul', value: 1200 },
    { name: 'Aug', value: 150 },
    { name: 'Sep', value: 160 },
    { name: 'Oct', value: 170 },
    { name: 'Nov', value: 180 },
    { name: 'Dec', value: 190 },
]

const cpcData = [
    { country: 'CH', value: 2.1 },
    { country: 'IE', value: 2.2 },
    { country: 'CA', value: 2.3 },
    { country: 'UK', value: 2.4 },
    { country: 'NZ', value: 2.5 },
    { country: 'SG', value: 2.6 },
    { country: 'AU', value: 4.8 },
    { country: 'HK', value: 5.0 },
    { country: 'US', value: 3.26 },
]

const globalVolumeData = [
    { country: 'DE', volume: 33.1, percentage: '3%' },
    { country: 'FR', volume: 33.1, percentage: '3%' },
    // { country: 'UK', volume: 40.5, percentage: '4%' },
    { country: 'JP', volume: 49.5, percentage: '5%' },
    { country: 'IN', volume: 110, percentage: '11%' },
    { country: 'US', volume: 201, percentage: '20%' },
]

export default function Optimize() {
    return (
        <div className="grid grid-cols-4 gap-4 px-3 py-3 bg-gray-100">
            <div className="bg-white px-3 py-3 rounded-lg shadow">
                <div className="flex justify-between items-baseline mb-4">
                    <h2 className="text-sm font-semibold text-black uppercase">Difficulty</h2>
                    <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">Updated</span>
                    </div>
                </div>
                <div className="relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={difficultyData}
                                cx="50%"
                                cy="50%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={0}
                                dataKey="value"
                            >
                                <Cell fill="#FFA500" />
                                <Cell fill="#E5E7EB" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold">67</div>
                        <div className="text-xs text-gray-500">OUT OF 100</div>
                    </div>
                    <div className="absolute bottom-8 text-center w-full">
                        <span className="text-sm font-semibold">NOT EASY</span>
                    </div>
                </div>
                <div className="text-xs text-gray-500 mt-4 text-center">
                    You will need a lot of high-quality referring domains and well-optimized content to rank high for this keyword.
                </div>
            </div>
            <div>
                <div className="bg-white px-3 py-3 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-[11px] font-semibold text-black uppercase">Search Volume</h2>
                        <div className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-500">Updated</span>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="text-lg font-bold">201K</div>
                        {/* <div className="ml-2 px-3 py-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                            Updated
                        </div> */}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">1200k</div>
                    <ResponsiveContainer width="100%" height={100}>
                        <BarChart data={searchVolumeData} barSize={8}>
                            <Bar dataKey="value" fill="#3B82F6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis hide />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Jan 2024</span>
                        <span>Jul 2024</span>
                    </div>

                </div>
                <div className="bg-white p-2 rounded-lg shadow py-4 mt-4 px-4">
                    <div className="flex gap-2 mb-2">
                        <h2 className=" font-semibold text-black text-[11px] uppercase">Search Intent</h2>
                        <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="inline-block  px-3 py-1 bg-blue-100 text-blue-800 text-[11px] font-semibold rounded">
                        INFORMATIONAL
                    </div>
                </div>
            </div>
            <div className="bg-white px-3 py-3 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-semibold text-black uppercase">CPC</h2>
                    <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex justify-between items-baseline">
                    <div className="text-lg font-bold mb-2">$3.26</div>
                    <div className="text-xs text-gray-500 mb-2">COMPETITION: <span className="font-semibold">0.16</span> <Info className="w-3 h-3 text-gray-400 inline" /></div>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={cpcData} layout="vertical">
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="country" type="category" tick={{ fontSize: 12 }} />
                        <Bar dataKey="value" fill="#3B82F6">
                            {cpcData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.country === "CH" ? "#F97316" : "#3B82F6"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white px-3 py-3 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-semibold text-black uppercase">Global Volume</h2>
                    <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-lg font-bold mb-2">995.1K</div>
                <div className="space-y-2">
                    {globalVolumeData.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <img src={`https://flagcdn.com/w20/${item.country.toLowerCase()}.png`} alt={item.country} className="mr-2" />
                            <span className="text-sm font-semibold w-8">{item.country}</span>
                            <div className="flex-grow">
                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-400"
                                        style={{ width: item.percentage }}
                                    ></div>
                                </div>
                            </div>
                            <span className="text-sm font-semibold ml-2">{item.volume}K</span>
                            <span className="text-xs text-gray-500 ml-2 w-8">{item.percentage}</span>
                        </div>
                    ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-right">1 - 6 of 8</div>
            </div>

        </div>
    )
}