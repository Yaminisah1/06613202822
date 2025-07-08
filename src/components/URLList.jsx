import {
  Card,
  CardContent,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Link
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const URLList = ({ urls }) => (
  <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>Shortened URLs</Typography>
      <List>
        {urls.map((u, i) => (
          <ListItem key={i} divider>
            <ListItemText
              primary={
                <Link href={u.shortUrl} target="_blank" rel="noopener">
                  <OpenInNewIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                  {u.shortUrl}
                </Link>
              }
              secondary={
                <>
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={`Expires: ${new Date(u.expiry).toLocaleString()}`}
                    sx={{ mt: 1 }}
                    color="secondary"
                    size="small"
                  />
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default URLList;
