/**
 * Weather state machine.
 * States: clear, cloudy, rain, snow
 * Transitions smoothly between states.
 */

const WEATHER_STATES = {
  clear:  { fogDensityMult: 1.0, windStrength: 0.3, rainIntensity: 0, snowIntensity: 0, cloudCover: 0 },
  cloudy: { fogDensityMult: 1.3, windStrength: 0.4, rainIntensity: 0, snowIntensity: 0, cloudCover: 0.6 },
  rain:   { fogDensityMult: 1.8, windStrength: 0.6, rainIntensity: 1.0, snowIntensity: 0, cloudCover: 0.8 },
  snow:   { fogDensityMult: 1.5, windStrength: 0.2, rainIntensity: 0, snowIntensity: 1.0, cloudCover: 0.7 },
}

// Valid transitions
const TRANSITIONS = {
  clear:  ['clear', 'cloudy'],
  cloudy: ['clear', 'cloudy', 'rain', 'snow'],
  rain:   ['rain', 'cloudy'],
  snow:   ['snow', 'cloudy'],
}

const TRANSITION_DURATION = 8 // seconds to blend between states
const MIN_STATE_DURATION = 30
const MAX_STATE_DURATION = 90

export default class Weather {
  constructor() {
    this.currentState = 'clear'
    this.targetState = 'clear'
    this.locked = false

    // Blended output
    this.fogDensityMult = 1.0
    this.windStrength = 0.3
    this.rainIntensity = 0
    this.snowIntensity = 0
    this.cloudCover = 0

    // Internal
    this._stateTimer = 0
    this._stateDuration = MIN_STATE_DURATION + Math.random() * (MAX_STATE_DURATION - MIN_STATE_DURATION)
    this._transitionProgress = 1 // 1 = fully in current state
    this._previousValues = { ...WEATHER_STATES.clear }
  }

  /** Lock to a specific weather state */
  lock(state) {
    if (WEATHER_STATES[state]) {
      this.locked = true
      this.targetState = state
      this._transitionProgress = 0
    }
  }

  unlock() {
    this.locked = false
  }

  update(dt) {
    // State duration timer
    if (!this.locked) {
      this._stateTimer += dt
      if (this._stateTimer > this._stateDuration && this._transitionProgress >= 1) {
        this._pickNextState()
      }
    }

    // Blend toward target
    if (this._transitionProgress < 1) {
      this._transitionProgress = Math.min(1, this._transitionProgress + dt / TRANSITION_DURATION)
    }

    // When transition completes, adopt new state
    if (this._transitionProgress >= 1 && this.currentState !== this.targetState) {
      this.currentState = this.targetState
    }

    // Interpolate values
    const target = WEATHER_STATES[this.targetState]
    const s = this._transitionProgress * this._transitionProgress * (3 - 2 * this._transitionProgress)

    this.fogDensityMult = this._previousValues.fogDensityMult + (target.fogDensityMult - this._previousValues.fogDensityMult) * s
    this.windStrength = this._previousValues.windStrength + (target.windStrength - this._previousValues.windStrength) * s
    this.rainIntensity = this._previousValues.rainIntensity + (target.rainIntensity - this._previousValues.rainIntensity) * s
    this.snowIntensity = this._previousValues.snowIntensity + (target.snowIntensity - this._previousValues.snowIntensity) * s
    this.cloudCover = this._previousValues.cloudCover + (target.cloudCover - this._previousValues.cloudCover) * s
  }

  _pickNextState() {
    const options = TRANSITIONS[this.currentState]
    const next = options[Math.floor(Math.random() * options.length)]

    // Snapshot current values for smooth transition
    this._previousValues = {
      fogDensityMult: this.fogDensityMult,
      windStrength: this.windStrength,
      rainIntensity: this.rainIntensity,
      snowIntensity: this.snowIntensity,
      cloudCover: this.cloudCover,
    }

    this.targetState = next
    this._transitionProgress = 0
    this._stateTimer = 0
    this._stateDuration = MIN_STATE_DURATION + Math.random() * (MAX_STATE_DURATION - MIN_STATE_DURATION)
  }

  destroy() {}
}
