import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { HomepageContext } from './HomepageContext';
import type { IFollower } from '../../interfaces/followers/followers';
import type { IFollowingWrapper } from '../../interfaces/following/following';
import { ZipManager } from '../../utilities';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowers, setFollowing, setPendingRequests, setRemovedSuggestions } from '../../shared/antisgam-core-state/antisgam-slice';
import { useGlobalCleanup } from '../../shared/antisgam-cleanup/AntisgamCleanup';
import type { RootState } from '../../store/store';
import type { IPendingFollowRequestsWrapper } from '../../interfaces/pending-follow-requests/pending-follow-requests';
import type { IRemovedSuggestionsWrapper } from '../../interfaces/removed-suggestions/removed-suggestions';
import { useSnackbar } from 'notistack';

interface Props {
  children: ReactNode;
}

const HomepageProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cleanup = useGlobalCleanup();
  const { enqueueSnackbar } = useSnackbar();

  const enableJsonFiles = useSelector((state: RootState) => state.uploaderJson.enableJsonFiles);
  const initialMode = !enableJsonFiles ? 'zip' : 'zip';

  const [mode, setMode] = useState<'zip' | 'json'>(initialMode);
  const [formFollowers, setFormFollowers] = useState<Set<string> | null>(null);
  const [formFollowing, setFormFollowing] = useState<Set<string> | null>(null);
  const [formPending, setFormPending] = useState<Set<string> | null>(null);
  const [formSuggestions, setFormSuggestions] = useState<Set<string> | null>(null);
  const [uploaderETag, setUploaderETag] = useState<number>(0);

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
        const followersData = data as IFollower[];

        // Aggiungo i followers allo state
        addFollowersToForm(followersData);
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
      enqueueSnackbar('Errore nell\'analisi del file JSON, si prega di verificare il file e riprovare', { variant: 'error' });
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
      // console.error('Nessun file followers trovato nello zip.');
      enqueueSnackbar('Nessun file json "followers" trovato nello zip', { variant: 'error' });
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
      // console.error('Nessun file following trovato nello zip.');
      enqueueSnackbar('Nessun file json "following" trovato nello zip', { variant: 'error' });
      return;
    }


    // Recupero tutti i files "pending_follow_requests * .json"
    const pendingFollowRequestsFiles = ZipManager.getFilesFromZip(
      zip,
      pathSegments,
      null, // evito in questa fase di mettere un nome fisso, non so come si comporti il naming per i vippones con tanti followerz (maledetti vippones)
      {
        nameStartsWith: 'pending_follow_requests',
        nameEndsWith: '.json'
      }
    );

    if (pendingFollowRequestsFiles?.length <= 0) {
      // console.error('Nessun file pending follow requests trovato nello zip.');
      enqueueSnackbar('AVVISO: Nessuna informazione sulle "Richieste Inviate" trovata: l\'analisi finale non restituirà questa informazione', { variant: 'warning' });
    }

    // Recupero tutti i files "removed_suggestions * .json"
    const removedSuggestionsFiles = ZipManager.getFilesFromZip(
      zip,
      pathSegments,
      null, // evito in questa fase di mettere un nome fisso, non so come si comporti il naming per i vippones con tanti followerz (maledetti vippones)
      {
        nameStartsWith: 'removed_suggestions',
        nameEndsWith: '.json'
      }
    );

    if (removedSuggestionsFiles?.length <= 0) {
      // console.error('Nessun file removed suggestions trovato nello zip.');
      enqueueSnackbar('AVVISO: Nessuna informazione sui "Suggerimenti Rimossi" trovata: l\'analisi finale non restituirà questa informazione', { variant: 'warning' });
    }

    // Estraggo il contenuto JSON dei file
    const followersContents = await Promise.all(
      (followersFiles ?? []).map((f) => f.async('string'))
    );

    const followingContents = await Promise.all(
      (followingFiles ?? []).map((f) => f.async('string'))
    );

    const pendingFollowRequestsContents = await Promise.all(
      (pendingFollowRequestsFiles ?? []).map((f) => f.async('string'))
    );

    const removedSuggestionsContents = await Promise.all(
      (removedSuggestionsFiles ?? []).map((f) => f.async('string'))
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

    if (pendingFollowRequestsContents && pendingFollowRequestsContents?.length > 0)
      pendingFollowRequestsContents.forEach((f) => {
        const parsedPending = JSON.parse(f) as IPendingFollowRequestsWrapper;
        addPendingFollowRequestsToForm(parsedPending);
      });

    if (removedSuggestionsContents && removedSuggestionsContents?.length > 0)
      removedSuggestionsContents.forEach((f) => {
        const parsedRemoved = JSON.parse(f) as IRemovedSuggestionsWrapper;
        addRemovedSuggestionsToForm(parsedRemoved);
      });
  };

  const addFollowersToForm = (followersList: IFollower[]) => {
    // recupero tutti i nicknames e li salvo nello state
    // console.log('Aggiungo followers:', followersList);

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

    // console.log('Aggiungo followers nicknames:', followerNicknames);

    setFormFollowers(followerNicknames);
  }

  const addFollowingToForm = (following: IFollowingWrapper) => {
    // recupero tutti i nicknames e li salvo nello state
    // console.log('Aggiungo following:', following);

    if (!following || following.relationships_following == null || following?.relationships_following == null)
      return;

    // creo un set di nicknames per evitare duplicati
    const followingNicknames: Set<string> = new Set<string>();
    following.relationships_following.forEach((follower) => {
      if (follower.title && !followingNicknames.has(follower.title))
            followingNicknames.add(follower.title);
    });

    // console.log('Aggiungo following nicknames:', followingNicknames);

    setFormFollowing(followingNicknames);
  }

  const addPendingFollowRequestsToForm = (pendingRequests: IPendingFollowRequestsWrapper) => {
    // recupero tutti i nicknames e li salvo nello state
    // console.log('Aggiungo pending requests:', pendingRequests);

    if (!pendingRequests || pendingRequests.relationships_follow_requests_sent == null || pendingRequests?.relationships_follow_requests_sent == null)
      return;

    // creo un set di nicknames per evitare duplicati
    const pendingNicknames: Set<string> = new Set<string>();
    pendingRequests.relationships_follow_requests_sent.forEach((rf) => {

      if (rf.string_list_data && rf.string_list_data.length > 0) {
        rf.string_list_data.forEach((follower) => {
          if (follower.value && !pendingNicknames.has(follower.value))
            pendingNicknames.add(follower.value);
        });
      }

    });

    // console.log('Aggiungo pending requests nicknames:', pendingNicknames);

    setFormPending(pendingNicknames);
  }

  const addRemovedSuggestionsToForm = (dismissed: IRemovedSuggestionsWrapper) => {
    // recupero tutti i nicknames e li salvo nello state
    // console.log('Aggiungo removed suggestions:', dismissed);

    if (!dismissed || dismissed.relationships_dismissed_suggested_users == null || dismissed?.relationships_dismissed_suggested_users == null)
      return;

    // creo un set di nicknames per evitare duplicati
    const removedSuggestionsNicknames: Set<string> = new Set<string>();
    dismissed.relationships_dismissed_suggested_users.forEach((rf) => {

      if (rf.string_list_data && rf.string_list_data.length > 0) {
        rf.string_list_data.forEach((removedSuggestion) => {
          if (removedSuggestion.value && !removedSuggestionsNicknames.has(removedSuggestion.value))
            removedSuggestionsNicknames.add(removedSuggestion.value);
        });
      }

    });

    // console.log('Aggiungo removed suggestions nicknames:', removedSuggestionsNicknames);

    setFormSuggestions(removedSuggestionsNicknames);
  }

  const cleanupFormField = (fieldName?: 'followers' | 'following' | 'pending' | 'suggestions') => {
    if (!fieldName)
      return;

    if (fieldName === 'followers') {
      setFormFollowers(null);
    }

    if (fieldName === 'following') {
      setFormFollowing(null);
    }

    if (fieldName === 'pending') {
      setFormPending(null);
    }

    if (fieldName === 'suggestions') {
      setFormSuggestions(null);
    }
  }

  const analyzeData = async (): Promise<void> => {
    // console.log(formFollowers);
    // console.log(formFollowing);

    if (!formFollowers || !formFollowing) {
      // console.warn('Followers o Following mancanti, impossibile analizzare.');
      enqueueSnackbar('Dati sui Followers o Following mancanti, impossibile procedere con la verifica.', { variant: 'error' });
      return;
    }

    // 1. Salvataggio su Redux
    dispatch(setFollowers(Array.from(formFollowers)));
    dispatch(setFollowing(Array.from(formFollowing)));
    dispatch(setPendingRequests(Array.from(formPending ?? [])));
    dispatch(setRemovedSuggestions(Array.from(formSuggestions ?? [])));

    // 2. Redirect su "/loading"
    navigate('/loading');
  };

  const resetForm = async (): Promise<void> => {
    // 0. Reset della modalità
    setMode('zip');

    // 1. Reset dello state
    cleanupFormField('followers');
    cleanupFormField('following');
    cleanupFormField('pending');
    cleanupFormField('suggestions');

    // modifico l'etag per forzare il re-render del componente Uploader
    const updatedUploaderETag = (uploaderETag < (Number.MAX_VALUE - 4)) ? uploaderETag + 1 : 0;
    setUploaderETag(updatedUploaderETag);

    enqueueSnackbar('Applicazione resettata.', { variant: 'info' });

    // 2. Reset del Redux store
    cleanup();
  };

  return (
    <HomepageContext.Provider
      value={{
        enableJsonFiles,
        uploaderETag,
        mode,
        formFollowers,
        formFollowing,

        changeMode,
        manageJsonFile,
        manageZipFile,
        cleanupFormField,
        analyzeData,
        resetForm
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;
