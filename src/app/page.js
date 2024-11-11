// src/app/page.js
"use client";

import { useState } from 'react';

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const searchFlights = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `/api/flights?from=${searchParams.from}&to=${searchParams.to}&date=${searchParams.date}`
      );
      const data = await res.json();
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4"> Booking</h1>

      <form onSubmit={searchFlights} className="mb-6">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="from"
            placeholder="From"
            value={searchParams.from}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            value={searchParams.to}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="date"
            value={searchParams.date}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </form>

      <div className="flight-results">
        {flights.length > 0 ? (
          <ul className="space-y-4">
            {flights.map((flight) => (
              <li key={flight.id} className="p-4 border border-gray-200 rounded">
                <h3 className="font-semibold text-lg">
                  {flight.from} → {flight.to}
                </h3>
                <p>Date: {flight.date}</p>
                <p>Time: {flight.time}</p>
                <p>Price: ${flight.price}</p>
                <button className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Book Now
                </button>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No flights found for the selected route and date.</p>
        )}
      </div>
    </div>
  );
}
