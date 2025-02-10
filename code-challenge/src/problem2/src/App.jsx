import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./page/Home";
import SwapPage from "./page/SwapPage";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/swap" element={<SwapPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
