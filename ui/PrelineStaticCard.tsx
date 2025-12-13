import React from 'react';

export const PrelineStaticCard: React.FC = () => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-slate-800 dark:border-gray-700">
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                Featured
            </p>
        </div>
        <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Preline Card Title
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
                With supporting text below as a natural lead-in to additional content.
            </p>
            <div className="mt-3">
                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    Go somewhere
                </button>
            </div>
        </div>
    </div>
  );
};
