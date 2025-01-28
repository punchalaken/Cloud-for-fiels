import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./components/SignupForm/SignupPage";
import GeneralLayout from "./Layout/GeneralLayout.js";

// import ru from '../node_modules/moment/locale/ru.js';
import moment from 'moment-with-locales-es6';
import Account from "./components/Account/Account";


moment.locale('ru')


function App() {

  return (
    <>
      

      <Routes>
        <Route path="/" element={<GeneralLayout />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/disk" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
