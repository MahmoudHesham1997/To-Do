
import { AlertColor } from '@mui/material';
import { useState } from 'react';


/**
 * useSnackbar Hook made to share repeated logic of displaying 
 * a message depending on status (open or closing or even the message content and type)
 */

export function useSnackbar() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<AlertColor>("error");


    const showSnackbar = (type: AlertColor, message: string) => {
        setMessage(message);
        setType(type);
        setOpen(true);
    };

    const closeSnackbar = () => {
        setOpen(false);
    };


    return {
        open, 
        showSnackbar, 
        closeSnackbar,
        message,
        type,
    }

}