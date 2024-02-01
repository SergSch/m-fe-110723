import React from 'react';

const DwarwesList = ({ dwarves }) => {
  console.log(dwarves);
  return (
    <>
      {dwarves.map((dwarf) => (
        <div key={dwarf.dwarfName + dwarf.dwarfEmail}>
          <p>{dwarf.dwarfName}</p>
          <p>{dwarf.dwarfWeapon}</p>
          <p>{dwarf.dwarfEmail}</p>
        </div>
      ))}
    </>
  );
};

export default DwarwesList;

// 8. Освежим в памяти работу с эффектами. Нужно создать компонент `DwarwesList`, который будет рендерить список гномов-участников отряда Торина. Элементы рендерим в виде `div`, где будут данные гномов: параграфы с именем, возрастом и оружием. Для "запроса" списка у нас есть специальная функция `requestDwarwesList`, в файле `/mocks/dwarwes.js` - она имитирует запрос с бэка. "Запросить" список гномов нужно при монтировании компонента. И отрендерить этот компонент под формой подачи заявки на участие в путешествии.
