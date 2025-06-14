import { BoltIcon, CloudAlert } from "lucide-react";
import React from "react";

const RateLimitCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 p-10 bg-yellow-alert border-[#f5e6a6] rounded-2xl shadow-lg">
      <div>
        <span className="bg-yellow-500 block rounded-full p-3">
          <CloudAlert size={50} strokeWidth={2} className="text-white" />
        </span>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Rate Limit Reached!
        </h2>
        <p className="text-gray-800 mb-2">
          You've made too many requests in a short period. Please wait a moment.
        </p>
        <p className="text-gray-500 text-sm">
          Try again in a few seconds for the best experience.
        </p>
      </div>
    </div>
  );
};

export default RateLimitCard;
