// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {seconds: 1500, timerStarting: false, initialTimer: 25}

  componentDidMount = () => {
    const {timerStarting} = this.state
  }

  ticking = () => {
    const {seconds} = this.state
    if (seconds !== 0) {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    } else {
      this.setState({seconds: 0, timerStarting: false})
    }
  }

  resetting = () => {
    const {initialTimer} = this.state
    this.setState({seconds: initialTimer * 60, timerStarting: false})
    clearInterval(this.timerId)
  }

  startstop = () => {
    const {timerStarting} = this.state
    this.setState(prevState => ({
      timerStarting: !prevState.timerStarting,
    }))
    const startingTimer = timerStarting
      ? clearInterval(this.timerId)
      : (this.timerId = setInterval(this.ticking, 1000))
  }

  increasingTimer = () => {
    const {timerStarting} = this.state
    if (timerStarting === false) {
      this.setState(prevState => ({
        initialTimer: prevState.initialTimer + 1,
        seconds: prevState.seconds + 1 * 60,
      }))
    }
  }

  decreasingTimer = () => {
    const {seconds, timerStarting} = this.state
    if (seconds !== 0 && timerStarting === false) {
      this.setState(prevState => ({
        initialTimer: prevState.initialTimer - 1,
        seconds: prevState.seconds - 1 * 60,
      }))
    }
  }

  render() {
    const {seconds, timerStarting, initialTimer} = this.state

    const displayedMinutes = Math.floor(seconds / 60)

    const displayedSeconds = seconds - displayedMinutes * 60

    return (
      <div className="background-card">
        <h1>Digital Timer</h1>
        <div className="timer-box-container">
          <div className="timer-background">
            <div className="timer-style">
              <h1 className="timer-display-style">
                {displayedMinutes.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
                :
                {displayedSeconds.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </h1>
              <p className="timer-running-status-style">
                {timerStarting ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="buttons-container">
            <div className="start-reset-button-container">
              <button
                className="button-style"
                type="button"
                onClick={this.startstop}
              >
                <img
                  className="logo-style"
                  alt={timerStarting ? 'pause icon' : 'play icon'}
                  src={
                    timerStarting
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                />
                {timerStarting ? 'Pause' : 'Start'}
              </button>
              <button
                className="button-style"
                type="button"
                onClick={this.resetting}
              >
                <img
                  className="logo-style"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                Reset
              </button>
            </div>
            <p className="set-timer-limit-style">Set Timer Limit</p>
            <div className="timer-setting-container">
              <button
                className="plus-minus-button-style"
                type="button"
                onClick={this.decreasingTimer}
              >
                -
              </button>
              <p className="timer-input">{initialTimer}</p>
              <button
                className="plus-minus-button-style"
                type="button"
                onClick={this.increasingTimer}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
