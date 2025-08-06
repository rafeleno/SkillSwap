import { IOption } from "@uiComponents/Dropdown/Dropdown.types";
import { createContext, useState } from "react";
import { TRegisterContext, TRegisterContextProps } from "./types";

export const RegisterContext = createContext<TRegisterContext>(undefined);

export const RegisterContextProvider = ({ children }: TRegisterContextProps) => {


    return (
        <RegisterContext.Provider
            value={{
                stepOneStates: {
                    passwordState: useState(''),
                    emailState: useState('')
                },
                stepTwoStates: {
                    nameState: useState<string>(''),
                    dateState: useState<Date | null>(null),
                    genderState: useState<string>(''),
                    locationState: useState<string>(''),
                    toLearnState: useState<string[]>([]),
                    toSabLearnState: useState<string[]>([])
                },
                stepThreeStates: {
                    selectedCategoryState: useState<IOption | null>(null),
                    selectedSubcategoryState: useState<IOption | null>(null),
                    categoriesState: useState<IOption[]>([]),
                    subcategoriesState: useState<IOption[]>([]),
                    filesState: useState([]),
                    dragActiveState: useState(false)
                }
            }
            }
        >
            {children}
        </RegisterContext.Provider >
    );
}