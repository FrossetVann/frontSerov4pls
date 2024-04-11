import {Route, Routes} from "react-router-dom";
import {Main} from "./pages/Main";
import {Auth} from "./pages/Auth";
import {NewNew} from "./pages/NewNew";
import Event from "./pages/Event";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/login' element={<Auth/>}/>
        <Route path='/newnew' element={<NewNew/>}  />
        <Route path='/event/:event_id' element={<Event/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
