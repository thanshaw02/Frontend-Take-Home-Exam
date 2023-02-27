import FetchRewardsType from "../model/fetchRewards";

const FETCH_REWARDS_ENDPOINT = "https://frontend-take-home.fetchrewards.com/form";

const get = (): Promise<FetchRewardsType> => {
  const requestInfo = {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
  };

  return new Promise((resolve, reject) => {
    fetch(FETCH_REWARDS_ENDPOINT, requestInfo).then((response) => {
      if (!response.ok) reject(response.statusText);
      resolve(response.json());
    }, reject);
  });
};

const post = (
  name: string, 
  email: string, 
  password: string, 
  occupation: string, 
  state: string
): Promise<void> => {
  const requestInfo = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      occupation: occupation,
      state: state
    }),
  };

  return new Promise((resolve, reject) => {
    fetch(FETCH_REWARDS_ENDPOINT, requestInfo).then((response) => {
      if (!response.ok) reject(response.status);
      resolve();
    }, reject);
  });
}

export default { get, post };