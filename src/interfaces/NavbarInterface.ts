import { type ReactNode } from 'react';

export interface NavItem {
    to: string;
    label: string;
    onlyMember?: boolean;
    onlyCoreTeam?: boolean;
    onlyNotRegistered?: boolean;
    dropdownItems?: DropdownItem[];
    newTab?: boolean;
}

export interface DropdownItem {
    to: string;
    label: string;
    icon?: ReactNode;
    description?: string;
    onlyCoreTeam?: boolean;
    onlyMember?: boolean;
    newTab?: boolean;
}