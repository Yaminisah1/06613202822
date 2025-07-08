import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Chip
} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';

const Stats = () => {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const clickLogs = logs.filter(l => l.event === "URL_CLICKED");

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <InsightsIcon sx={{ mr: 1 }} />
            URL Click Statistics
          </Typography>
          {clickLogs.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No clicks recorded yet.</Typography>
          ) : (
            <List>
              {clickLogs.map((log, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Short URL: ${log.data.shortUrl}`}
                    secondary={`Clicked at: ${new Date(log.timestamp).toLocaleString()}, Source: ${log.data.source}`}
                  />
                  <Chip label="Click" color="primary" size="small" />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Stats;
