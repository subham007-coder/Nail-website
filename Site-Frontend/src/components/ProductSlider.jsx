import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = [
	{
		id: 1,
		name: 'Classic French Press On Nails',
		price: 699,
		salePrice: 299,
		images: {
			default:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
			hover:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
		},
	},
	{
		id: 2,
		name: 'Elegant Almond Press On Nails',
		price: 799,
		salePrice: 349,
		images: {
			default:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
			hover:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
		},
	},
	{
		id: 3,
		name: 'Glamorous Glitter Press On Nails',
		price: 899,
		salePrice: 399,
		images: {
			default:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
			hover:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
		},
	},
	{
		id: 4,
		name: 'Matte Black Press On Nails',
		price: 799,
		salePrice: 349,
		images: {
			default:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
			hover:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
		},
	},
	{
		id: 5,
		name: 'French Tip Press On Nails',
		price: 699,
		salePrice: 299,
		images: {
			default:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
			hover:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
		},
	},
	{
		id: 6,
		name: 'Ombre Press On Nails',
		price: 799,
		salePrice: 349,
		images: {
			default:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
			hover:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
		},
	},
	{
		id: 7,
		name: 'Floral Design Press On Nails',
		price: 899,
		salePrice: 399,
		images: {
			default:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
			hover:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
		},
	},
	{
		id: 8,
		name: 'Geometric Pattern Press On Nails',
		price: 799,
		salePrice: 349,
		images: {
			default:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
			hover:
				'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
		},
	},
];

function ProductSlider() {
	const [hoveredProducts, setHoveredProducts] = useState(new Set());

	const handleMouseEnter = (productId) => {
		setHoveredProducts((prev) => new Set([...prev, productId]));
	};

	const handleMouseLeave = (productId) => {
		setHoveredProducts((prev) => {
			const newSet = new Set([...prev]);
			newSet.delete(productId);
			return newSet;
		});
	};

	return (
		<div className="container mx-auto px-4 py-4 sm:py-6"> {/* Reduced padding on mobile */}
			<h2 className="text-xl md:text-3xl font-bold mb-4 sm:mb-8" data-animation="fade-up">
				French Press on Nails
			</h2>

			<div data-animation="fade-in">
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					navigation={{
						prevEl: '.swiper-button-prev-custom',
						nextEl: '.swiper-button-next-custom',
					}}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					breakpoints={{
						320: { 
							slidesPerView: 2.2,  // Show more slides on mobile
							spaceBetween: 8      // Reduced spacing on mobile
						},
						480: { 
							slidesPerView: 2.5, 
							spaceBetween: 12 
						},
						768: { 
							slidesPerView: 3, 
							spaceBetween: 20 
						},
						1024: { 
							slidesPerView: 4, 
							spaceBetween: 30 
						},
					}}
					grabCursor={true}
					className="product-slider bg-[#F5E6DA] rounded-lg p-3 sm:p-4" // Added padding to slider
				>
					{products.map((product) => (
						<SwiperSlide key={product.id} className="pb-8 sm:pb-12" data-stagger>
							<div
								className="group relative"
								onMouseEnter={() => handleMouseEnter(product.id)}
								onMouseLeave={() => handleMouseLeave(product.id)}
								data-card
							>
								<div className="relative aspect-[3/4] sm:aspect-[3/4] overflow-hidden rounded-lg">
									<img
										src={
											hoveredProducts.has(product.id)
												? product.images.hover
												: product.images.default
										}
										alt={product.name}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>

									{/* Action buttons - Hidden on mobile */}
									<div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transform translate-x-4 
										transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:flex">
										<button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-colors">
											<FiHeart className="w-5 h-5" />
										</button>
										<button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-colors">
											<FiEye className="w-5 h-5" />
										</button>
										<button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-colors">
											<FiShoppingCart className="w-5 h-5" />
										</button>
									</div>
								</div>

								<div className="mt-2 sm:mt-4 text-center">
									<h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1 sm:line-clamp-2">
										{product.name}
									</h3>
									<div className="mt-1 sm:mt-2 flex items-center justify-center gap-2">
										<span className="text-sm sm:text-base text-pink-600">₹{product.salePrice}</span>
										<span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.price}</span>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default ProductSlider;