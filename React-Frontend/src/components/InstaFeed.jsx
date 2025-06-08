import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation' // Adjust the import based on your project structure

const instaPosts = [
  {
    id: 1,
    image: 'https://instagram.frdp1-2.fna.fbcdn.net/v/t39.30808-6/487465777_3683060831994372_3854345039809880092_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjIwNDh4MjA0OC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.frdp1-2.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QFzhl7lz13nKicAkBE9o3cLrfV5K0rWU7f9-9GHYK5tz9VFypejCPRuuaSgdJeI-RGeuWXqvdU338htjCJJfLxY&_nc_ohc=wftVxSn5uXUQ7kNvwFGUfSt&_nc_gid=ZgbV3YFZkBfpvBY4IkgBFw&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzM4NTYzODIyNTYwMjQ2MDY4OQ%3D%3D.3-ccb7-5&oh=00_AfP-x1xup4gKVpsrgMUFy7R0OFFv726zPDkNRKm4UCTZZA&oe=684A47DB&_nc_sid=22de04',
    likes: '2.5k',
    comments: '120'
  },
  {
    id: 2,
    image: 'https://instagram.frdp1-1.fna.fbcdn.net/v/t39.30808-6/487542100_3683058548661267_4382298203322625029_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjIwNDh4MjA0OC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.frdp1-1.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2QFzhl7lz13nKicAkBE9o3cLrfV5K0rWU7f9-9GHYK5tz9VFypejCPRuuaSgdJeI-RGeuWXqvdU338htjCJJfLxY&_nc_ohc=aFrq8s60nnwQ7kNvwHKHNJd&_nc_gid=ZgbV3YFZkBfpvBY4IkgBFw&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzM4NDk3OTgzMDkzNDgyMDcyOA%3D%3D.3-ccb7-5&oh=00_AfMh05IROAezvWaX7wqrYffZixGwPOWHZO6kwfQkO2MNlg&oe=684A47B1&_nc_sid=22de04',
    likes: '1.8k',
    comments: '95'
  },
  {
    id: 3,
    image: 'https://instagram.frdp1-2.fna.fbcdn.net/v/t39.30808-6/487216323_3683060898661032_3656249422138190880_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjIwNDh4MjA0OC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.frdp1-2.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QFzhl7lz13nKicAkBE9o3cLrfV5K0rWU7f9-9GHYK5tz9VFypejCPRuuaSgdJeI-RGeuWXqvdU338htjCJJfLxY&_nc_ohc=Aqy1QK_vYccQ7kNvwH2b7Xq&_nc_gid=ZgbV3YFZkBfpvBY4IkgBFw&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzM4NTY3NDc2OTQ1NzYyNTA2Nw%3D%3D.3-ccb7-5&oh=00_AfO5tUwk5d3phDlZYm98nk_cOE7R2QfHSCwzALIPgrbv1g&oe=684A352B&_nc_sid=22de04',
    likes: '3.2k',
    comments: '150'
  },
  {
    id: 4,
    image: 'https://instagram.frdp1-2.fna.fbcdn.net/v/t39.30808-6/487336920_3683059471994508_2528253594399920159_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjIwNDh4MjA0OC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.frdp1-2.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QFzhl7lz13nKicAkBE9o3cLrfV5K0rWU7f9-9GHYK5tz9VFypejCPRuuaSgdJeI-RGeuWXqvdU338htjCJJfLxY&_nc_ohc=38883jITK8UQ7kNvwGd2Qrv&_nc_gid=ZgbV3YFZkBfpvBY4IkgBFw&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzM4NTI2MjQ0NzM4Nzk5NzQ3NQ%3D%3D.3-ccb7-5&oh=00_AfPViJZn-PvN1qGFh5tl2JmBcYMShbVIBpfyA0gxPX_ENA&oe=684A34CE&_nc_sid=22de04',
    likes: '2.1k',
    comments: '88'
  },
  {
    id: 5,
    image: 'https://instagram.frdp1-1.fna.fbcdn.net/v/t39.30808-6/487283816_3683060841994371_3887750978170659448_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjIwNDh4MjA0OC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.frdp1-1.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2QFzhl7lz13nKicAkBE9o3cLrfV5K0rWU7f9-9GHYK5tz9VFypejCPRuuaSgdJeI-RGeuWXqvdU338htjCJJfLxY&_nc_ohc=Qd39l5YDG58Q7kNvwHRy4ZY&_nc_gid=ZgbV3YFZkBfpvBY4IkgBFw&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzM4NTc3OTI4MjE4ODU4MzYzOQ%3D%3D.3-ccb7-5&oh=00_AfPGhdhNYSGiCy0WfmqNwz7fRMNTXZ9uswuO0ZDeG57nBg&oe=684A323E&_nc_sid=22de04',
    likes: '4.5k',
    comments: '200'
  }
];

function InstaFeed() {
  useScrollAnimation();

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12" data-animation="fade-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiInstagram className="w-6 h-6 text-pink-600" />
            <span className="text-lg font-medium">@nailz_by_angana</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Follow Us on Instagram</h2>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" 
          data-animation="stagger">
          {instaPosts.map((post) => (
            <div key={post.id} data-stagger>
              <div 
                key={post.id} 
                className="group relative aspect-square overflow-hidden rounded-xl"
                data-card // Add this attribute
              >
                <img
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-600/80 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
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
          <a 
            href="https://instagram.com/nailknack" 
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