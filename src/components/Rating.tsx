import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { Triangle } from "lucide-react";

import type { RatingProps } from "@/types/rating";

type Color = {
    r: number;
    g: number;
    b: number;
};

const startColor: Color = {
    r: 224,
    g: 226,
    b: 220,
};

const endColor: Color = {
    r: 93,
    g: 121,
    b: 82,
};
const calculateDiff = (max: number, start: Color, end: Color): Color => {
    const diff: Color = {
        r: Math.floor((end.r - start.r) / max),
        g: Math.floor((end.g - start.g) / max),
        b: Math.floor((end.b - start.b) / max),
    };

    return diff as Color;
};

const Rating = ({ label, max, rating, start, end }: RatingProps) => {
    const max_default = 9;
    start = start ?? startColor;
    end = end ?? endColor;

    if (max && rating > max) rating = max;
    max = max ?? max_default;

    const diff = calculateDiff(max, start, end);
    return (
        <div className="flex items-center justify-center space-x-2 w-full">
            <label className="text-lg max-w-32 w-full overflow-x-clip truncate text-[#84847E]">
                {label}
            </label>
            <div className="flex items-center justify-center space-x-1 px-6 rounded-md">
                {[...new Array<number>(max ?? max_default)].map((_, i) => {
                    i += 1;
                    return (
                        <>
                            <label
                                key={i}
                                className="flex items-center relative"
                            >
                                {i === rating && (
                                    <Triangle
                                        className="stroke-none h-2 w-2 absolute top-1 left-1/2 transform -translate-x-1/2 rotate-180"
                                        style={{
                                            fill: `rgb(${
                                                start!.r + diff.r * i
                                            }, ${start!.g + diff.g * i}, ${
                                                start!.b + diff.b * i
                                            })`,
                                        }}
                                    />
                                )}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <button
                                                style={{
                                                    backgroundColor:
                                                        i <= rating
                                                            ? `rgb(${
                                                                  start!.r +
                                                                  diff.r * i
                                                              }, ${
                                                                  start!.g +
                                                                  diff.g * i
                                                              }, ${
                                                                  start!.b +
                                                                  diff.b * i
                                                              })`
                                                            : "",
                                                }}
                                                className={
                                                    "h-[5px] rounded-full w-8 border"
                                                }
                                            ></button>
                                        </TooltipTrigger>
                                        {i === rating && (
                                            <TooltipContent>
                                                {i <=
                                                Math.floor(
                                                    (max ?? max_default) / 2
                                                )
                                                    ? `Average ${label}`
                                                    : `Good ${label}`}
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </TooltipProvider>
                            </label>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Rating;
