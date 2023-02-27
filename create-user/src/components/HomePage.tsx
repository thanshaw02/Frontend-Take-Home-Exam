import { FC } from "react";
import CreateUserComponent from "./CreateUserComponent";

type HomePagePropsType = {
  // empty props for now
};

const HomePage: FC<HomePagePropsType> = (props) => {
  
  return (
    <CreateUserComponent />
  );
};

export default HomePage;
