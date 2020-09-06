/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PlusCircle, Delete } from 'react-feather'

import Popper from '../index'

import styles from './popper_stories_styles.scss'

export const PopperPositions = () => {
  return (
    <div className={styles['popper-position-template']}>
      <div className={styles['popper-position-top']}>
        <Popper position="topLeft" content="I am inside the popper!">
          <button type="button">TL</button>
        </Popper>

        <Popper position="topCenter" content="I am inside the popper!">
          <button type="button">TC</button>
        </Popper>

        <Popper position="topRight" content="I am inside the popper!">
          <button type="button">TR</button>
        </Popper>
      </div>

      <div className={styles['popper-horizontal-position-wrapper']}>
        <div className={styles['popper-position-left']}>
          <Popper position="leftTop" content="I am inside the popper!">
            <button type="button">LT</button>
          </Popper>

          <Popper position="leftCenter" content="I am inside the popper!">
            <button type="button">LC</button>
          </Popper>

          <Popper position="leftBottom" content="I am inside the popper!">
            <button type="button">LB</button>
          </Popper>
        </div>
        <div className={styles['popper-position-right']}>
          <Popper position="rightTop" content="I am inside the popper!">
            <button type="button">RT</button>
          </Popper>

          <Popper position="rightCenter" content="I am inside the popper!">
            <button type="button">RC</button>
          </Popper>

          <Popper position="rightBottom" content="I am inside the popper!">
            <button type="button">RB</button>
          </Popper>
        </div>
      </div>

      <div className={styles['popper-position-bottom']}>
        <Popper position="bottomLeft" content="I am inside the popper!">
          <button type="button">BL</button>
        </Popper>

        <Popper position="bottomCenter" content="I am inside the popper!">
          <button type="button">BC</button>
        </Popper>

        <Popper position="bottomRight" content="I am inside the popper!">
          <button type="button">BR</button>
        </Popper>
      </div>
    </div>
  )
}

export const PopperTriggers = () => {
  return (
    <div className={styles['popper-position-template']}>
      <div className={styles['popper-triggers']}>
        <Popper
          position="topCenter"
          content="I am inside the popper!"
          trigger="mouse"
        >
          <button type="button">HOVER OVER ME</button>
        </Popper>

        <Popper
          position="topCenter"
          content="I am inside the popper!"
          trigger="focus"
        >
          <button type="button">FOCUS ME</button>
        </Popper>

        <Popper
          position="topCenter"
          content="I am inside the popper!"
          trigger="click"
        >
          <button type="button">CLICK ME</button>
        </Popper>
      </div>
    </div>
  )
}

export const ControlledPopper = () => {
  const notifyOpen = () =>
    toast.dark('You opened the popper. Nice :)', {
      hideProgressBar: true,
      autoClose: 2500,
    })

  const notifyClose = () =>
    toast.dark('Closed popper! Bye for now :|', {
      hideProgressBar: true,
      autoClose: 2500,
    })

  return (
    <div className={styles['popper-position-template']}>
      <div className={styles['popper-controlled']}>
        <Popper
          position="topCenter"
          content="I am inside the popper!"
          onOpen={notifyOpen}
          onClose={notifyClose}
          trigger="click"
        >
          <button type="button">CONTROLLED (CLICK ME)</button>
        </Popper>
        <ToastContainer />
      </div>
    </div>
  )
}

export const CustomPoppers = () => {
  return (
    <div className={styles['popper-position-template']}>
      <div className={styles['popper-triggers']}>
        <Popper position="topCenter" content="I am inside the popper!">
          <PlusCircle size={48} color="#3f50b5" />
        </Popper>

        <Popper
          position="topCenter"
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ textDecoration: 'underline', padding: '12px 0' }}>
                <strong>Are you sure you want to delete?</strong>
              </span>
              <span style={{ textDecoration: 'italic', paddingBottom: 12 }}>
                Some more content here.
              </span>
            </div>
          }
        >
          <Delete size={48} color="#f44336" />
        </Popper>

        <Popper
          position="topCenter"
          content="I am inside the popper!"
          showArrow
        >
          <button type="button">ARROWED</button>
        </Popper>
      </div>
    </div>
  )
}

export const PopperColors = () => {
  return (
    <div className={styles['popper-position-template']}>
      <div className={styles['popper-colors']}>
        <Popper
          position="topCenter"
          content="Chill as a lime."
          color="lime"
          showArrow
        >
          <button type="button">LIME</button>
        </Popper>

        <Popper
          position="topCenter"
          content="Dashing, aint I?"
          color="hotpink"
          showArrow
        >
          <button type="button">HOTPINK</button>
        </Popper>

        <Popper
          position="topCenter"
          content="Remind you of your pool yet?"
          color="aqua"
          showArrow
        >
          <button type="button">AQUA</button>
        </Popper>

        <Popper
          position="topCenter"
          content="Uh oh, mossy green content."
          color="#8a9a5b"
          showArrow
        >
          <button type="button">#8A9A5B</button>
        </Popper>

        <Popper
          position="topCenter"
          content="Annoying Orange nostalgia."
          color="rgb(242,133,0)"
          showArrow
        >
          <button type="button">RGB(242,133,0)</button>
        </Popper>
      </div>
    </div>
  )
}
