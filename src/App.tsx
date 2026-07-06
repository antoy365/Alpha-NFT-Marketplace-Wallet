// ИСПРАВЛЕНО: Добавили фигурные скобки, так как в файле LandingPage используется именованный экспорт (export const)
import { LandingPage } from "./components/LandingPage";
import Marketplace from "./Marketplace";

function App() {
  return (
    <LandingPage>
      {/* Маркетплейс откроется строго после авторизации кошелька */}
      <Marketplace />
    </LandingPage>
  );
}

export default App;

