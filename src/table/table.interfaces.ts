/**
 * MenuTable
 */
export interface ActionMenuTable {
  id: string;
  action: (el?: any) => void;
  label: string;
  icon?: string;
  condition?: (el?: any) => boolean;
}
