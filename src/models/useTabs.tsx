import {useState} from "react";
import {tabs} from "@/types/common";

const useTabs = ()=>{
    const [routes, setRoutes] = useState<tabs[]>([]);
    return {
        routes, setRoutes
    }
}
export default useTabs;