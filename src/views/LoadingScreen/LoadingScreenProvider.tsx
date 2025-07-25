import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { LoadingScreenContext } from './LoadingScreenContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setUnfollowers } from '../../shared/antisgam-core-state/antisgam-slice';
import { useCallback } from 'react';

interface Props {
  children: ReactNode;
}

const LoadingScreenProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const suggerimentiScemi = [
    'Segui la via del cammello e troverai la tua oasi',
    'Non dimenticare di bere acqua, anche se non hai sete',
    'La pazienza è la virtù dei forti, ma anche dei caricamenti',
    'Un caricamento al giorno toglie il medico di torno',
    'Se il caricamento dura troppo, prova a contare le pecore',
    'Ricorda: ogni caricamento è un passo verso la tua destinazione',
    'La vita è come un caricamento: a volte ci vuole tempo, ma alla fine ne vale la pena',
    'Non preoccuparti, il caricamento finirà prima o poi',
    'Se il caricamento si blocca, prova a fare una pausa e rilassarti',
    'Ogni caricamento è un’opportunità per riflettere sulla vita e sulle tue scelte',
    'La pazienza è la chiave per affrontare i caricamenti più lunghi',
    'Un caricamento lento è solo un caricamento che si prende il suo tempo',
    'Non c’è fretta, il caricamento arriverà quando sarà pronto',
    'Se il caricamento sembra infinito, prova a immaginare un mondo senza caricamenti',
    'La vita è un caricamento continuo: a volte veloce, a volte lento, ma sempre in movimento',
    'Un caricamento è come una storia: ha un inizio, uno sviluppo e una conclusione',
    'Non dimenticare di sorridere durante il caricamento, potrebbe rendere l’attesa più piacevole',
    'La vita è come un caricamento: a volte ci sono errori, ma si può sempre riprovare',
    'Un caricamento è come un viaggio: a volte ci sono ostacoli, ma alla fine si arriva a destinazione',
    'Se il caricamento si blocca, prova a fare un respiro profondo e riprovare',
    'La vita è piena di caricamenti: alcuni brevi, altri lunghi, ma tutti necessari per crescere',
    'Un caricamento è come un puzzle: a volte ci vuole tempo per mettere insieme i pezzi, ma alla fine si vede il quadro completo',
    'Hai mai pensato al fatto che il cervello si è scelto il nome da solo?',
    'Il Listenbourgh è una nazione fondata nel 1949 da un gruppo di metallari guidato da... boh, si, quel tipo la',
    'Ancora qui stai? O si è bloccato il caricamento?',
    'Sei sicuro di voler continuare? Il caricamento potrebbe essere lungo',
    'Ripensaci amico, il caricamento potrebbe essere infinito',
    'Davvero ti interessa sapere chi ha smesso di seguirti? Guarda che se ci rimani male non è colpa mia',
    'Sei sicuro di voler vedere chi ti ha bloccato? Potrebbe essere doloroso',
    'La curiosità è un buon motivo per aspettare un caricamento, ma non sempre porta a qualcosa di buono'
  ];

  const [suggerimenti] = useState<string[]>(suggerimentiScemi);

  const followers = useSelector((state: RootState) => state.antisgam.followersData);
  const following = useSelector((state: RootState) => state.antisgam.followingData);

  const analyzeData = useCallback(async (
    followers: string[],
    following: string[]
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

    if (followersSet === unfollowersSet)
    navigate('/results');
  }, [dispatch, navigate]);

  useEffect(() => {
    analyzeData(followers, following);
  }, [analyzeData, followers, following]);

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
