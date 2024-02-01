const torinTroop = [
  {
    dwarfName: 'Balin',
    dwarfWeapon: 'Axe',
    dwarfEmail: 324,
  },
  {
    dwarfName: 'Dvalin',
    dwarfWeapon: 'Axe, Axe',
    dwarfEmail: 299,
  },
  {
    dwarfName: 'Nori',
    dwarfWeapon: 'Hammer',
    dwarfEmail: 387,
  },
];

export const requestDwarwesList = (setDwarves) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => setDwarves(torinTroop), 1500);
  });
};
