import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage, clearAllAgriMitraData } from '../hooks/useLocalStorage.js';
import { uid } from '../utils/format.js';
import { getTranslation } from '../utils/translations.js';

const AppDataContext = createContext(null);

const EMPTY_PROFILE = {
  name: '',
  village: '',
  district: '',
  state: '',
  farmArea: '',
  areaUnit: 'acres',
  mainCropId: '',
  language: 'English',
};

export function AppDataProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('agrimitra:profile', EMPTY_PROFILE);
  const [language, setLanguageState] = useLocalStorage('agrimitra:language', 'en'); // 'en' | 'te' | 'hi'
  const [easyMode, setEasyModeState] = useLocalStorage('agrimitra:easyMode', false); // Farmer Friendly Easy Mode
  const [selectedCropId, setSelectedCropId] = useLocalStorage('agrimitra:selectedCropId', '');
  const [growthStage, setGrowthStage] = useLocalStorage('agrimitra:growthStage', '');
  const [tasks, setTasks] = useLocalStorage('agrimitra:tasks', []);
  const [calculations, setCalculations] = useLocalStorage('agrimitra:calculations', []);
  const [soilRecords, setSoilRecords] = useLocalStorage('agrimitra:soil', []);
  const [irrigationRecords, setIrrigationRecords] = useLocalStorage('agrimitra:irrigation', []);
  const [savedSchemes, setSavedSchemes] = useLocalStorage('agrimitra:savedSchemes', []);
  const [schemeChecks, setSchemeChecks] = useLocalStorage('agrimitra:schemeChecks', {});
  const [activity, setActivity] = useLocalStorage('agrimitra:activity', []);
  const [cropJourney, setCropJourney] = useLocalStorage('agrimitra:cropJourney', {
    cropId: 'rice',
    plantingDate: '',
    plotName: '',
    variety: '',
    completedStages: [],
    farmerCurrentStageId: null,
    stageObservations: {},
    actualHarvestDate: '',
    actualYield: '',
  });
  const [photoJournal, setPhotoJournal] = useLocalStorage('agrimitra:photoJournal', []);
  const [heroMotion, setHeroMotion] = useLocalStorage('agrimitra:heroMotion', true);
  const [district, setDistrict] = useLocalStorage('agrimitra:district', 'Hyderabad');


  const logActivity = useCallback((message, type = 'info') => {
    setActivity((prev) => [{ id: uid('act'), message, type, at: new Date().toISOString() }, ...prev].slice(0, 40));
  }, [setActivity]);

  const addPhotoJournalEntry = useCallback((entry) => {
    setPhotoJournal((prev) => [entry, ...prev].slice(0, 30));
    logActivity(`Added photo observation for ${entry.cropName || 'crop'}`);
  }, [setPhotoJournal, logActivity]);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    setProfile((prev) => ({
      ...prev,
      language: lang === 'te' ? 'Telugu' : lang === 'hi' ? 'Hindi' : 'English',
    }));
    logActivity(`Changed language to ${lang.toUpperCase()}`);
  }, [setLanguageState, setProfile, logActivity]);

  const setEasyMode = useCallback((val) => {
    setEasyModeState(val);
    logActivity(val ? 'Turned ON Farmer Easy Mode' : 'Switched to Standard Mode');
  }, [setEasyModeState, logActivity]);

  const t = useCallback(
    (path, fallback) => getTranslation(language, path, fallback),
    [language]
  );

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      language,
      setLanguage,
      easyMode,
      setEasyMode,
      t,
      selectedCropId,
      setSelectedCropId,
      growthStage,
      setGrowthStage,
      tasks,
      setTasks,
      calculations,
      setCalculations,
      soilRecords,
      setSoilRecords,
      irrigationRecords,
      setIrrigationRecords,
      savedSchemes,
      setSavedSchemes,
      schemeChecks,
      setSchemeChecks,
      activity,
      logActivity,
      cropJourney,
      setCropJourney,
      photoJournal,
      setPhotoJournal,
      addPhotoJournalEntry,
      heroMotion,
      setHeroMotion,
      district,
      setDistrict,
      clearAll: () => {
        clearAllAgriMitraData();
        window.location.reload();
      },
      exportRecords: () => ({
        exportedAt: new Date().toISOString(),
        schemaVersion: 2,
        note: 'AgriMitra browser records only. Not official. Do NOT share with anyone who should not have access to your farm data.',
        profile,
        language,
        easyMode,
        selectedCropId,
        growthStage,
        cropJourney,
        photoJournal,
        tasks,
        calculations,
        soilRecords,
        irrigationRecords,
        savedSchemes,
        schemeChecks,
        activity,
      }),
      importRecords: (json) => {
        try {
          if (!json || typeof json !== 'object') {
            return { ok: false, error: 'Invalid JSON file: file is not a JSON object.' };
          }
          // Must have at least one known field
          const hasData =
            json.profile ||
            json.tasks ||
            json.calculations ||
            json.soilRecords ||
            json.cropJourney ||
            json.photoJournal;
          if (!hasData) {
            return { ok: false, error: 'File does not contain recognizable AgriMitra farm data.' };
          }
          // Restore each field if present in the JSON
          if (json.profile && typeof json.profile === 'object') setProfile(json.profile);
          if (json.selectedCropId !== undefined) setSelectedCropId(json.selectedCropId);
          if (json.growthStage !== undefined) setGrowthStage(json.growthStage);
          if (json.cropJourney && typeof json.cropJourney === 'object') setCropJourney(json.cropJourney);
          if (Array.isArray(json.photoJournal)) setPhotoJournal(json.photoJournal);
          if (Array.isArray(json.tasks)) setTasks(json.tasks);
          if (Array.isArray(json.calculations)) setCalculations(json.calculations);
          if (Array.isArray(json.soilRecords)) setSoilRecords(json.soilRecords);
          if (Array.isArray(json.irrigationRecords)) setIrrigationRecords(json.irrigationRecords);
          if (Array.isArray(json.savedSchemes)) setSavedSchemes(json.savedSchemes);
          if (json.schemeChecks && typeof json.schemeChecks === 'object') setSchemeChecks(json.schemeChecks);
          if (Array.isArray(json.activity)) setActivity(json.activity);
          return { ok: true, version: json.schemaVersion || 1 };
        } catch (err) {
          return { ok: false, error: String(err) };
        }
      },
    }),
    [
      profile,
      setProfile,
      language,
      setLanguage,
      easyMode,
      setEasyMode,
      t,
      selectedCropId,
      setSelectedCropId,
      growthStage,
      setGrowthStage,
      cropJourney,
      setCropJourney,
      photoJournal,
      setPhotoJournal,
      addPhotoJournalEntry,
      tasks,
      setTasks,
      calculations,
      setCalculations,
      soilRecords,
      setSoilRecords,
      irrigationRecords,
      setIrrigationRecords,
      savedSchemes,
      setSavedSchemes,
      schemeChecks,
      setSchemeChecks,
      activity,
      logActivity,
      heroMotion,
      setHeroMotion,
      district,
      setDistrict,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used inside AppDataProvider');
  return ctx;
}
