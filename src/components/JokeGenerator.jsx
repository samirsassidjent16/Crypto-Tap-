import { useState } from 'react';

export default function JokeGenerator() {
  const [joke, setJoke] = useState('');
  const [punchline, setPunchline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jokeType, setJokeType] = useState('general');

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    setJoke('');
    setPunchline('');

    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Failed to fetch joke');
      
      const data = await response.json();
      setJoke(data.setup);
      setPunchline(data.punchline);
    } catch (err) {
      setError('Could not fetch a joke. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchJokeByType = async (type) => {
    setLoading(true);
    setError('');
    setJoke('');
    setPunchline('');
    setJokeType(type);

    try {
      const response = await fetch(`https://official-joke-api.appspot.com/jokes/${type}/random`);
      if (!response.ok) throw new Error('Failed to fetch joke');
      
      const data = await response.json();
      setJoke(data.setup);
      setPunchline(data.punchline);
    } catch (err) {
      setError('Could not fetch a joke of this type. Please try another.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
              😂 Joke Generator
            </h1>
            <p className="text-gray-600">Get random jokes to brighten your day!</p>
          </div>

          {/* Joke Display */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6 min-h-[200px] flex flex-col justify-center">
            {loading && (
              <div className="text-center">
                <div className="inline-block animate-spin">⏳</div>
                <p className="text-gray-600 mt-2">Loading joke...</p>
              </div>
            )}

            {error && (
              <div className="text-red-600 text-center">
                <p className="text-lg">⚠️ {error}</p>
              </div>
            )}

            {!loading && joke && (
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-4">{joke}</p>
                <p className="text-2xl font-bold text-purple-600">{punchline}</p>
              </div>
            )}

            {!loading && !joke && !error && (
              <p className="text-gray-500 text-center italic">
                Click a button below to generate a joke!
              </p>
            )}
          </div>

          {/* Joke Type Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => fetchJokeByType('general')}
              disabled={loading}
              className="py-3 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold transition transform hover:scale-105 active:scale-95"
            >
              General
            </button>
            <button
              onClick={() => fetchJokeByType('knock-knock')}
              disabled={loading}
              className="py-3 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold transition transform hover:scale-105 active:scale-95"
            >
              Knock Knock
            </button>
            <button
              onClick={() => fetchJokeByType('programming')}
              disabled={loading}
              className="py-3 px-4 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold transition transform hover:scale-105 active:scale-95"
            >
              Programming
            </button>
            <button
              onClick={() => fetchJoke()}
              disabled={loading}
              className="py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold transition transform hover:scale-105 active:scale-95"
            >
              Random
            </button>
          </div>

          {/* Main Button */}
          <button
            onClick={() => fetchJoke()}
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold text-lg shadow-lg transition transform hover:scale-105 active:scale-95"
          >
            {loading ? '⏳ Loading...' : '🎭 Get New Joke'}
          </button>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Powered by Official Joke API
          </p>
        </div>
      </div>
    </div>
  );
}