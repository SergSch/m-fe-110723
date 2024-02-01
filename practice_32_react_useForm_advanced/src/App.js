import { useEffect, useState } from 'react';
import './App.css';
import { requestDwarwesList } from './mocks/dwarwes';
import DwarfForm from './components/dwarfForm/DwarfForm';
import DwarwesList from './components/DwarwesList/DwarwesList';

function App() {
  const [dwarves, setDwarves] = useState([]);

  useEffect(() => {
    requestDwarwesList(setDwarves);
  }, []);

  const handleAddUser = (newDwarf) => {
    setDwarves([...dwarves, newDwarf]);
  };
  return (
    <>
      <div className="App">
        <h2>
          Welcome, Stranger! Torin the OakShield invites you to join his voyage
          to Lonely Mountain! Please, fill this form ASAP!
        </h2>
        <DwarfForm handleAddUser={handleAddUser} />
        <DwarwesList dwarves={dwarves} />
      </div>
    </>
  );
}

export default App;
