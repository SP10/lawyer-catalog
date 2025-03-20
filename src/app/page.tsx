import Layout from '@/components/layout';
import Search from '@/components/ui/input/SearchBar';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import lawyer from '@public/lawyer.svg';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center" direction={{ xs: 'column-reverse', sm: 'row' }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Typography variant="h2" component="h1" gutterBottom>
                Захист ваших прав – наша місія
              </Typography>
              <Typography variant="body1" paragraph>
                Наші юристи готові допомогти вам у будь-яких правових питаннях.
              </Typography>
              <Search />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Image
              src={lawyer}
              alt="Юрист"
              layout="responsive"
              width={800}
              height={600}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
