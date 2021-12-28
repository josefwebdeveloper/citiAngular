
export interface Language {
  name: string;
  native: string;
  code: string;
}

export interface Continent {
  code: string;
  name: string;
}

export interface State {
  name: string;
  code: string;
}

export interface Country {
  name: string;
  emoji: string;
  code: string;
  capital: string;
  currency: string;
  phone: string;
  languages: Language[];
  continent: Continent;
  states: State[];
}





