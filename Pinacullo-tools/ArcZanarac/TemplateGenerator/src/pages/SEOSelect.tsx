import React from 'react';

const SeoOptions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Escolha como deseja realizar a auditoria de SEO
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-all duration-300"
          onClick={() => console.log('Code')}
        >
          Code
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition-all duration-300"
          onClick={() => console.log('Files')}
        >
          Files
        </button>