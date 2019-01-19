import React from 'react'
import * as Operators from './constants/operators'
import { css } from '@emotion/core'

function getChar(num) {
  switch(num) {
    case Operators.multiply: {
      return 'X'
    }
    case Operators.minus: {
      return '-'
    }
    case Operators.plus: {
      return '+'
    }
    case Operators.divide: {
      return '/'
    }
    default:
      return num
  }
}

const style = css`
  width: 50px;
  height: 50px;
  background-color: grey
`
export function NumKey({num, press}) {
  const displayKey = getChar(num)
  return(
     <button css={style} onClick={function() { return press(num) }}>{displayKey}</button>
  )
}

export default NumKey
