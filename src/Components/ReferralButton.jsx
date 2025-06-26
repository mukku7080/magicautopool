import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { FiUsers, FiShare2 } from 'react-icons/fi';
import ReferralModal from './ReferralModal';

const ReferralButton = ({ 
    variant = 'solid', 
    colorScheme = 'blue', 
    size = 'md',
    leftIcon = <FiUsers />,
    children = 'Refer & Earn',
    ...props 
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                variant={variant}
                colorScheme={colorScheme}
                size={size}
                leftIcon={leftIcon}
                onClick={onOpen}
                {...props}
            >
                {children}
            </Button>
            
            <ReferralModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

// Alternative compact version for nav bars or small spaces
export const ReferralIconButton = ({ 
    variant = 'ghost', 
    colorScheme = 'blue', 
    size = 'sm',
    ...props 
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                variant={variant}
                colorScheme={colorScheme}
                size={size}
                leftIcon={<FiShare2 />}
                onClick={onOpen}
                {...props}
            >
                Share
            </Button>
            
            <ReferralModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default ReferralButton;