import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
  useEffect,
} from 'react'
import { useOutsideClick } from '@/hooks/useClickOutside'

const Modal = ({
  show,
  children,
  title,
  setShow,
}: {
  show: boolean
  children: ReactNode
  title: string
  setShow: Dispatch<SetStateAction<boolean>>
}) => {
  const ModalRef = useRef<any>(null)

  useOutsideClick(ModalRef, () => setShow(false), [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShow(false)
      }
    }

    if (show) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [show, setShow])

  return (
    <div className={`modal ${show ? 'show modal-show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
        </div>
        <div className="modal-body" ref={ModalRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
