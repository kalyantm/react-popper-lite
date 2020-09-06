/* eslint-disable no-unused-expressions */
import * as React from 'react'
import classNames from 'classnames/bind'

import Portal from './Portal'
import { getPopperStyles, getUpdatedPosition } from './utils/position_helpers'
import measureNode from './utils/measure_node'
import { ArrowPositions } from './types'
import useWindowSize from './hooks/useWindowSize'

import styles from './index_styles.scss'

const cStyles = classNames.bind(styles)

export type Props = {
  position: ArrowPositions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any>
  content: React.ReactNode
  isOpen?: boolean
  trigger?: 'click' | 'mouse' | 'focus'
  onOpen?: () => void
  onClose?: () => void
  className?: string
  color?: string
  contentStyle?: React.CSSProperties
  showArrow?: boolean
  autoAdjustPosition?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onClick?: () => void
}

const Popper = ({
  position,
  children,
  content,
  onOpen,
  onClose,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  contentStyle = {},
  trigger = 'mouse',
  color = 'black',
  isOpen = false,
  showArrow = false,
  autoAdjustPosition = false,
}: Props): JSX.Element => {
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  const [popperPosition, setPopperPosition] = React.useState<string>(position)

  const [popoverStyles, setPopoverStyles] = React.useState<React.CSSProperties>(
    {
      position: 'absolute',
      maxWidth: 'calc(100% - 32px)',
      maxHeight: 'calc(100% - 32px)',
      minHeight: '16px',
      minWidth: '16px',
      padding: '4px 8px',
      borderRadius: '4px',
      background: color,
      border: color,
      color: '#fff',
      ...contentStyle,
    }
  )

  const [openStatus, setOpenStatus] = React.useState(isOpen)

  const nodeRef = React.useRef<HTMLDivElement>(null)

  const size = useWindowSize()

  const [node, setNode] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const nodeDimensions = measureNode(
      <div ref={nodeRef} style={{ padding: '4px 8px' }}>
        {content}
      </div>
    )
    setNode(nodeDimensions)
  }, [content])

  React.useEffect(() => {
    if (triggerRef && triggerRef.current) {
      if (autoAdjustPosition && size.width && size.height) {
        const updatedPosition = getUpdatedPosition(
          popperPosition,
          triggerRef.current,
          { width: node.width, height: node.height },
          { width: size.width, height: size.height }
        )
        setPopperPosition(updatedPosition)
      }

      const popperPositionStyle = getPopperStyles(
        popperPosition,
        triggerRef.current,
        {
          height: node.height,
          width: node.width,
        }
      )

      setPopoverStyles((pStyles: React.CSSProperties) => ({
        ...pStyles,
        ...popperPositionStyle,
      }))
    }
  }, [popperPosition, size, node, autoAdjustPosition])

  const handleOpen = () => {
    setOpenStatus(true)
    if (onOpen) {
      onOpen()
    }
  }

  const handleClose = () => {
    setOpenStatus(false)
    if (onClose) {
      onClose()
    }
  }

  const handleClick = () => {
    openStatus ? handleClose() : handleOpen()
    if (onClick) {
      onClick()
    }
  }

  const handleMouseEnter = () => {
    handleOpen()
    if (onMouseEnter) {
      onMouseEnter()
    }
  }

  const handleMouseLeave = () => {
    handleClose()
    if (onMouseLeave) {
      onMouseLeave()
    }
  }

  const handleFocus = () => {
    handleOpen()
    if (onFocus) {
      onFocus()
    }
  }

  const handleBlur = () => {
    handleClose()
    if (onBlur) {
      onBlur()
    }
  }

  const detectOutsideClick = (event: MouseEvent) => {
    if (
      event.target instanceof Element &&
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target)
    ) {
      handleClose()
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', detectOutsideClick)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', detectOutsideClick)
    }
  })

  const [pos, orientation] = popperPosition.split(/(?=[A-Z])/)

  return (
    <div className={styles.popover}>
      <div ref={triggerRef}>
        {React.cloneElement(children, {
          ...(trigger === 'click' && { onClick: handleClick }),
          ...(trigger === 'mouse' && {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
          }),
          ...(trigger === 'focus' && {
            onFocus: handleFocus,
            onBlur: handleBlur,
          }),
        })}
      </div>
      {openStatus ? (
        <Portal>
          <div
            data-testid="popper"
            style={popoverStyles}
            ref={popoverRef}
            className={styles['popover-content']}
          >
            {content}
            {showArrow ? (
              <span
                data-testid="popper-arrow"
                className={cStyles(
                  styles['arrow-placement'],
                  styles[`arrow-placement-${pos}`],
                  styles[`arrow-orientation-${orientation.toLowerCase()}`]
                )}
              />
            ) : null}
          </div>
        </Portal>
      ) : null}
    </div>
  )
}

export default Popper
