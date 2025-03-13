import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import CustomLegend from './CustomLegend';

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


const Chart = ({capacityData,colorData}:any) => {
 

  

 
  return (
    
    <div className="grid grid-cols-2 gap-0 mt-6">
    <div>
    <h2 className="text-xl font-semibold mb-2">Product Distribution by Color</h2>
      {colorData.length ? <><ResponsiveContainer width={400} height={200}>
          <BarChart data={colorData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top"
              layout="horizontal" />
            <Bar dataKey="value" fill="#87CEEB" name="Number of Products" />
          </BarChart>
        </ResponsiveContainer></>: <p className="text-red-600">No product distribution by color data found</p> }
      
    </div>
    <div>
    <h2 className="text-lg font-semibold">Product Distribution by Capacity</h2>
      {capacityData.length ? <><PieChart width={300} height={200}>
          <Legend content={<CustomLegend payload={undefined} />} layout="horizontal"
            verticalAlign="top" />
          <Pie data={capacityData} dataKey="value" cx="50%" cy="50%" outerRadius={60}>
            {capacityData.map((_entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>

        </PieChart></> :<h1 className="text-red-600">No product distribution capacity data found</h1>}
      
    </div>
  </div>
  )
}

export default Chart