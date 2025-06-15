import React from 'react';
import * as Slider from '@radix-ui/react-slider';

function RangeSlider({ min, max, value, onChange }) {
  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      value={value}
      min={min}
      max={max}
      step={1}
      onValueChange={onChange}
    >
      <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
        <Slider.Range className="absolute bg-pink-500 rounded-full h-full" />
      </Slider.Track>
      {value.map((_, i) => (
        <Slider.Thumb
          key={i}
          className="block w-5 h-5 bg-white border-2 border-pink-500 rounded-full hover:border-pink-600 
                   focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
                   transition-colors"
          aria-label={i === 0 ? "Minimum price" : "Maximum price"}
        />
      ))}
    </Slider.Root>
  );
}

export default RangeSlider;