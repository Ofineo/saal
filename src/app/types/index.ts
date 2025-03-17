type MakePropsOptional<T, K extends keyof T> = {
  [P in keyof T]?: T[P];
} & Required<Pick<T, K>>;

export type EditObj = MakePropsOptional<Obj, 'id'>;

export interface Obj {
  id: string;
  name: string;
  description: string;
  type: ObjectType;
  relations: string[];
}

export interface Relation {
  id: string;
  name: string;
}

export interface DataObject {
  id: string;
  name: string;
  description: string;
  type: string;
  relations: string[];
}

export enum ObjectType {
  Desk = 'desk',
  Computer = 'computer',
  Keyboard = 'keyboard',
  Server = 'server',
  Human = 'human',
}

export interface AppContextType {
  objects: Obj[];
  seedObjects: () => void;
  addObject: (obj: Obj) => Promise<void>;
  updateObject: (obj: Obj) => Promise<void>;
  deleteObject: (id: string) => Promise<void>;
  getObjectById: (id: string) => Obj | undefined;
  loading: boolean;
  error: string | null;
}
