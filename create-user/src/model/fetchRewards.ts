export type State = {
  name: string;
  abbreviation: string;
};

type FetchRewardsType = {
  occupations: Array<string>;
  states: Array<State>;
};

export default FetchRewardsType;