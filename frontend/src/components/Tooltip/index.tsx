import { ReactNode } from 'react'

const Tooltip = ({ text, children }: { text: string; children: ReactNode }) => (
  <div className="tooltip">
    {children}
    <span className="tooltiptext">{text}</span>
  </div>
)

export default Tooltip
