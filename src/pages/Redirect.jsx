import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { logEvent } from '../middleware/logger';

const Redirect = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    const createdUrls = logs.filter(l => l.event === "URL_CREATED");

    const target = createdUrls.find(item => item.data.shortcode === shortcode);
    if (target) {
      logEvent("URL_CLICKED", {
        shortUrl: target.data.shortUrl,
        source: window.location.href
      });
      window.location.href = target.data.longUrl;
    } else {
      alert("Invalid or expired link");
    }
  }, [shortcode]);

  return null;
};

export default Redirect;
