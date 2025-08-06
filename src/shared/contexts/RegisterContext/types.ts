import { IOption } from "@uiComponents/Dropdown/Dropdown.types";
import React, { useState } from "react"

export type TRegisterContextProps = {
    children: React.ReactNode;
}

export type TRegisterContext = {
    stepOneStates: TStepOneStates,
    stepTwoStates: TStepTwoStates,
    stepThreeStates: TStepThreeStates,
}

export type TStepOneStates = Record<string, ReturnType<typeof useState<string>>>;

export type TStepTwoStates = {
    nameState: ReturnType<typeof useState<string>>;
    dateState: ReturnType<typeof useState<Date | null>>;
    genderState: ReturnType<typeof useState<string>>;
    locationState: ReturnType<typeof useState<string>>;
    toLearnState: ReturnType<typeof useState<string[]>>;
    toSabLearnState: ReturnType<typeof useState<string[]>>;
}

export type TStepThreeStates = {
    selectedCategoryState: ReturnType<typeof useState<IOption | null>>;
    selectedSubcategoryState: ReturnType<typeof useState<IOption | null>>;
    categoriesState: ReturnType<typeof useState<IOption[]>>;
    subcategoriesState: ReturnType<typeof useState<IOption[]>>;
    filesState: ReturnType<typeof useState<any[]>>,
    dragActiveState: ReturnType<typeof useState<boolean>>
}
