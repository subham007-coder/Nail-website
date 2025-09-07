import React, { useEffect, useState } from "react";
import { FiInstagram } from "react-icons/fi";
import { apiRequest } from "../utils/api";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function InstaFeed() {
  const [instaPosts, setInstaPosts] = useState([]);
  useScrollAnimation();

  useEffect(() => {
    apiRequest("/insta-posts/")
      .then(data => {
        if (data.length > 0) {
          setInstaPosts(data);
        } else {
          // Fallback data if no posts in database
          setInstaPosts([
            {
              _id: 'fallback-1',
              image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
              likes: '125',
              comments: '23'
            },
            {
              _id: 'fallback-2', 
              image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
              likes: '89',
              comments: '12'
            },
            {
              _id: 'fallback-3',
              image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
              likes: '156',
              comments: '34'
            },
            {
              _id: 'fallback-4',
              image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
              likes: '203',
              comments: '45'
            },
            {
              _id: 'fallback-5',
              image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
              likes: '178',
              comments: '28'
            }
          ]);
        }
      })
      .catch(err => {
        console.error('Instagram posts fetch error:', err);
        // Fallback data on error
        setInstaPosts([
          {
            _id: 'fallback-1',
            image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            likes: '125',
            comments: '23'
          }
        ]);
      });
  }, []);

  return (
    <div className="py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12" data-animation="fade-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiInstagram className="w-6 h-6 text-pink-600" />
            <span className="text-lg font-medium">@nailz_by_angana</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Follow Us on Instagram
          </h2>
        </div>

        {/* Instagram Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          data-animation="stagger"
        >
          {instaPosts.map((post) => (
            <div key={post._id} data-stagger>
              <div
                className="group relative aspect-square overflow-hidden rounded-xl"
                data-card
              >
                <img
                  src={post.image}
                  alt={`Instagram post`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-pink-600/80 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-8" data-animation="fade-up">
          {/* <a
            href="https://www.instagram.com/nailz_by_angana?igsh=ZnAxNnk2OTQzeGpl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 
              text-white px-8 py-3 rounded-full font-medium hover:from-pink-600 hover:to-purple-600 
              transition-all duration-300 transform hover:scale-105"
          > */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 
              text-white px-8 py-3 rounded-full font-medium hover:from-pink-600 hover:to-purple-600 
              transition-all duration-300 transform hover:scale-105"
          >
            <FiInstagram className="w-5 h-5" />
            Follow Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default InstaFeed;
