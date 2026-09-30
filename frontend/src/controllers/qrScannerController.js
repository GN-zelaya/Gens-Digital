export class QrScannerController {
  constructor({ onScan, minimumLength = 3, maxKeystrokeDelay = 80 } = {}) {
    this.onScan = onScan
    this.minimumLength = minimumLength
    this.maxKeystrokeDelay = maxKeystrokeDelay
    this.buffer = ''
    this.lastInputAt = 0
    this.resetTimer = null
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  start() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  stop() {
    window.removeEventListener('keydown', this.handleKeyDown)
    this.reset()
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      if (this.buffer.length >= this.minimumLength) {
        event.preventDefault()
        this.onScan?.(this.buffer)
      }

      this.reset()
      return
    }

    if (event.key.length !== 1 || event.ctrlKey || event.altKey || event.metaKey) {
      return
    }

    const now = performance.now()
    if (now - this.lastInputAt > this.maxKeystrokeDelay) {
      this.buffer = ''
    }

    this.buffer += event.key
    this.lastInputAt = now
    clearTimeout(this.resetTimer)
    this.resetTimer = setTimeout(() => this.reset(), this.maxKeystrokeDelay)
  }

  reset() {
    this.buffer = ''
    this.lastInputAt = 0
    clearTimeout(this.resetTimer)
    this.resetTimer = null
  }
}