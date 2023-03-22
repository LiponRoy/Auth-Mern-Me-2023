import React from 'react';

const Hero = () => {
	return (
		<div>
			<section class={heroContainer}>
				<div class={gridLayout}>
					<div class={leftSide}>
						<p class='text-4xl font-bold md:text-7xl '>50% OFF</p>
						<p class='text-4xl font-shantell font-bold md:text-7xl text-secondary'>SUMMER SALE</p>
						<p class='mt-2 text-sm md:text-lg'>Hi,For limited time only!</p>
						<button class=' myBtn m-5'>Shop Now</button>
					</div>
					<div class={rightSide}>
						<img class='h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]' src='men.jpg' alt='' />
					</div>
				</div>
			</section>
		</div>
	);
};

const heroContainer = ' px-3 py-5 bg-neutral-100 lg:py-10 mt-[70px]';
const gridLayout = 'grid lg:grid-cols-2 items-center justify-items-center gap-5';
const leftSide = 'order-2 lg:order-1 flex flex-col justify-center items-center gap-2';
const rightSide = 'order-1 lg:order-2';

export default Hero;
