import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditEntry from './EntryDetails.jsx';
import Info from '../assets/info.jsx';

const statusColors = {
  'admin-approved': 'bg-green-400',
  pending: 'bg-yellow-400',
  default: 'bg-red-400', // Use a default for any other status
};

export default function Entry({ entryDetails }) {
  const colorClass = statusColors[entryDetails.status] || statusColors.default;
  return (
    <div
      className={`border-white border-2 m-4 p-4 rounded-lg ${colorClass} text-black`}
    >
      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-col flex-grow">
          <div className="text-[10px] sm:text-[15px] md:text-[20px] mb-2">
            <strong>Title:</strong> {entryDetails.title}
          </div>
          <div className="md:flex md:gap-6 text-[10px] sm:text-[15px] md:text-[20px] ">
            {/* 2. Used optional chaining on 'section' for safety */}
            <div>
              <strong>Section:</strong> {entryDetails.section?.name}
            </div>
            <div>
              <strong>Type:</strong> {entryDetails.type?.name}
            </div>
          </div>
        </div>

        <Link
          className="w-1/3 sm:w-1/5 md:w-1/6 lg:w-1/8 rounded-full flex flex-row-reverse"
          to={`/admin/dashboard/submissions/${entryDetails._id}`}
        >
          {Info}
        </Link>
      </div>
    </div>
  );
}
