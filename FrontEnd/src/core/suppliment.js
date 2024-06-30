import React from 'react'
import { useState } from "react";

function suppliment() {
    const [hasAlerted, setHasAlerted] = useState(false);
    
    const handleClick = () => {
        if (!hasAlerted) {
            alert("This alert will only show up once.");
            setHasAlerted(true);
        }
    };

}

export default suppliment;