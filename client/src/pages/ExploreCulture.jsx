import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { Calendar, Music, Users, BookOpen, Image as ImageIcon, Video } from "lucide-react";

const ExploreCulture = () => {
  const { stateSlug } = useParams();
  const [culture, setCulture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("festivals");

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        if (stateSlug) {
          const res = await api.get(`/cultures/state/${stateSlug}`);
          setCulture(res.data.data);
        } else {
          // Fetch all cultures
          const res = await api.get("/cultures");
          setCulture(res.data.data);
        }
      } catch (error) {
        console.error("Error loading culture", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCulture();
  }, [stateSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading culture information...</p>
      </div>
    );
  }

  if (!culture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">
          Culture information not available for this state.
        </p>
      </div>
    );
  }

  const hinduCulture = culture.hinduCulture || {};
  const generalCulture = culture.generalCulture || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
            🕉️ Explore Culture
          </h1>
          <p className="text-lg text-gray-700">
            Discover the rich cultural heritage and traditions
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: "festivals", label: "Festivals", icon: Calendar },
            { id: "traditions", label: "Traditions", icon: Users },
            { id: "rituals", label: "Rituals", icon: BookOpen },
            { id: "lifestyle", label: "Lifestyle", icon: Users },
            { id: "history", label: "Cultural History", icon: BookOpen },
            { id: "general", label: "General Culture", icon: Music },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              <tab.icon className="inline mr-2" size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Festivals Tab */}
          {activeTab === "festivals" && (
            <div>
              <h2 className="text-3xl font-bold text-orange-900 mb-6">
                🎉 Festivals
              </h2>
              {hinduCulture.festivals && hinduCulture.festivals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hinduCulture.festivals.map((festival, index) => (
                    <div
                      key={index}
                      className="border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-2xl font-semibold text-orange-800 mb-3">
                        {festival.name}
                      </h3>
                      <p className="text-gray-700 mb-3">{festival.description}</p>
                      {festival.significance && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Significance:</strong> {festival.significance}
                        </p>
                      )}
                      {festival.celebrationPeriod && (
                        <p className="text-sm text-orange-600 mb-4">
                          <Calendar className="inline mr-1" size={16} />
                          {festival.celebrationPeriod}
                        </p>
                      )}
                      {festival.images && festival.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {festival.images.slice(0, 4).map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`${festival.name} ${idx + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                      {festival.videos && festival.videos.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {festival.videos.map((video, idx) => (
                            <a
                              key={idx}
                              href={video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-600 hover:text-orange-800 text-sm flex items-center"
                            >
                              <Video className="mr-1" size={16} />
                              Watch Video {idx + 1}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Festival information coming soon...</p>
              )}
            </div>
          )}

          {/* Traditions Tab */}
          {activeTab === "traditions" && (
            <div>
              <h2 className="text-3xl font-bold text-orange-900 mb-6">
                🙏 Traditions
              </h2>
              {hinduCulture.traditions && hinduCulture.traditions.length > 0 ? (
                <div className="space-y-6">
                  {hinduCulture.traditions.map((tradition, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 rounded-r-lg"
                    >
                      <h3 className="text-xl font-semibold text-orange-800 mb-2">
                        {tradition.name}
                      </h3>
                      <p className="text-gray-700 mb-2">{tradition.description}</p>
                      {tradition.practice && (
                        <p className="text-sm text-gray-600">
                          <strong>Practice:</strong> {tradition.practice}
                        </p>
                      )}
                      {tradition.images && tradition.images.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {tradition.images.slice(0, 3).map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`${tradition.name} ${idx + 1}`}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Tradition information coming soon...</p>
              )}
            </div>
          )}

          {/* Rituals Tab */}
          {activeTab === "rituals" && (
            <div>
              <h2 className="text-3xl font-bold text-orange-900 mb-6">
                🕯️ Rituals
              </h2>
              {hinduCulture.rituals && hinduCulture.rituals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hinduCulture.rituals.map((ritual, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200"
                    >
                      <h3 className="text-xl font-semibold text-orange-800 mb-3">
                        {ritual.name}
                      </h3>
                      <p className="text-gray-700 mb-3">{ritual.description}</p>
                      {ritual.whenPerformed && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>When:</strong> {ritual.whenPerformed}
                        </p>
                      )}
                      {ritual.importance && (
                        <p className="text-sm text-gray-600">
                          <strong>Importance:</strong> {ritual.importance}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Ritual information coming soon...</p>
              )}
            </div>
          )}

          {/* Lifestyle Tab */}
          {activeTab === "lifestyle" && hinduCulture.lifestyle && (
            <div>
              <h2 className="text-3xl font-bold text-orange-900 mb-6">
                🏠 Lifestyle
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  {hinduCulture.lifestyle.description}
                </p>
                {hinduCulture.lifestyle.dailyPractices &&
                  hinduCulture.lifestyle.dailyPractices.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">
                        Daily Practices:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {hinduCulture.lifestyle.dailyPractices.map((practice, idx) => (
                          <li key={idx}>{practice}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                {hinduCulture.lifestyle.familyStructure && (
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Family Structure:
                    </h4>
                    <p className="text-gray-700">
                      {hinduCulture.lifestyle.familyStructure}
                    </p>
                  </div>
                )}
                {hinduCulture.lifestyle.socialCustoms &&
                  hinduCulture.lifestyle.socialCustoms.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">
                        Social Customs:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {hinduCulture.lifestyle.socialCustoms.map((custom, idx) => (
                          <li key={idx}>{custom}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Cultural History Tab */}
          {activeTab === "history" && hinduCulture.culturalHistory && (
            <div>
              <h2 className="text-3xl font-bold text-orange-900 mb-6">
                📜 Cultural History
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700">
                  {hinduCulture.culturalHistory.description}
                </p>
                {hinduCulture.culturalHistory.historicalEvents &&
                  hinduCulture.culturalHistory.historicalEvents.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-4 text-xl">
                        Historical Events:
                      </h4>
                      <div className="space-y-4">
                        {hinduCulture.culturalHistory.historicalEvents.map(
                          (event, idx) => (
                            <div
                              key={idx}
                              className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-orange-800">
                                  {event.event}
                                </span>
                                {event.year && (
                                  <span className="text-sm text-gray-600">
                                    ({event.year})
                                  </span>
                                )}
                              </div>
                              {event.significance && (
                                <p className="text-gray-700 text-sm">
                                  {event.significance}
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                {hinduCulture.culturalHistory.ancientPractices &&
                  hinduCulture.culturalHistory.ancientPractices.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">
                        Ancient Practices:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {hinduCulture.culturalHistory.ancientPractices.map(
                          (practice, idx) => (
                            <li key={idx}>{practice}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* General Culture Tab */}
          {activeTab === "general" && (
            <div>
              <h2 className="text-3xl font-bold text-orange-900 mb-6">
                🎨 General Culture
              </h2>
              <div className="space-y-6">
                {generalCulture.languages &&
                  generalCulture.languages.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2 text-xl">
                        Languages:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {generalCulture.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {generalCulture.artForms &&
                  generalCulture.artForms.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-4 text-xl">
                        Art Forms:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generalCulture.artForms.map((art, idx) => (
                          <div
                            key={idx}
                            className="border border-orange-200 rounded-lg p-4"
                          >
                            <h5 className="font-semibold text-orange-800 mb-2">
                              {art.name}
                            </h5>
                            <p className="text-gray-700 text-sm">{art.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {generalCulture.music && (
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2 text-xl">
                      Music:
                    </h4>
                    <p className="text-gray-700 mb-2">
                      {generalCulture.music.description}
                    </p>
                    {generalCulture.music.instruments &&
                      generalCulture.music.instruments.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {generalCulture.music.instruments.map((instrument, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                            >
                              {instrument}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                )}

                {generalCulture.dance && (
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2 text-xl">
                      Dance:
                    </h4>
                    <p className="text-gray-700">{generalCulture.dance.description}</p>
                  </div>
                )}

                {generalCulture.cuisine && (
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2 text-xl">
                      Cuisine:
                    </h4>
                    <p className="text-gray-700 mb-2">
                      {generalCulture.cuisine.description}
                    </p>
                    {generalCulture.cuisine.specialties &&
                      generalCulture.cuisine.specialties.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {generalCulture.cuisine.specialties.map((specialty, idx) => (
                            <li key={idx}>{specialty}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        {stateSlug && (
          <div className="mt-8 text-center">
            <Link
              to={`/state/${stateSlug}`}
              className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              ← Back to State
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCulture;

