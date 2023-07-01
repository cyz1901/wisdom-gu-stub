import { Routes, Route } from "@solidjs/router";
import Home from "./pages/Home";
import { JSX } from "solid-js";

function App(): JSX.Element {
  const routes = (
    <Routes>
      <Route path="/" component={Home} />
    </Routes>
  );

  return <>{routes}</>;
}

export default App;
