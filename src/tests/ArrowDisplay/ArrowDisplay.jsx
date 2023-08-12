import {useState} from 'react'
const ArrowDisplay=({data})=>{
    const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, data.length - 1));
  };

  return (
    <div className="array-display">
     
      <div className="item">
        {data[currentIndex].name} - {data[currentIndex].description}
      </div>
      <button onClick={handlePrevClick} disabled={currentIndex === 0}>
        &larr; Previous
      </button>
      <button onClick={handleNextClick} disabled={currentIndex === data.length - 1}>
        Next &rarr;
      </button>
    </div>
  );
};


export default ArrowDisplay;