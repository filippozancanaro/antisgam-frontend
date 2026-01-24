import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface InstagramInfos {
  followersData: string[]; // nicknames di chi ti segue
  followingData: string[]; // nicknames di chi tu segui
  unfollowersData: string[]; // nicknames che tu segui ma che non ti seguono
  pendingRequests: string[]; // nicknames di chi hai chiesto di seguire ma deve ancora accettare
  removedSuggestions: string[]; // nicknames di chi era suggerito ma hai tolto
}

type AntisgamScanData = {
  timestamp: number | null;
  date: Date | null;
  data: InstagramInfos;
};

interface AntisgamHistoryState {
  scansHistory: AntisgamScanData[];
}

export const antisgamAtom = atom<InstagramInfos>({
  followersData: [],
  followingData: [],
  unfollowersData: [],
  pendingRequests: [],
  removedSuggestions: [],
});

export const antisgamHistoryAtom = atomWithStorage<AntisgamHistoryState>(
  "antisgamdata",
  {
    scansHistory: [],
  },
);

export const getScanHistoryAtom = atom((get) => get(antisgamHistoryAtom));
export const getLastScanAtom = atom((get) => get(antisgamAtom));

export const commitLastScanToHistoryAtom = atom(null, (get, set) => {
  const prev = get(antisgamHistoryAtom);
  const lastScan = get(antisgamAtom);
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const newScan: AntisgamScanData = {
    timestamp,
    date: currentDate,
    data: lastScan,
  };
  const updatedHistory = [newScan, ...prev.scansHistory];

  set(antisgamHistoryAtom, {
    ...prev,
    scansHistory: updatedHistory,
  });
});

export const cleanupLastScanAtom = atom(null, (_get, set) => {
  set(antisgamAtom, {
    followersData: [],
    followingData: [],
    unfollowersData: [],
    pendingRequests: [],
    removedSuggestions: [],
  });
});

export const setScanFollowersAtom = atom(
  null,
  (get, set, followers: string[]) => {
    const prev = get(antisgamAtom);

    const newScan: InstagramInfos = {
      followersData: followers,
      followingData: prev ? prev.followingData : [],
      unfollowersData: prev ? prev.unfollowersData : [],
      pendingRequests: prev ? prev.pendingRequests : [],
      removedSuggestions: prev ? prev.removedSuggestions : [],
    };

    set(antisgamAtom, {
      ...newScan,
    });
  },
);

export const setScanFollowingAtom = atom(
  null,
  (get, set, following: string[]) => {
    const prev = get(antisgamAtom);

    const newScan: InstagramInfos = {
      followingData: following,
      followersData: prev ? prev.followersData : [],
      unfollowersData: prev ? prev.unfollowersData : [],
      pendingRequests: prev ? prev.pendingRequests : [],
      removedSuggestions: prev ? prev.removedSuggestions : [],
    };

    set(antisgamAtom, {
      ...newScan,
    });
  },
);

export const setScanPendingRequestsAtom = atom(null, (get, set, pending: string[]) => {
  const prev = get(antisgamAtom);

  const newScan: InstagramInfos = {
    followingData: prev ? prev.followingData : [],
    followersData: prev ? prev.followersData : [],
    unfollowersData: prev ? prev.unfollowersData : [],
    pendingRequests: pending,
    removedSuggestions: prev ? prev.removedSuggestions : [],
  };

  set(antisgamAtom, {
    ...newScan,
  });
});

export const setScanRemovedSuggestionsAtom = atom(
  null,
  (get, set, removedSuggestions: string[]) => {
    const prev = get(antisgamAtom);

    const newScan: InstagramInfos = {
      followingData: prev ? prev.followingData : [],
      followersData: prev ? prev.followersData : [],
      unfollowersData: prev ? prev.unfollowersData : [],
      pendingRequests: prev ? prev.pendingRequests : [],
      removedSuggestions: removedSuggestions,
    };

    set(antisgamAtom, {
      ...newScan,
    });
  },
);

export const setScanUnfollowersAtom = atom(
  null,
  (get, set, unfollowers: string[]) => {
    const prev = get(antisgamAtom);

    const newScan: InstagramInfos = {
      unfollowersData: unfollowers,
      followingData: prev ? prev.followingData : [],
      followersData: prev ? prev.followersData : [],
      pendingRequests: prev ? prev.pendingRequests : [],
      removedSuggestions: prev ? prev.removedSuggestions : [],
    };

    set(antisgamAtom, {
      ...newScan,
    });
  },
);
