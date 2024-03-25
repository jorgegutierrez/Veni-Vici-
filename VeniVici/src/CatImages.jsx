import React, { useState } from 'react';

function CatImages() {
  const [catData, setCatData] = useState(null);
  const [banList, setBanList] = useState([]);
  const [previousImages, setPreviousImages] = useState([]);

  // Aquí configura tu API key
  const apiKey = "live_LyG4A1iRmGv72U7RxHDLze3VXy10ZXcqOVnWfiOl0zvSrPHQPRSXoFfVLvTs7Pwd";

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1&api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const imageData = data[0];

      const attributesResponse = await fetch(`https://api.thecatapi.com/v1/images/${imageData.id}?api_key=${apiKey}`);
      if (!attributesResponse.ok) {
        throw new Error('Network response for attributes was not ok');
      }
      const attributesData = await attributesResponse.json();

      setCatData({ ...imageData, ...attributesData });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addToBanList = (attribute) => {
    setBanList(prevList => [...prevList, attribute]);
  };

  const moveImageToPrevious = () => {
    if (catData) {
      setPreviousImages(prevImages => [catData, ...prevImages.slice(0, 9)]);
      setCatData(null); // Clear cat data after moving to previous images
    }
  };

  return (
    <div className="container">
      <div className="panel left-panel">
        <h2>Previous Images</h2>
        {previousImages.map((image, index) => (
          <div key={index} className="previous-cat">
            <img src={image.url} alt={`Cat ${index + 1}`} className="small-cat-image" />
            <p>Breed: {image.breeds[0]?.name}</p>
            <p>Origin: {image.breeds[0]?.origin}</p>
          </div>
        ))}
      </div>
      <div className="panel center-panel">
        <h2>Cat Image</h2>
        <button onClick={fetchRandomImage}>Get Random Image</button>
        {catData && (
          <div>
            <img src={catData.url} alt="Cat" className="cat-image" />
            <div className="attributes">
              <p>Breed: {catData.breeds[0]?.name}</p>
              <p>Origin: {catData.breeds[0]?.origin}</p>
            </div>
            <button onClick={moveImageToPrevious}>Move to Previous</button>
          </div>
        )}
      </div>
      <div className="panel right-panel">
        <h2>Ban List</h2>
        <ul>
          {banList.map((attribute, index) => (
            <li key={index}>{attribute}</li>
          ))}
        </ul>
        <div>
          <h3>Add to Ban List:</h3>
          <button onClick={() => addToBanList(catData?.id)}>ID</button>
          <button onClick={() => addToBanList(catData?.width)}>Width</button>
          <button onClick={() => addToBanList(catData?.height)}>Height</button>
          {catData?.breeds && (
            <div>
              <button onClick={() => addToBanList(catData.breeds[0]?.name)}>Breed</button>
              <button onClick={() => addToBanList(catData.breeds[0]?.weight.metric)}>Weight</button>
              <button onClick={() => addToBanList(catData.breeds[0]?.origin)}>Origin</button>
              <button onClick={() => addToBanList(catData.breeds[0]?.life_span)}>Life Span</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatImages;
