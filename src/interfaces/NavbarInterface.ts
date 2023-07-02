import { type ReactNode } from 'react';

export interface NavItem {
    to: string;
    label: string;
    onlyMember?: boolean;
    onlyNotRegisterd?: boolean;
    dropdownItems?: DropdownItem[];
    newTab?: boolean;
}

export interface DropdownItem {
    to: string;
    label: string;
    icon?: ReactNode;
    description?: string;
    onlyMember?: boolean;
    newTab?: boolean;
}