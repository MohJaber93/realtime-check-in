import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import QRCode from './QRCode';
import SeatNumber from './SeatNumber';
import logo from './logo.svg';
import './App.css';

const pubnub = new PubNub({
  subscribeKey: 'sub-c-e4c88844-c913-43a4-b564-d9dcc8777223',
  publishKey: 'pub-c-b5a58de5-32b1-427b-be9b-e05cc3f2df64',
  userId: 'realtime-check-in',
});

const STATES = ['waiting', 'checkingin', 'checkedin'];

function App() {
  const [status, setStatus] = useState(STATES[0]);
  const [assignedSeat, setAssignedSeat] = useState();

  useEffect(() => {
    // TODO: api call to get checkin enabled flag
    // if enabled, setStatus to STATES[1]

    setTimeout(
      () => setStatus(STATES[1]),
      10000,
    );

    // TODO: check order id from params
    // if already checked in, get seat number
    // setStatus(STATES[2]);
    // setAssignedSeat('');
  }, []);

  useEffect(() => {
    const listener = {
      status: (statusEvent) => {
        if (statusEvent.category === "PNConnectedCategory") {
          console.log("Connected");
        }
      },
      message: (messageEvent) => {
        const { orderId, seatNumber } = messageEvent.message;

        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);
        const paramsOrderId = parameters.get('orderId');

        if (orderId === paramsOrderId) {
          setStatus(STATES[2]);
          setAssignedSeat(seatNumber);
        }
      },
    };

    pubnub.addListener(listener);

    pubnub.subscribe({
      channels: ["checkins422"]
    });
  }, []);

  const publishMessage = async (message) => {
    const publishPayload = {
      channel : "checkins422",
      message: {
        orderId: '1',
        seatNumber: 'A3',
      },
    };

    pubnub.publish(publishPayload);
  };

  return (
    <div className="flex flex-col items-center border-2 rounded-3xl max-w-sm p-8 m-auto">
      <img
        className="inline-block h-24 w-24 rounded-full mb-10"
        src="/logo.jpg"
        alt=""
      />
      <div className="flex flex-col m-auto">
        {
          status === STATES[0] && (
            <>
              <p>Your QR Code will be available soon.</p>
              <p>Please check back 1 hour before the event.</p>
            </>
          )
        }
        {
          status === STATES[1] && (
            <QRCode />
          )
        }
        {
          status === STATES[2] && (
            <SeatNumber assignedSeat={assignedSeat} />
          )
        }
      </div>
      {
        status !== STATES[0] && (
          <button
            className="absolute bottom-5 right-5 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={publishMessage}
          >
            SIMULATE CHECK IN (REMOVE ME LATER)
          </button>
        )
      }
    </div>
  );
}

export default App;
