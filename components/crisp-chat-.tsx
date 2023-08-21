"use client";

import {useEffect} from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("f28fe6f9-17f0-4b54-a8bd-b2b3500c2f93")
    },[]);

    return null;
}
