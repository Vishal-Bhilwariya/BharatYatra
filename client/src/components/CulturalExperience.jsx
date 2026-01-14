import React from 'react';

const CulturalExperience = ({ culture }) => {
    console.log("CulturalExperience Rendered", culture);

    if (!culture || !culture.culturalExperience) {
        console.log("No culture data or culturalExperience found");
        return <div className="p-4 text-red-500">No Cultural Data Available</div>;
    }

    return (
        <div className="p-8 bg-white rounded-xl shadow-md border border-gray-200 my-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Experience the Culture (Safe Mode)</h2>
            <p className="mb-4 text-gray-600">If you can see this, the creating component is working!</p>

            <div className="grid gap-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-bold">Live Events: {culture.culturalExperience.liveEvents?.length || 0}</h3>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-bold">Food Trails: {culture.culturalExperience.foodTrails?.length || 0}</h3>
                </div>
            </div>
        </div>
    );
};

export default CulturalExperience;
