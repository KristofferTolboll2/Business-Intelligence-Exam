import { Dialog } from '@material-ui/core'
import React from 'react'

interface Props {
    isOpen: boolean,
    children: React.ReactElement
    handleClose: () => void
}

export const BaseModal: React.FC<Props> = (props: Props) => {
    const { isOpen, handleClose } = props
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            {props.children}
        </Dialog>
    )
}
