/**
 * @param {string} key
 * @param {*} fallback
 * @returns {*}
 */
export function loadFromStorage(key, fallback) {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return fallback;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`[PrepTrack] Error loading key "${key}" from localStorage:`, error);
    return fallback;
  }
}

/**
 * @param {string} key
 * @param {*} value
 */
export function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[PrepTrack] Error saving key "${key}" to localStorage:`, error);
  }
}
