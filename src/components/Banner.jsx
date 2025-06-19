import React from 'react';

const Banner = () => {
  const stats = [
    {
      id: 1,
      number: '25+',
      text: 'Properties Available'
    },
    {
      id: 2,
      number: '350+',
      text: 'Bookings Completed'
    },
    {
      id: 3,
      number: '600+',
      text: 'Happy Customers'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="px-8 py-8 flex gap-8 items-center justify-evenly flex-wrap rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.1),0_-4px_20px_0_rgba(0,0,0,0.05)]">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center flex-1 min-w-[180px]">
            <h4 className="text-3xl font-semibold text-gray-900">
              {stat.number}
            </h4>
            <p className="text-gray-600">
              {stat.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;