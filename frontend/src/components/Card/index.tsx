import { FC, HTMLAttributes } from 'react'

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Card: FC<IProps> = ({ children, props }) => {
  return (
    <div className={'card'} {...props}>
      {children}
    </div>
  )
}

export default Card
