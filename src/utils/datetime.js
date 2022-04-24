
export const extractTimeFromIso = (iso) => {
  const dateObj = new Date('2018-01-01T18:00:00Z');
  return dateObj.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false});
};