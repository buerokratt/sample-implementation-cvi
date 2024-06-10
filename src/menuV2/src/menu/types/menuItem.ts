
export  interface TranslatedLabel {
  [lang: string] : string;
}

export interface MenuItem {
  id?: string;
  label: TranslatedLabel;
  path?: string;
  target?: '_blank' | '_self';
  children?: MenuItem[];
  hidden?: boolean;
}
