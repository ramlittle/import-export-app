import { useState } from 'react'
import DataList from './dataList.json'
const ArrowDisplay = () => {
  const dataList = DataList;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, dataList.length - 1));
  };

  const data = dataList[currentIndex];
  return (
    <>
      <div className='text-center'>
        <h2 className="text-4xl">{data.name}</h2>
        <h3 className="text-2xl">{data.position}</h3>
        <h3 className="text-2xl">{data.employeeType}</h3>
      </div>
      <hr/>
      <div className='flex justify-center'>
        <div>
          <table className='text-center w-full'>
            <thead>
              <tr>
                <th className='ring-2'>DATE</th>
                <th className='ring-2'>ARRIVE 1</th>
                <th className='ring-2'>DEPART 1</th>
                <th className='ring-2'>ARRIVE 2</th>
                <th className='ring-2'>DEPART 2</th>
              </tr>
            </thead>
            <tbody>
              {data.timeLog.map((logEntry, index) => (
                <tr key={index}>
                  <td className='ring-2'>{logEntry.date}</td>
                  <td className='ring-2'>{logEntry.arrive1}</td>
                  <td className='ring-2'>{logEntry.depart1}</td>
                  <td className='ring-2'>{logEntry.arrive2}</td>
                  <td className='ring-2'>{logEntry.depart2}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        <div className="flex flex-col">
          <h2>OTHER DEDUCTIONS</h2>
          <span>EMPLOYEE NUMBER: {data.employeeNumber}</span>
          <span>BASIC SALARY: {data.basicSalary}</span>
          <span>EARNED: {data.earned}</span>
          <span>COMMUNICATION ALLOWANCE: {data.communicationAllowance}</span>
          <span>LESS DEDUCTIONS</span>
          {
            data.lessDeductions.map((less,index)=>
              <ul key={index} className='m-5'>
                <li>UNDERTIME: {less.undertime}</li>
                <li>ABSENCES: {less.absences}</li>
                <li>EWT: {less.ewt}</li>
                <li>TOTAL: {less.total}</li>
              </ul>
            )
          }
        </div>

      </div>


      {/* NAVIGATION */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          &larr; Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === dataList.length - 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
}
export default ArrowDisplay;