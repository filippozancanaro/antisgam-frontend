import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { HomepageContext } from './HomepageContext';
import type { IFollower } from '../../interfaces/followers/followers';
import type { IFollowingWrapper } from '../../interfaces/following/following';
import { ZipManager } from '../../utilities';

interface Props {
  children: ReactNode;
}

const HomepageProvider: React.FC<Props> = ({ children }) => {
  const [title] = useState('Homepage');
  const [mode, setMode] = useState<'zip' | 'json'>('zip');

  const changeMode = (value: 'zip' | 'json') => {
    setMode(value);
  };

  const manageJsonFile = async (
    file: File | null,
    type: 'followers' | 'following'
  ): Promise<void> => {
    // 1. Verifica file non nullo
    if (!file) return;

    // 2. Verifica MIME type
    if (file.type !== 'application/json') return;

    try {
      // 3. Lettura contenuto testuale
      const text = await file.text();

      // 4. Parsing JSON
      const data = JSON.parse(text);

      // 5. Serializzazione per tipo richiesto
      if (type === 'followers') {
        const followersData = data as IFollower;
        console.log('Followers data:', followersData);
        // TODO: gestisci followersData come ti serve
        return;
      }

      if (type === 'following') {
        const followingData = data as IFollowingWrapper;
        console.log('Following data:', followingData);
        // TODO: gestisci followingData come ti serve
        return;
      }

      // Se il tipo è diverso da quelli previsti
      return;
    } catch (error) {
      console.warn('Errore nel parsing JSON:', error);
      return;
    }
  };

  const manageZipFile = async (file: File): Promise<void> => {
    const zip = await ZipManager.unzipZipFile(file);
    if (!zip) return;

    const pathSegments = ['connections', 'followers_and_following'];

    // ✅ Recupera files followers
    const followersFiles = ZipManager.getFilesFromZip(
      zip,
      pathSegments,
      null,
      {
        nameStartsWith: 'followers',
        nameEndsWith: '.json'
      }
    );

    // ✅ Recupera files following
    const followingFiles = ZipManager.getFilesFromZip(
      zip,
      pathSegments,
      null,
      {
        nameStartsWith: 'following',
        nameEndsWith: '.json'
      }
    );

    // ✅ Leggi contenuto JSON dei file
    const followersContents = await Promise.all(
      followersFiles.map((f) => f.async('string'))
    );

    const followingContents = await Promise.all(
      followingFiles.map((f) => f.async('string'))
    );

    // TODO: fare il parsing in IFollowers / IFollowingWrapper e analizzarli
    console.log('Followers contents:', followersContents);
    console.log('Following contents:', followingContents);
  };


  return (
    <HomepageContext.Provider
      value={{
        title,
        mode,
        changeMode,
        manageJsonFile,
        manageZipFile
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;
