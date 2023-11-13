export type T_Input_Label_Number = {
    headerTitle: string;
    getValue: (s: string | number | undefined) => void;
    placeholder: string;
    max?: number;
    prefix?: boolean;
    suffix?: boolean;
  }