export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  // Inject the forensic tracking script from public folder
  if (!document.getElementById('zo-forensic-analytics')) {
    const script = document.createElement('script');
    script.id = 'zo-forensic-analytics';
    script.src = '/analytics/client-tracking.js';
    script.async = true;
    document.head.appendChild(script);
  }
};

export const trackEvent = (eventName: string, properties: any = {}) => {
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.track(eventName, properties);
  }
};
