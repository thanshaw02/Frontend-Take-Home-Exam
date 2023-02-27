// represents the user object sent via POST to fetch rewards endpoint from form data submitted by the user
export type User = {
  name: string;
  email: string;
  password: string;
  occupation: string;
  state: string;
};

// represents the array of state names and state abbreviations returned from GET request
export type State = {
  name: string;
  abbreviation: string;
};

// represents whole object returned from GET request
type FetchRewardsType = {
  occupations: Array<string>;
  states: Array<State>;
};

export default FetchRewardsType;
