"use client";

import { getCarImageUrl } from "@/utils/car-helpers";
import { useState } from "react";

interface CarImagesViewerProps {
  make: string;
  modelName: string;
}

export function CarImagesViewer({ make, modelName }: CarImagesViewerProps) {
  const angles = ["01", "09", "13", "27"];
  const [selectedAngle, setSelectedAngle] = useState(angles[0]);

  const heroImage = getCarImageUrl(make, modelName, selectedAngle);
  const thumbnails = angles.map((angle) => ({
    angle,
    url: getCarImageUrl(make, modelName, angle),
  }));

  return (
    <div>
      {/* Hero Image */}
      <div className="relative bg-gradient-to-br from-[#5CAFFC] to-[#3563E9] rounded-xl p-6 sm:p-8 text-white overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
        <img
          src={heroImage}
          alt={`${make} ${modelName}`}
          className="w-full h-auto object-contain max-h-[250px]"
        />
      </div>

      {/* Thumbnail Previews */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {thumbnails.map((thumb, idx) => (
          <button
            key={thumb.angle}
            onClick={() => setSelectedAngle(thumb.angle)}
            className={`rounded-lg p-2 transition-all ${
              selectedAngle === thumb.angle
                ? "ring-2 ring-[#3563E9] bg-white"
                : "bg-white hover:ring-2 hover:ring-gray-300"
            }`}
          >
            <img
              src={thumb.url}
              alt={`${make} ${modelName} view ${idx + 1}`}
              className="w-full h-24 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
