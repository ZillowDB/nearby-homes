import React from 'react';
import HomeDetail from './HomeDetail';

const addCommas = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const Home = ({ 
  home, handleContentClick, isOddLen, isLastCell,
}) => {
  const homeValue = addCommas(home.homevalue);
  const sqft = addCommas(home.sqft);

  return (
    <div
      className="home-main-container"
      style={{
        backgroundImage: `url(${home.homeimage})`,
      }}
    >
      <div className="home-inner-container">
        <div className="home-contents">
          <HomeDetail
            home={home}
            handleContentClick={handleContentClick}
            isLastCell={isLastCell}
            isOddLen={isOddLen}
            homeValue={homeValue}
            sqft={sqft}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
