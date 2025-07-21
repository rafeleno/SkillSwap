import { MouseEventHandler } from "react";

export interface IconbuttonProps {
    name: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}