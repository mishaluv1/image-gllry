import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);

  // Fetch images from API
  useEffect(() => {
    axios
      .get('https://picsum.photos/v2/list?page=1&limit=500') // Fetching the first 20 images
      .then((response) => {
        setImages(response.data);
        setFilteredImages(response.data); // Initially show all images
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  // Filter images based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = images.filter((image) =>
        image.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredImages(filtered);
    } else {
      setFilteredImages(images);
    }
  }, [searchQuery, images]);

  return (
    <div className="App">
      <header>
        <input
          type="text"
          placeholder="Search by author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>
      
      <main>
        <div className="gallery">
          {filteredImages.map((image) => (
            <div key={image.id} className="image-card">
              <img
                src={`https://picsum.photos/id/${image.id}/400/400`}
                alt={image.author}
                className="image"
              />
              <div className="author">{image.author}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
