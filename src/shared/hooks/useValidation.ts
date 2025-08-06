import { useEffect, useState } from "react";

export const useValidation = (
    conditions: boolean[]
) => {
    const [isValid, setValid] = useState<boolean>();

    const getValid = () => {
        return !conditions.some((condition) => {
            return !condition;
        });
    }

    useEffect(() => {
        setValid(getValid())
    }, conditions)

    return isValid;
}