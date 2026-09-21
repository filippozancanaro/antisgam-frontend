import followers1 from "./followers_1.json";
import followers2 from "./followers_2.json";
import following from "./following.json";
import pendingFollowRequests from "./pending_follow_requests.json";
import removedSuggestions from "./removed_suggestions.json";
import legacyHistory from "./legacy_history.json";

export const fixtures = {
  followers1,
  followers2,
  following,
  pendingFollowRequests,
  removedSuggestions,
  legacyHistory,
};

/** Risultato atteso analizzando l'export completo (followers_1 + followers_2 + following). */
export const EXPECTED = {
  followers: ["alice", "bob", "carol", "dave"],
  following: ["alice", "bob", "eve", "zed"],
  unfollowers: ["eve", "zed"],
  pendingRequests: ["private_pam"],
  removedSuggestions: ["ad_amy", "spam_sam"],
};
