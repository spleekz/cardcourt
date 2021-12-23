import React from 'react'
import styled from 'styled-components'

interface Props {
  src?: string
  size: number
}

export const Avatar: React.FC<Props> = ({
  src = 'https://img.spim.ru/kingsilk/51651_2.jpg',
  size,
}) => {
  return <AvatarImage src={src} size={size} alt='' />
}

const AvatarImage = styled.img<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  object-fit: cover;
  border-radius: 50%;
  align-self: center;
  background-color: ${(props) => !props.src && '#ff0000'};
`
