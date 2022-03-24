import Head from 'next/head'
import Link from 'next/link';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const PagePaper = styled(Paper)(({
  theme
}) => ({
  flex: 1,
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));

export default function Repos({ repo }) {
  return (
    <div className="container">
      <Head>
        <title>ZDNS Github Info</title>
        <link rel="icon" href="/zdns.svg" />
      </Head>

      <main>
        <Head>
          <title>Repo {repo.name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <PagePaper elevation={4}>
          <div>{repo.name}</div>
          <div>{repo.description}</div>
          <div>Stars: {repo.stargazers_count}</div>
          <div>Forks: {repo.forks_count}</div>
        </PagePaper>
      </main>

      <style jsx>{`
      `}</style>
    </div>
  )
}


export async function getStaticPaths() {
  const resp = await fetch('https://api.github.com/orgs/zdnsweb/repos');
  const repos = await resp.json();
  const paramsList = repos.map(({ name }) => ({
    params: { name },
  }));

  return {
    paths: paramsList,
    fallback: false,
  };
}

export async function getStaticProps({ params: { name }}) {
  const resp = await fetch(`https://api.github.com/repos/zdnsweb/${name}`);

  const repo = await resp.json();
  
  return {
    props: {
      repo,
    }, // will be passed to the page component as props
  };
}