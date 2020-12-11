import { Dialog } from '@material-ui/core'
import React from 'react'

interface Props {
    isOpen: boolean,
    children: React.ReactElement
    handleClose: () => void
    isFullscreeen?: boolean
}

export const BaseModal: React.FC<Props> = (props: Props) => {
    const { isOpen, handleClose, isFullscreeen } = props

    return (
        <Dialog fullScreen={isFullscreeen} open={isOpen} onClose={handleClose}>
            {props.children}
        </Dialog>
    )
}
