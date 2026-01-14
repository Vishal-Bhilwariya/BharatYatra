import React from "react";
import { useParams } from "react-router-dom";

const ExploreCulture = () => {
  const { stateSlug } = useParams();
  console.log("ExploreCulture Rendered", stateSlug);
  return (
    <div className="p-20 bg-white min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">DEBUG MODE: HELLO WORLD</h1>
      <p>If you see this, the Page Component is mounting correctly.</p>
      <p>Slug: {stateSlug}</p>
    </div>
  );
};

export default ExploreCulture;
