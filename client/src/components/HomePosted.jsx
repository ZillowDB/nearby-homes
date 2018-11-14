import React from 'react';

const getPostedDateFromNow = (dateOfPosting) => {
  const currTime = Date.now();
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const dateArr = dateOfPosting.split(/[-: ]/);
  const dateFormat = new Date(
    dateArr[0],
    dateArr[1] - 1,
    dateArr[2],
    dateArr[3],
    dateArr[4],
    dateArr[5],
  );
  return Math.floor((currTime - dateFormat) / MS_PER_DAY);
};

const HomePosted = ({ home }) => {
  return home.status === 'OFF MARKET' ? (
    <li className="photo-count">1 photo</li>
  ) : (
    <div className="home-posted-date">
      {getPostedDateFromNow(home.dateOfPosting)}
      days on Zillow
    </div>
  );
};

export default HomePosted;
