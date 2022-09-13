import React, { useState } from 'react';

const QRCode = () => {
  return (
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/736px-QR_Code_Example.svg.png?20111025115625"
        alt="qrcode"
      />
      <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mt-12">
        Please scan the QR code to your check in.
      </h3>
    </div>
  );
};

export default QRCode;
