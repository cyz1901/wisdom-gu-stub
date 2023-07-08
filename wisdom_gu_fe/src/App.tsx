import { Routes, Route } from "@solidjs/router";
import HomePage from "./pages/HomePage";
import { JSX } from "solid-js";

function App(): JSX.Element {
  const routes = (
    <Routes>
      <Route path="/" component={HomePage} />
    </Routes>
  );

  return <>{routes}</>;
}

export default App;
