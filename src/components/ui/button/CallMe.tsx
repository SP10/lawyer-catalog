import PhoneIcon from '@mui/icons-material/Phone';
import { Fab } from '@mui/material';
import { Maybe } from '../../../../generated/graphql';

export default function CallMe({ phoneNumber }: { phoneNumber?: Maybe<string> }) {
    if (!phoneNumber) return;

    return (
        <Fab 
            color="primary" 
            aria-label="Зателефонувати" 
            style={{
                position: 'fixed',
                bottom: 20, // distance from the bottom
                right: 20,  // distance from the right
                zIndex: 1000,  // to make sure it stays on top of other elements
                animation: 'pulse 1.5s infinite'  // анімація пульсації
            }} 
            href={`tel:${phoneNumber}`}
        >
            <PhoneIcon />
        </Fab>
    );
}
