
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const PostCarousel = ({responsive, posts}) => {
  
  return (
    <div className="mb-4">
      <Carousel infinite responsive={responsive} itemClass="px-4 w-full">
        {posts.map((post, index) => (
          <FeaturedPostCard key={index} post={post} rank={post.postExtras.rank}/>
        ))}
      </Carousel>
    </div>
  );
};

export default PostCarousel;