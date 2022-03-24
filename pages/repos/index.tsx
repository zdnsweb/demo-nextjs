import Head from 'next/head'
import Link from 'next/link';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WebIcon from '@mui/icons-material/Web';

const PagePaper = styled(Paper)(({
  theme
}) => ({
  flex: 1,
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));
const StyledListItem = styled(ListItem)(({
  theme
}) => ({
  transition: 'all 1s',
  '&:hover': {
    boxShadow: `0 0 4px 4px ${theme.palette.primary.main}`,
  },
}));

export default function Repos({ repos }) {
  return (
    <div className="container">
      <Head>
        <title>ZDNS Github Info</title>
        <link rel="icon" href="/zdns.svg" />
      </Head>

      <main>
        <Head>
          <title>Blog List</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <PagePaper elevation={4}>
          <List>
            {repos.map(
              (repo): JSX.Element => (
                <StyledListItem key={repo.name}>
                  <ListItemIcon>
                    <WebIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link href={`/repos/${repo.name}`}>
                        <Button>{repo.description}({repo.name})</Button>
                      </Link>
                    }
                  />
                  <ListItemText secondary={repo.updated_at} />
                </StyledListItem>
              )
            )}
          </List>
        </PagePaper>
      </main>

      <style jsx>{`
      `}</style>
    </div>
  )
}

export async function getStaticProps(context) {
  const resp = await fetch('https://api.github.com/orgs/zdnsweb/repos');

  const repos = await resp.json();
  
  return {
    props: {
      repos,
    }, // will be passed to the page component as props
  };
}