import React from 'react';
import Bounce from 'react-activity/lib/Bounce';
import 'react-activity/lib/Bounce/Bounce.css';

const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Bounce color="rgba(7, 73, 180, 0.445)" size={24} speed={1.5} animating />
    </div>
  );
};

export default Loading;
