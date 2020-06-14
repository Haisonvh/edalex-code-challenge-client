import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import MainBody from './MainBody';
import AppBar from './AppBar'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.edalex.com/">
        Edalex Code Challenge
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="lg">
      <Box my={1}>
        <AppBar />
        <MainBody />
        <Copyright />
      </Box>
    </Container>
  );
}
