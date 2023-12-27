import { useState } from "react";
import Rating from "./components/Rating";

import { RatingProps } from "@/types/rating";

function App() {
    const [rating, setRating] = useState<RatingProps[]>([
        {
            label: "Performance",
            rating: Math.floor(Math.random() * 9 + 1),
        },
        {
            label: "Quality",
            rating: Math.floor(Math.random() * 9 + 1),
        },
    ]);

    return (
        <main className="min-h-[100dvh] w-full bg-[#F8F4ED] grid place-items-center">
            <div className="px-12 max-w-max w-full bg-[#FBF9F6] py-6 rounded-lg flex justify-center">
                {rating && rating.length > 1 && (
                    <>
                        <div className="flex flex-col -py-1 items-start rounded-md">
                            {(rating ?? []).map((r, i) => (
                                <Rating key={i} {...r} />
                            ))}
                        </div>
                        <div className="rounded-md flex items-center justify-center bg-[#E0E6D9] border-[#627F55] border-[3px] text-3xl text-[#627F55]  w-20">
                            {(rating ?? []).reduce(
                                (acc, curr) => acc + curr.rating,
                                0
                            ) / (rating ?? []).length}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default App;
