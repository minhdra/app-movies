export function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    hours: result.substr(0, 2),
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}

export function srt2wtt(url) {
  return `https://srt-to-vtt.vercel.app/?url=${encodeURIComponent(url)}`;
}

export function isMobile() {
  const regex = /iPhone|iPad|iPop|Android/;
  return regex.test(window.navigator.userAgent);
}

export const formatResultSearch = (list) => {
  return list.map((item) => item.replace(/\(|<em>|<\/em>|\)|#/g, '').trim());
};

export const getQueryParams = () => {
  const queryParams = new URLSearchParams(new URL(window.location.href).search);
  return queryParams;
}

