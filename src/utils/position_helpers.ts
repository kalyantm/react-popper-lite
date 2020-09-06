import * as React from 'react'

export const getMirrorPos = (pos: string): string => {
  switch (pos) {
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      return pos
  }
}

export const spaceOnRight = (
  triggerElement: HTMLDivElement,
  windowElement: { width: number; height: number }
): number => {
  return (
    windowElement.width -
    (triggerElement.getBoundingClientRect().left +
      triggerElement.getBoundingClientRect().width)
  )
}

export const spaceOnLeft = (triggerElement: HTMLDivElement): number => {
  return triggerElement.getBoundingClientRect().left
}

export const spaceOnTop = (triggerElement: HTMLDivElement): number => {
  return triggerElement.getBoundingClientRect().top
}

export const spaceOnBottom = (
  triggerElement: HTMLDivElement,
  windowElement: { width: number; height: number }
): number => {
  return (
    windowElement.height -
    (triggerElement.getBoundingClientRect().top +
      triggerElement.getBoundingClientRect().height)
  )
}

export const isPositionInViewPort = (
  pos: string,
  triggerElement: HTMLDivElement,
  popoverElement: { width: number; height: number },
  windowElement: { width: number; height: number }
): boolean => {
  switch (pos) {
    case 'right':
      return (
        spaceOnRight(triggerElement, windowElement) > popoverElement.width + 16
      )
    case 'left':
      return spaceOnLeft(triggerElement) > popoverElement.width + 16

    case 'top':
      return spaceOnTop(triggerElement) > popoverElement.height + 16

    case 'bottom':
      return (
        spaceOnBottom(triggerElement, windowElement) >
        popoverElement.height + 16
      )
    default:
      return true
  }
}

const getTransform = (
  pos: string,
  orientation: string,
  popoverElement: { width: number; height: number },
  triggerCoords: DOMRect | ClientRect
  // eslint-disable-next-line consistent-return
) => {
  switch (orientation.toLowerCase()) {
    case 'center':
      if (pos === 'top' || pos === 'bottom') {
        return popoverElement.width > triggerCoords.width
          ? `translateX(-${(popoverElement.width - triggerCoords.width) / 2}px)`
          : `translateX(${(triggerCoords.width - popoverElement.width) / 2}px)`
      }
      return popoverElement.height > triggerCoords.height
        ? `translateY(-${(popoverElement.height - triggerCoords.height) / 2}px)`
        : `translateY(${(triggerCoords.height - popoverElement.height) / 2}px)`

    case 'right':
      return popoverElement.width > triggerCoords.width
        ? `translateX(-${popoverElement.width - triggerCoords.width}px)`
        : `translateX(-${triggerCoords.width - popoverElement.width}px)`

    case 'top':
      return `translateY(0)`
    case 'bottom':
      return popoverElement.height > triggerCoords.height
        ? `translateY(-${popoverElement.height - triggerCoords.height}px)`
        : `translateY(${triggerCoords.height - popoverElement.height}px)`

    // Should never come here
    default:
      return ''
  }
}

const positionAtBottom = (
  triggerElement: HTMLDivElement,
  popoverElement: { height: number; width: number },
  orientation: string
) => {
  const triggerCoords = triggerElement.getBoundingClientRect()
  return {
    top: triggerCoords.top + triggerCoords.height,
    left: triggerCoords.left,
    transform: getTransform(
      'bottom',
      orientation,
      popoverElement,
      triggerCoords
    ),
    marginTop: 16,
  }
}

const positionAtTop = (
  triggerElement: HTMLDivElement,
  popoverElement: { height: number; width: number },
  orientation: string
): React.CSSProperties => {
  const triggerCoords = triggerElement.getBoundingClientRect()
  return {
    top: triggerCoords.top - popoverElement.height,
    left: triggerCoords.left,
    transform: getTransform('top', orientation, popoverElement, triggerCoords),
    marginTop: '-16px',
  }
}

const positionAtLeft = (
  triggerElement: HTMLDivElement,
  popoverElement: { height: number; width: number },
  orientation: string
) => {
  const triggerCoords = triggerElement.getBoundingClientRect()
  return {
    top: triggerCoords.top,
    left: triggerCoords.left - popoverElement.width,
    transform: getTransform('left', orientation, popoverElement, triggerCoords),
    marginLeft: '-16px',
  }
}

const positionAtRight = (
  triggerElement: HTMLDivElement,
  popoverElement: { height: number; width: number },
  orientation: string
) => {
  const triggerCoords = triggerElement.getBoundingClientRect()
  return {
    top: triggerCoords.top,
    left: triggerCoords.left + triggerCoords.width,
    transform: getTransform(
      'right',
      orientation,
      popoverElement,
      triggerCoords
    ),
    marginLeft: 16,
  }
}
export const getUpdatedPosition = (
  position: string,
  triggerElement: HTMLDivElement,
  popoverElement: { width: number; height: number },
  windowElement: { width: number; height: number }
): string => {
  const splitPosition = position.split(/(?=[A-Z])/)
  let pos = splitPosition[0]
  let orientation = splitPosition[1].toLowerCase()

  const retainPosition = isPositionInViewPort(
    pos,
    triggerElement,
    popoverElement,
    windowElement
  )

  const retainOrientation = isPositionInViewPort(
    getMirrorPos(orientation),
    triggerElement,
    popoverElement,
    windowElement
  )

  if (!retainPosition) {
    pos = getMirrorPos(pos)
  }

  if (!retainOrientation) {
    orientation = getMirrorPos(orientation)
  }

  return `${pos}${orientation[0].toUpperCase() + orientation.slice(1)}`
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPopperStyles = (
  position: string,
  triggerElement: HTMLDivElement,
  popoverElement: { width: number; height: number }
  // eslint-disable-next-line consistent-return
) => {
  const [pos, orientation] = position.split(/(?=[A-Z])/)

  switch (pos) {
    case 'top':
      return positionAtTop(triggerElement, popoverElement, orientation)
    case 'bottom':
      return positionAtBottom(triggerElement, popoverElement, orientation)
    case 'left':
      return positionAtLeft(triggerElement, popoverElement, orientation)
    case 'right':
      return positionAtRight(triggerElement, popoverElement, orientation)
    // Should never come here
    default:
      return ''
  }
}
