import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';
import { generateShortCode, calculateExpiry } from '../utils/helpers';
import { logEvent } from '../middleware/logger';

const URLForm = ({ onShorten }) => {
  const [urls, setUrls] = useState([
    { longUrl: '', shortcode: '', validity: '' }
  ]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAddField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', shortcode: '', validity: '' }]);
    }
  };

  const handleSubmit = () => {
    const newEntries = urls.map((u) => {
      if (!u.longUrl) {
        setError('Long URL is required for all fields');
        return null;
      }
      const shortCode = u.shortcode || generateShortCode();
      const expiry = calculateExpiry(parseInt(u.validity) || 30);
      const shortUrl = `http://localhost:3000/redirect/${shortCode}`;

      const newItem = {
        ...u,
        shortcode: shortCode,
        shortUrl,
        expiry,
        created: new Date(),
        clicks: []
      };

      logEvent('URL_CREATED', newItem);
      return newItem;
    }).filter(Boolean);

    onShorten(newEntries);
  };

  return (
    <Card sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: 6 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <LinkIcon sx={{ mr: 1 }} />
          Shorten up to 5 URLs
        </Typography>

        {urls.map((url, idx) => (
          <Grid container spacing={2} alignItems="center" key={idx} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Long URL"
                fullWidth
                value={url.longUrl}
                onChange={(e) => handleChange(idx, 'longUrl', e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Validity (min)"
                fullWidth
                type="number"
                value={url.validity}
                onChange={(e) => handleChange(idx, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={url.shortcode}
                onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        ))}

        {error && (
          <Typography color="error" variant="body2" mb={2}>
            {error}
          </Typography>
        )}

        <Box display="flex" gap={2} mt={3}>
          <Tooltip title="Add more URL">
            <IconButton
              color="primary"
              onClick={handleAddField}
              disabled={urls.length >= 5}
              size="large"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ borderRadius: 2, px: 4 }}
          >
            Generate Short Links
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default URLForm;
