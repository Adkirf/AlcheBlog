import React, { useState, useEffect } from 'react';

import Link from 'next/link';

const Header = () => {

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">AlcheBlog</span>
          </Link>
        </div>
        <div className="flex flex-row-reverse mt-4 md:float-left md:contents">
          <Link key="articles" href="/articles">
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">Articles</span>
          </Link>
          <Link key="challenges" href="/challenges">
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">Challenges</span>
          </Link>
          <Link key="about" href="/about">
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">About</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;