import { useState } from 'react';
import URLForm from '../components/URLForm';
import URLList from '../components/URLList';
import { Container } from '@mui/material';

const Home = () => {
  const [shortened, setShortened] = useState([]);

  return (
    <Container sx={{ mt: 5 }}>
      <URLForm onShorten={(data) => setShortened([...shortened, ...data])} />
      <URLList urls={shortened} />
    </Container>
  );
};

export default Home;
