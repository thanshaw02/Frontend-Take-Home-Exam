import FetchRewardsType, { User } from "../model/fetchRewards";

const FETCH_REWARDS_ENDPOINT =
  "https://frontend-take-home.fetchrewards.com/form";

const getDataForForm = (): Promise<FetchRewardsType> => {
  const requestInfo = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    fetch(FETCH_REWARDS_ENDPOINT, requestInfo).then((response) => {
      if (!response.ok) reject(response.status);
      resolve(response.json());
    }, reject);
  });
};

const submitUserData = (user: User): Promise<void> => {
  const requestInfo = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return new Promise((resolve, reject) => {
    fetch(FETCH_REWARDS_ENDPOINT, requestInfo).then((response) => {
      if (!response.ok) reject(response.status);
      resolve();
    }, reject);
  });
};

const FetchRewards = {
  getDataForForm,
  submitUserData,
};

export default FetchRewards;
