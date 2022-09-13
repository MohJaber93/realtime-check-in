import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline'

const SeatNumber = (props) => {
  const { assignedSeat } = props;

  return (
    <div className="">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckIcon className="h-12 w-12 text-green-600" aria-hidden="true" />
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Please proceed to your assigned seat.
        </h3>
        <div className="mt-2">
          <p className="text-3xl text-green-500">
            Seat #{assignedSeat}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeatNumber;
