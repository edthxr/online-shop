import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-transparent text-black/80 pb-[100px] py-10 border-t  mt-[50px] border-gray-300">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; 2024 Dreamdev. All rights reserved.</p>
        
        <div className="flex flex-col items-center space-y-4">
          <p>Follow us on social media:</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500">Facebook</a>
            <a href="#" className="hover:text-blue-500">Twitter</a>
            <a href="#" className="hover:text-blue-500">Instagram</a>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="max-w-md mx-auto">
            We are a team of passionate developers committed to building high-quality software solutions for our clients.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
