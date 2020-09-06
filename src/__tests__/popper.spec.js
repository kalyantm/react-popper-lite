/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import Popper from '../index'

describe('popper tests', () => {
  it('renders a controlled popper', () => {
    const { getByTestId, getByText } = render(
      // eslint-disable-next-line react/jsx-filename-extension
      <Popper position="topLeft" content="This is inside the popover" isOpen>
        <button type="button">Click Me</button>
      </Popper>
    )
    // Check the document body has the rendered popper
    expect(getByTestId('popper')).toBeInTheDocument()
    // Controlled popper should be open by default
    expect(getByText('This is inside the popover')).toBeVisible()
  })

  it('invokes all the mouse event callbacks correctly', () => {
    const spy1 = jest.fn()
    const spy2 = jest.fn()
    const spy3 = jest.fn()
    const spy4 = jest.fn()

    const { getByText } = render(
      <Popper
        position="topLeft"
        content="This is inside the popover"
        onMouseEnter={spy1}
        onMouseLeave={spy2}
        onOpen={spy3}
        onClose={spy4}
      >
        <button type="button">Click Me</button>
      </Popper>
    )

    fireEvent.mouseEnter(getByText('Click Me'))
    expect(spy1).toBeCalledTimes(1)

    // Expect onOpen to be called as well, mouse enter triggers an open
    expect(spy3).toBeCalledTimes(1)

    fireEvent.mouseLeave(getByText('Click Me'))
    expect(spy2).toBeCalledTimes(1)

    // lly for onClose
    expect(spy4).toBeCalledTimes(1)
  })

  it('invokes all the focus event callbacks correctly', () => {
    const spy1 = jest.fn()
    const spy2 = jest.fn()
    const spy3 = jest.fn()
    const spy4 = jest.fn()

    const { getByText } = render(
      <Popper
        position="topLeft"
        content="This is inside the popover"
        trigger="focus"
        onFocus={spy1}
        onBlur={spy2}
        onOpen={spy3}
        onClose={spy4}
      >
        <button type="button">Click Me</button>
      </Popper>
    )

    fireEvent.focus(getByText('Click Me'))
    expect(spy1).toBeCalledTimes(1)

    // Expect onOpen to be called as well, focus triggers an open
    expect(spy3).toBeCalledTimes(1)

    fireEvent.blur(getByText('Click Me'))
    expect(spy2).toBeCalledTimes(1)

    // lly for onClose
    expect(spy4).toBeCalledTimes(1)
  })

  it('invokes all the click event callbacks correctly', () => {
    const spy1 = jest.fn()
    const spy3 = jest.fn()
    const spy4 = jest.fn()

    const { getByText } = render(
      <Popper
        position="topLeft"
        content="This is inside the popover"
        trigger="click"
        onClick={spy1}
        onOpen={spy3}
        onClose={spy4}
      >
        <button type="button">Click Me</button>
      </Popper>
    )

    fireEvent.click(getByText('Click Me'))
    expect(spy1).toBeCalledTimes(1)

    expect(spy3).toBeCalledTimes(1)

    fireEvent.click(getByText('Click Me'))
    expect(spy1).toBeCalledTimes(2) // Second click on the button

    expect(spy4).toBeCalledTimes(1)
  })

  it('closes the popper when a click on the trigger element is detected', () => {
    const { getByText, getByTestId } = render(
      <Popper
        position="topLeft"
        content="This is inside the popper"
        trigger="click"
      >
        <button type="button">Click Me</button>
      </Popper>
    )

    fireEvent.click(getByText('Click Me'))

    expect(getByTestId('popper')).toBeInTheDocument()

    fireEvent.click(getByText('Click Me'))

    const popperDiv = screen.queryByText('This is inside the popper')
    expect(popperDiv).toBeNull()

    fireEvent.click(getByText('Click Me'))

    expect(getByTestId('popper')).toBeInTheDocument()
  })

  it('shows the arrow if showArrow prop is passed', () => {
    const { getByText, getByTestId } = render(
      <Popper
        position="topLeft"
        content="This is inside the popper"
        trigger="click"
        showArrow
      >
        <button type="button">Click Me</button>
      </Popper>
    )

    fireEvent.click(getByText('Click Me'))

    expect(getByTestId('popper')).toBeInTheDocument()

    expect(getByTestId('popper-arrow')).toBeInTheDocument()
  })

  it('sets the color of the popper correctly if color prop is passed', () => {
    const { getByText, getByTestId } = render(
      <Popper
        position="topLeft"
        content="This is inside the popper"
        trigger="click"
        showArrow
        color="orange"
      >
        <button type="button">Click Me</button>
      </Popper>
    )

    fireEvent.click(getByText('Click Me'))

    expect(getByTestId('popper')).toBeInTheDocument()

    expect(getByTestId('popper')).toHaveStyle('background:orange')

    // Border color should be the same as background => arrow will inherit it and have the same color
    expect(getByTestId('popper')).toHaveStyle('border-color:orange')
    expect(getByTestId('popper-arrow')).toHaveStyle('border-top-color:inherit')
  })
})
