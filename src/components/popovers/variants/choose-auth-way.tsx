import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverVariantProps } from '../popover'
import { PopoverList, PopoverListItem } from '../shared-components'

export const ChooseAuthWayPopup: React.FC<PopoverVariantProps> = ({ onClose }) => {
  return (
    <Popover width={'100%'} top={60} onClose={onClose}>
      <PopoverList>
        <PopoverListItem>
          <Link to='/login'>Войти</Link>
        </PopoverListItem>
        <PopoverListItem>
          <Link to='/registration'>Создать аккаунт</Link>
        </PopoverListItem>
      </PopoverList>
    </Popover>
  )
}
