import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/Navbar.component";
import { Routes, Route } from "react-router-dom";
import CustomLinearLoader from "./components/custom-linear-progress/CustomLinearLoader.component";
// import Jobs from "./pages/Jobs/Jobs.page";
// import AddCompany from "./pages/Companies/AddCompany.page";
// import Companies from "./pages/Companies/Companies.page";
//import Home from "./pages/home/Home.page";

const Home = lazy(() => import("./pages/home/Home.page"));
const Companies = lazy(() => import("./pages/Companies/Companies.page"));
const AddCompany = lazy(() => import("./pages/Companies/AddCompany.page"));
const Jobs = lazy(() => import("./pages/Jobs/Jobs.page"));
const AddJob = lazy(() => import("./pages/Jobs/AddJob.page"));
const Candidates = lazy(() => import("./pages/Candidates/Candidates.page"));
const AddCandidate = lazy(() => import("./pages/Candidates/AddCandidate.page"));

const App = () => {
  //const themeContext = useContext(ThemeContext);

  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";
  return (
    <div className={appStyles}>
      {<Navbar />}
      {
        <div className="wrapper">
          <Suspense fallback={<CustomLinearLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Companies">
                <Route index element={<Companies />} />
                <Route path="add" element={<AddCompany />} />
              </Route>
              <Route path="/Jobs">
                <Route index element={<Jobs />} />
                <Route path="add" element={<AddJob />} />
              </Route>
              <Route path="/Candidates">
                <Route index element={<Candidates />} />
                <Route path="add" element={<AddCandidate />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      }
    </div>
  );
};

export default App;
