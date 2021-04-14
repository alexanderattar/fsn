import { NextPage } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { createEns, deleteEns, useEnsNames } from '../api';
import styles from '../styles/Home.module.css';
import { EnsName } from '../types';

export const EnsList: React.FC = () => {
  const { data: ensNames, error } = useEnsNames();

  if (error != null) return <div>Error loading ENS names...</div>;
  if (ensNames == null) return <div>Loading...</div>;

  if (ensNames.length === 0) {
    return <div className={styles.emptyState}>Try adding an ENS name️</div>;
  }

  return (
    <ul className={styles.ensList}>
      {ensNames.map((name) => (
        <EnsItem ens={name} />
      ))}
    </ul>
  );
};

const EnsItem: React.FC<{ ens: EnsName }> = ({ ens }) => (
  <li className={styles.ensName}>
    {ens.text}
    <button className={styles.deleteButton} onClick={() => deleteEns(ens.id)}>
      ✕
    </button>
  </li>
);

const AddEnsInput = () => {
  const [text, setText] = useState('');

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        createEns(text);
        setText('');
      }}
      className={styles.addEns}
    >
      <input
        className={styles.input}
        placeholder="Enter an ens name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.addButton}>Add</button>
    </form>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Foundation Name Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Foundation Name Service</h1>
        <h2 className={styles.desc}>Register ENS names</h2>
      </header>

      <main className={styles.main}>
        <AddEnsInput />

        <EnsList />
      </main>
    </div>
  );
};

export default Home;
