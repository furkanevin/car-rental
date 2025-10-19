import { Star, ChevronDown } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  date: string;
  rating: number;
  comment: string;
  avatar?: string;
}

interface CarReviewsProps {
  totalReviews: number;
  reviews?: Review[];
}

// Static reviews for demo
const mockReviews: Review[] = [
  {
    id: "1",
    name: "Alex Stanton",
    role: "CEO at Bukalapak",
    date: "21 July 2022",
    rating: 4,
    comment:
      "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    avatar: "AS",
  },
  {
    id: "2",
    name: "Skylar Dias",
    role: "CEO at Amazon",
    date: "20 July 2022",
    rating: 4,
    comment:
      "We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    avatar: "SD",
  },
];

export function CarReviews({
  totalReviews,
  reviews = mockReviews,
}: CarReviewsProps) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
        <span className="bg-[#3563E9] text-white text-xs font-bold px-3 py-1 rounded">
          {totalReviews}
        </span>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                {review.avatar || review.name.charAt(0)}
              </div>
            </div>

            {/* Review Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{review.date}</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-[#FBAD39] fill-[#FBAD39]"
                            : "text-gray-300 fill-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="mt-6 text-center">
        <button className="text-gray-500 hover:text-gray-700 text-sm font-semibold flex items-center justify-center gap-2 mx-auto">
          Show All
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
