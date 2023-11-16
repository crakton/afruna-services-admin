export interface IItemPicker {
    items: any[];
    placeholder: string;
    getSelected: (value: string | number) => void;
    headerTitle?: string | undefined;
    contentClassName?: string
    triggerClassName?: string
}
