import React from 'react';

import PatientIdLayout from "@/pages/BL/components/PatientLayout";
import BillList from "@/pages/SF/components/bill/billList";


const Sf = () => {


        return (
            <PatientIdLayout
                marginLeft={0}
            >
                <BillList />
            </PatientIdLayout>
        );
    }
;

export default Sf;
