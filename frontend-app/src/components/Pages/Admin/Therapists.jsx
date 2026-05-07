import { useState, useEffect } from 'react';
import AddTherapistModal from './AddTherapistModal';
import TherapistProfileModal from './TherapistProfileModal';
import { fetchTherapistProfiles, mapTherapistProfileToDirectory } from '../../../api/neureaApi.js';

function Therapists() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTherapistProfiles();
        const arr = Array.isArray(data) ? data : data?.data ?? [];
        if (!cancelled) {
          setTherapists(arr.map((p, i) => mapTherapistProfileToDirectory(p, i)));
        }
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load therapists');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div id="view-therapists" className="view-section animate-fade-in flex flex-col h-full relative">
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col">
          <h3 className="text-[24px] font-extrabold text-neurea-textDark">Therapist Management</h3>
          <p className="text-[13px] text-gray-500">
            Onboard new clinical staff and manage active therapist accounts.
          </p>
          {error && <p className="text-[13px] text-red-600 mt-2">{error}</p>}
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#5C2D91] hover:bg-purple-800 text-white text-[13px] font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors"
        >
          <i className="ph-bold ph-plus"></i> Add New Therapist
        </button>
      </div>

      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-[16px] font-bold text-neurea-textDark">Active Therapists Directory</h3>
        </div>

        <div className="p-6 flex flex-col gap-3">
          {loading && <p className="text-[14px] text-gray-500">Loading therapists…</p>}
          {!loading && therapists.length === 0 && (
            <p className="text-[14px] text-gray-500">No therapist profiles returned from the API.</p>
          )}
          {!loading &&
            therapists.map((t) => (
              <div
                key={t.key}
                className="border border-gray-100 rounded-[16px] p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {t.profileImage ? (
                    <img
                      src={t.profileImage}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg border border-blue-100">
                      {String(t.userId ?? '?').slice(0, 2)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-neurea-textDark">
                      Therapist profile #{t.id ?? t.key}
                    </span>
                    <span className="text-[12px] font-medium text-gray-500">{t.subtitle}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="text-[12px] font-bold text-gray-600 hover:text-[#5C2D91] px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm transition-colors"
                  >
                    View Profile
                  </button>
                  <button className="text-[12px] font-bold text-red-500 hover:text-red-700 px-4 py-2 border border-red-100 rounded-lg bg-red-50">
                    Suspend
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isAddModalOpen && <AddTherapistModal onClose={() => setIsAddModalOpen(false)} />}
      {isProfileModalOpen && (
        <TherapistProfileModal onClose={() => setIsProfileModalOpen(false)} />
      )}
    </div>
  );
}

export default Therapists;
