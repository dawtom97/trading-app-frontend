import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { time: '9:00', price: 100 },
  { time: '10:00', price: 105 },
  { time: '11:00', price: 102 },
  { time: '12:00', price: 108 },
  { time: '13:00', price: 104 },
  { time: '14:00', price: 110 },
];

export default function TradingChartCard() {
  return (
    <div className="h-[300px] w-full rounded-md bg-white p-4">
      <div className="text-sm text-gray-500 mb-2 text-center">Trading Chart</div>
      <div className="">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
