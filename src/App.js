import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./pages/404/NotFound";
import Home from "./pages/home/Home";
import Pokemon from "./pages/pokemon/Pokemon";
import './App.css'
import Type from "./pages/Type/Type";


function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<Home></Home>}></Route>
              <Route path="/:id" element={<Pokemon></Pokemon>}></Route>
              <Route path="/type/:type" element={<Type></Type>}></Route>
            <Route path ="*" element={<NotFound/>} ></Route>
          </Route>
        </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
