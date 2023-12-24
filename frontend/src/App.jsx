// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import LayoutDefault from "./layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutDefault>
                <Home />
              </LayoutDefault>
            }
          />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
