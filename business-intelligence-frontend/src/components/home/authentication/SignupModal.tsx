import { Typography } from '@material-ui/core'
import React from 'react'
import { BaseModal } from '../../../ui/BaseModal';

interface Props {
    isOpen: boolean,
    handleClose: () => void
}

export const SignupModal: React.FC<Props> = (props: Props) => {
    
    const { isOpen, handleClose } = props;

    return (
        <div>
           <BaseModal isOpen={isOpen} handleClose={handleClose}>
            <Typography>Sign up</Typography>
            </BaseModal>
        </div>
    )
}
