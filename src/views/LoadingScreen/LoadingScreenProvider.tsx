import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { LoadingScreenContext } from './LoadingScreenContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setPendingRequests, setRemovedSuggestions, setUnfollowers } from '../../shared/antisgam-core-state/antisgam-slice';
import { useCallback } from 'react';

interface Props {
  children: ReactNode;
}

const LoadingScreenProvider: React.FC<Props> = ({ children }) => {
  const hasDispatched = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const suggerimentiScemi = [
    'Segui la via del cammello e troverai la tua oasi',
    'Non dimenticare di bere acqua, anche se non hai sete',
    'La pazienza è la virtù dei pazienti',
    'Non piangere perchè ci sta mettendo troppo, piangi perché la benzina costa troppo',
    'Se il caricamento dura troppo, prova a contare le pecore',
    'Ricordati di pagare le tasse',
    'La vita è come una scatola di cioccolatini: a volte trovi quelli con il ripieno strano',
    'Non preoccuparti, il caricamento finirà prima o poi',
    'Se il caricamento si blocca, prova ad andare nel panico',
    'Ogni caricamento è un’opportunità per riflettere sulla vita e sulle tue scelte: qui hai circa 5 secondi di tempo per farlo',
    'E se fosse un caricamento infinito?',
    'The alla pesca o the al limone?',
    'Un caricamento non è mai in ritardo, Frodo Baggins, né in anticipo: termina esattamente quando intende farlo',
    'Se il caricamento sembra infinito, probabilmente lo è davvero',
    'Sto facendo cose...',
    'Un caricamento è come una storia: ha un inizio, uno sviluppo e forse pure una conclusione',
    'Questo caricamento è un po\' come quando incroci il vicino di casa in ascensore: aspettiamo in silenzio, ok?',
    'Lo sapevi che le formiche sono immuni al danno da caduta?',
    'Un caricamento è come un viaggio: se fa caldo eh... che palle',
    'Se il caricamento si blocca, prova a riprovare',
    'Non è la macchina che guida, lei non si fida di chi guida, sgrida chi non guida',
    'Un attimo e sarò subito da lei',
    'Lo sapevi che i turchi ottomani non si davano il 5, ma il 40?',
    'Come mai vuoi sapere chi ti ha unfollowato? Ti interessa veramente?',
    'Hai mai pensato al fatto che il cervello si è scelto il nome da solo?',
    'Il Listenbourgh è una nazione fondata nel 1949 da un gruppo di sceicchi metallari guidato da Tinky Winky, la moneta ufficiale sono i tappi di birra e la lingua ufficiale è il dialetto di Milano',
    'Ancora qui stai? O si è bloccato il caricamento?',
    'Sei sicuro di voler continuare? Il caricamento potrebbe essere lungo',
    'Ripensaci, il caricamento potrebbe essere infinito',
    'Davvero ti interessa sapere chi ha smesso di seguirti? Guarda che se ci rimani male non è colpa mia',
    'Sei sicuro di voler vedere chi ti ha bloccato? Potrebbe essere doloroso',
    'La curiosità è un buon motivo per aspettare un caricamento, ma non sempre porta a qualcosa di buono'
  ];

  const [suggerimenti] = useState<string[]>(suggerimentiScemi);
  const [minWaitOver, setMinWaitOver] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);

  const followers = useSelector((state: RootState) => state.antisgam.followersData);
  const following = useSelector((state: RootState) => state.antisgam.followingData);
  const pendingRequests = useSelector((state: RootState) => state.antisgam.pendingRequests);
  const removedSuggestions = useSelector((state: RootState) => state.antisgam.removedSuggestions);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinWaitOver(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);


  const analyzeData = useCallback(async (
    followers: string[],
    following: string[],
    pendingRequests: string[] | null,
    removedSuggestions: string[] | null,
  ): Promise<void> => {
    if (!followers || !following || followers.length === 0 || following.length === 0) return;

    const followersSet = new Set(followers);
    const unfollowersSet = new Set(
      following.filter((nickname) => !followersSet.has(nickname))
    );

    const sortedUnfollowers = Array.from(unfollowersSet).sort((a, b) =>
      a.localeCompare(b)
    );

    dispatch(setUnfollowers(sortedUnfollowers));

    // aggiungo una verifica sulle richieste in pending
    if (pendingRequests && pendingRequests?.length > 0) {
      const pendingRequestsSet = new Set(pendingRequests);

      const sortedPendingReq = Array.from(pendingRequestsSet).sort((a, b) =>
        a.localeCompare(b)
      );

      dispatch(setPendingRequests(sortedPendingReq));
    }

    // aggiungo una verifica sulle suggestions rimosse
    if (removedSuggestions && removedSuggestions?.length > 0) {
      const RemovedSuggestionsSet = new Set(removedSuggestions);

      const sortedRemovedSuggestions = Array.from(RemovedSuggestionsSet).sort((a, b) =>
        a.localeCompare(b)
      );

      dispatch(setRemovedSuggestions(sortedRemovedSuggestions));
    }

    setAnalysisDone(true);
  }, [dispatch]);

  useEffect(() => {
    if (!hasDispatched.current) {
      analyzeData(followers, following, pendingRequests, removedSuggestions);
      hasDispatched.current = true;
    }
  }, [analyzeData, followers, following, pendingRequests, removedSuggestions]);

  useEffect(() => {
    if (minWaitOver && analysisDone) {
      navigate('/results');
    }
  }, [minWaitOver, analysisDone, navigate]);

  return (
    <LoadingScreenContext.Provider
      value={{
        suggerimenti
      }}
    >
      {children}
    </LoadingScreenContext.Provider>
  );
};

export default LoadingScreenProvider;
