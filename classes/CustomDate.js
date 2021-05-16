class CustomDate extends Date {
  constructor() {
    super()
  }

  setTime(hours, minutes, seconds) {
    this.setHours(hours);
    this.setMinutes(minutes)
    this.setSeconds(seconds)
  }

  setDateCustom(date, month, year) {
    this.setDate(date);
    this.setMonth(month - 1)
    this.setFullYear(year)
  }
}

module.exports = CustomDate