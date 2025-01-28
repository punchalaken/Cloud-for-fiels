import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface NavBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}