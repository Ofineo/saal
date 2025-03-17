import { v4 as uuidv4 } from 'uuid';

export const seedLocalStorage = () => {
  const idOne = uuidv4();
  const idTwo = uuidv4();
  const idThree = uuidv4();
  const idFour = uuidv4();
  const idFive = uuidv4();
  const idSix = uuidv4();
  const idSeven = uuidv4();
  const idEight = uuidv4();
  const idNine = uuidv4();
  const idTen = uuidv4();

  // Initial objects
  const initialObjects = [
    {
      id: idOne,
      name: 'Desktop Computer',
      description:
        'A high-performance desktop computer used for software development.',
      type: 'Computer',
      relations: [idTwo, idThree],
    },
    {
      id: idTwo,
      name: 'Laptop',
      description: 'A portable laptop used for remote work and presentations.',
      type: 'Computer',
      relations: [idOne],
    },
    {
      id: idThree,
      name: 'Development Server',
      description:
        'A server used to host development environments and testing tools.',
      type: 'Server',
      relations: [idOne, idFour],
    },
    {
      id: idFour,
      name: 'Software Engineer',
      description:
        'A software engineer working on developing applications and maintaining servers.',
      type: 'Human',
      relations: [idThree],
    },
    {
      id: idFive,
      name: 'Mechanical Keyboard',
      description:
        'A mechanical keyboard used by developers for better typing experience.',
      type: 'Keyboard',
      relations: [idOne],
    },
    {
      id: idSix,
      name: 'Server Rack',
      description:
        'A rack used to store and organize multiple servers in a data center.',
      type: 'Server',
      relations: [idThree],
    },
    {
      id: idSeven,
      name: 'Office Chair',
      description:
        'An ergonomic office chair designed for long hours of work at the desk.',
      type: 'Furniture',
      relations: [idOne, idFour],
    },
    {
      id: idEight,
      name: 'Wi-Fi Router',
      description:
        'A router used to provide wireless internet access to the office network.',
      type: 'Networking',
      relations: [idOne, idThree],
    },
    {
      id: idNine,
      name: 'External Monitor',
      description:
        'An external monitor for extended desktop space, improving productivity.',
      type: 'Computer',
      relations: [idOne],
    },
    {
      id: idTen,
      name: 'Cloud Storage',
      description:
        'A cloud storage service used to store files and back up development data.',
      type: 'Server',
      relations: [idThree],
    },
  ];

  const objectsString = JSON.stringify(initialObjects);

  localStorage.setItem('objects', objectsString);
};

export const clearLocalStorage = () => {
  localStorage.removeItem('objects');
};

export const isLocalStorageSeeded = (): boolean => {
  return !!localStorage.getItem('objects');
};

export const loadObjectsFromLocalStorage = () => {
  try {
    const storedObjects = localStorage.getItem('objects');
    if (storedObjects) {
      return JSON.parse(storedObjects);
    }
    return [];
  } catch (error) {
    console.error('Error loading objects from local storage:', error);
    return [];
  }
};

export const runSeedScript = () => {
  clearLocalStorage();
  seedLocalStorage();

  const seedingSucess = isLocalStorageSeeded();
  if (seedingSucess) {
    console.log('Seeding successful!');
  } else {
    console.error('Seeding failed!');
  }
};
