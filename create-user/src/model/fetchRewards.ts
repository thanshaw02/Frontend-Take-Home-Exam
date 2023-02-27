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
