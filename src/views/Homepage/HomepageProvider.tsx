import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { HomepageContext } from './HomepageContext';
import type { IFollower } from '../../interfaces/followers/followers';
import type { IFollowingWrapper } from '../../interfaces/following/following';
import { ZipManager } from '../../utilities';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFollowers, setFollowing } from '../../shared/antisgam-core-state/antisgam-slice';

interface Props {
  children: ReactNode;
}

const HomepageProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mode, setMode] = useState<'zip' | 'json'>('zip');
  const [formFollowers, setFormFollowers] = useState<Set<string> | null>(null);
  const [formFollowing, setFormFollowing] = useState<Set<string> | null>(null);

  const changeMode = (value: 'zip' | 'json') => {
    setMode(value);
  };

  const manageJsonFile = async (
    file: File | null,
    type: 'followers' | 'following'
  ): Promise<void> => {
    // 1. Verifica file non nullo
    if (!file)
      return;

    // 2. Verifica MIME type
    if (file.type !== 'application/json')
      return;

    try {
      // 3. Lettura contenuto testuale
      const text = await file.text();

      // 4. Parsing JSON
      const data = JSON.parse(text);

      // 5. Serializzazione per tipo richiesto
      if (type === 'followers') {
        const followersData = data as IFollower;

        // Aggiungo i followers allo state
        addFollowersToForm([followersData]);
        return;
      }

      if (type === 'following') {
        const followingData = data as IFollowingWrapper;

        // Aggiungo i following allo state
        addFollowingToForm(followingData);
        return;
      }

      // Se il tipo è diverso da quelli previsti (non dovrebbe, ma nel dubbio male non fa)
      return;
    } catch (error) {
      console.warn('Errore nel parsing JSON:', error);
      return;
    }
  };

  const manageZipFile = async (file: File): Promise<void> => {
    if (file == null || !file)
      return;

    if (file.type !== 'application/zip' && file.type !== 'application/x-zip-compressed')
      return;

    // unzip del file
    const zip = await ZipManager.unzipZipFile(file);

    // verifica che il file non sia nullo
    if (!zip)
      return;

    // il path dello zip di meta attualmente è questo, valutare se spostarlo in una variabile di ambiente poi
    // TODO => spostare in una variabile di ambiente
    const pathSegments = ['connections', 'followers_and_following'];

    // Recupero tutti i files "followers * .json"
    const followersFiles = ZipManager.getFilesFromZip(
      zip,
      pathSegments,
      null, // evito in questa fase di mettere un nome fisso, non so come si comporti il naming per i vippones con tanti followerz (maledetti vippones)
      {
        nameStartsWith: 'followers',
        nameEndsWith: '.json'
      }
    );

    if (followersFiles?.length <= 0) {
      console.error('Nessun file followers trovato nello zip.');
      return;
    }

    // Recupero tutti i files "following * .json"
    const followingFiles = ZipManager.getFilesFromZip(
      zip,
      pathSegments,
      null, // evito in questa fase di mettere un nome fisso, non so come si comporti il naming per i vippones con tanti followerz (maledetti vippones)
      {
        nameStartsWith: 'following',
        nameEndsWith: '.json'
      }
    );

    if (followingFiles?.length <= 0) {
      console.error('Nessun file following trovato nello zip.');
      return;
    }

    // Estraggo il contenuto JSON dei file
    const followersContents = await Promise.all(
      followersFiles.map((f) => f.async('string'))
    );

    const followingContents = await Promise.all(
      followingFiles.map((f) => f.async('string'))
    );

    // Aggiungo i followers e following allo state
    if (followersContents && followersContents?.length > 0)
      followersContents.forEach((f) => {
        const parsedF = JSON.parse(f) as IFollower[];
        addFollowersToForm(parsedF);
      });

    if (followingContents && followingContents?.length > 0)
      followingContents.forEach((f) => {
        const parsedF = JSON.parse(f) as IFollowingWrapper;
        addFollowingToForm(parsedF);
      });
  };

  const addFollowersToForm = (followersList: IFollower[]) => {
    // recupero tutti i nicknames e li salvo nello state
    console.log('Aggiungo followers:', followersList);

    if (!followersList || followersList.length <= 0)
      return;

    // creo un set di nicknames per evitare duplicati
    const followerNicknames: Set<string> = new Set<string>();
    followersList.forEach(followers => {

      if (followers && followers.string_list_data && followers.string_list_data.length > 0) {
        followers.string_list_data.forEach((follower) => {
          if (follower.value && !followerNicknames.has(follower.value))
            followerNicknames.add(follower.value);
        });
      }

    });

    console.log('Aggiungo followers nicknames:', followerNicknames);

    setFormFollowers(followerNicknames);
  }

  const addFollowingToForm = (following: IFollowingWrapper) => {
    // recupero tutti i nicknames e li salvo nello state
    console.log('Aggiungo following:', following);

    if (!following || following.relationships_following == null || following?.relationships_following == null)
      return;

    // creo un set di nicknames per evitare duplicati
    const followingNicknames: Set<string> = new Set<string>();
    following.relationships_following.forEach((rf) => {

      if (rf.string_list_data && rf.string_list_data.length > 0) {
        rf.string_list_data.forEach((follower) => {
          if (follower.value && !followingNicknames.has(follower.value))
            followingNicknames.add(follower.value);
        });
      }

    });

    console.log('Aggiungo following nicknames:', followingNicknames);

    setFormFollowing(followingNicknames);
  }

  const cleanupFormField = (fieldName?: 'followers' | 'following') => {
    if (!fieldName)
      return;

    if (fieldName === 'followers') {
      setFormFollowers(null);
    }

    if (fieldName === 'following') {
      setFormFollowing(null);
    }
  }

  const analyzeData = async (): Promise<void> => {
    console.log(formFollowers);
    console.log(formFollowing);

    if (!formFollowers || !formFollowing) {
      console.warn('Followers o Following mancanti, impossibile analizzare.');
      return;
    }

    // 1. Salvataggio su Redux
    dispatch(setFollowers(Array.from(formFollowers)));
    dispatch(setFollowing(Array.from(formFollowing)));

    // 2. Redirect su "/loading"
    navigate('/loading');
  };

  return (
    <HomepageContext.Provider
      value={{
        mode,
        formFollowers,
        formFollowing,

        changeMode,
        manageJsonFile,
        manageZipFile,
        cleanupFormField,
        analyzeData
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;
