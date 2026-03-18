import { LandingPage } from "./components/LandingPage";
import Marketplace from "./Marketplace";

function App() {
  return (
    <LandingPage>
      {/* 
         Все, что находится внутри LandingPage, 
         появится только после того, как пользователь подключит кошелек.
      */}
      <Marketplace />
    </LandingPage>
  );
}

export default App;

