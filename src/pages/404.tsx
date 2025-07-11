import React from 'react';

interface Props {}

const Custom404: React.FC<Props> = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center">
          <h1 className="text-7xl font-bold text-primary">
            404
          </h1>
          <h2 className="text-2xl">
            Page Not Found
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Custom404;