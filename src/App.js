import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./pages/404/NotFound";
import Home from "./pages/home/Home";
import Pokemon from "./pages/pokemon/Pokemon";
import './App.css'


function App() {
  return (
    <div className="app-container">
      <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home></Home>}></Route>
            <Route path="/pokemon" element={<Pokemon></Pokemon>} >
              <Route path="/pokemon/:id" element={<Pokemon></Pokemon>}></Route>
              <Route path="*" element={<NotFound/>}></Route>
            </Route>
            <Route path ="*" element={<NotFound/>} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
