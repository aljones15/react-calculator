import React from 'react'
import { css } from '@emotion/core'
import NumKey from './button'
import * as operators from './constants/operators'

/**
 * @class Calculator
 * @description - provides a basic container for the Calculator
 */

const row = css`display: flex; flex-direction: row; width: 100%;`

class Calculator extends React.PureComponent{
    constructor(props) {
      super();
      this.state = {
          numbers: ['0'],
      }
    }
    lastNumber = () => this.state.numbers[this.state.numbers.length - 1]
    clear = () => this.setState(() => ({ numbers: ['0'] }))
    calculate(op, a, b) {
      const numA = Number(a)
      const numB = Number(b)
      switch(op) {
        case operators.multiply: return numA * numB
        case operators.divide: return numA / numB
        case operators.minus: return numA - numB
        case operators.plus: return numA + numB
        default: {
          console.warn(`unsupported op ${op}`)
          return 0
        }
      }
    }
    equals = () => {
      const { numbers } = this.state;
      const next = numbers.reduce((acc, cur) => {
         // case the current value to a number
         const num = Number(cur)
         // operators like multiply will be Nan
         if (Number.isNaN(num)) {
           // if it is Nan it is an op
           acc.op = cur;
           return acc
         }
         // if there is a last value and a op then we need to perform the operation
         if (acc.last !== null && acc.op) {
           const next = this.calculate(acc.op, acc.last, cur)
           return {op: null, last: next}
         }
         // if there is no op then we set the current value to last
         acc.last = cur
         return acc
      }, {op: null, last: 0});
      this.setState({numbers: [String(next.last)]})
    }
    press = (op) => {
        const { numbers } = this.state;
        if (typeof(op) === typeof(1)) {
              const last = numbers.pop() || '0'
              let next = []
              if (last == '0') {
                next = [...numbers, String(op) ];
              } else {
                next = [...numbers, `${last}${op}`]
              }
              return this.setState({numbers: next})
        }
        switch(op) {
          case operators.clear: {
            return this.clear()
          }
          case operators.equals: {
            return this.equals()
          }
          default: {
            this.setState({
              numbers: [...numbers, op, '0']
            })
          }
        }
    }
    render() {
      return(
        <div css={css`padding: 10px;`}>
          <div css={row}>{this.lastNumber()}</div>
          <div css={row}>
            <NumKey num={7} press={this.press} />
            <NumKey num={8} press={this.press} />
            <NumKey num={9} press={this.press} />
            <NumKey num={operators.multiply} press={this.press} />
          </div>
          <div css={row}>
            <NumKey num={4} press={this.press} />
            <NumKey num={5} press={this.press} />
            <NumKey num={6} press={this.press} />
            <NumKey num={operators.minus} press={this.press} />
          </div>
          <div css={row}>
            <NumKey num={1} press={this.press} />
            <NumKey num={2} press={this.press} />
            <NumKey num={3} press={this.press} />
            <NumKey num={operators.plus} press={this.press} />
          </div>
          <div css={row}>
            <NumKey num={0} press={this.press} />
            <NumKey num={operators.divide} press={this.press} />
            <NumKey num={operators.clear} press={this.press} />
            <NumKey num={operators.equals} press={this.press} />
          </div>
        </div>
      )
    }
}

export default Calculator
