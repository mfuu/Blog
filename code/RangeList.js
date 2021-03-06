class RangeList {
  constructor(list) {
    this.list = list ? [list] : []
  }
  /**
   * Adds a range to the list
   * @param {Array} range Array of two integers that specify beginning and end of range
   */
  add(range) {
    this.list = this._mergeInterval([...this.list, range])
  }

  /**
   * Remove a range from the list
   * @param {Array} range Array of two integers that specify beginning and end of range
   */
  remove(range) {
    const leftIndex = this._binarySearch(range[0])
    const rightIndex = this._binarySearch(range[1])
    // The difference of the index, needs to include itself (+1)
    const diff = rightIndex - leftIndex + 1
    // replace elements in list
    if (this.list[leftIndex][0] < range[0]) {
      this.list.splice(leftIndex, diff, [this.list[leftIndex][0], range[0]], [range[1], this.list[rightIndex][1]])
    } else {
      this.list.splice(leftIndex, diff, [range[1], this.list[rightIndex][1]])
    }
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    const result = this.list.map(item => {
      const str = JSON.stringify(item)
      return str.replace(']', ')')
    })
    console.log(result.join(' '))
  }

  /**
   * binary search, find index —— private method
   * @param {Number} num 
   * @returns Returns the index of num in list
   */
  _binarySearch(num) {
    let low = 0, high = this.list.length - 1
    while(low <= high) {
      // reserved integer
      const middle = Math.trunc((high + low) / 2)
      const curRange = this.list[middle]
      if (num < curRange[0]) {
        high = middle - 1
      } else if (num > curRange[1]) {
        low = middle + 1
      } else if (num >= curRange[0] && num <= curRange[1]) {
        // If the value to be searched is within the current range, return
        return middle
      }
    }
    return low
  }

  /**
   * merge interval —— private method
   * @param {Array} array User added data, Two-dimensional array
   * @returns returns the result of the merged interval
   */
  _mergeInterval(array) {
    const result = []
    // First sort array from smallest to largest
    array.sort((a, b) => a[0] - b[0])
    for(let i = 0; i < array.length; i++) {
      // Compare the current interval with the next interval. 
      // If the maximum value of the current interval is greater than or equal to the minimum value of the next interval, exchange the assignment
      if (i != array.length - 1 && array[i][1] >= array[i + 1][0]) {
        if (array[i][1] >= array[i + 1][1]) {
          array[i + 1][1] = array[i][1]
        }
        array[i + 1][0] = array[i][0]
      } else {
        result.push(array[i])
      }
    }
    return result
  }
}

const rl = new RangeList() // or `const rl = new RangeList([1, 5])`

rl.add([1, 5])
rl.print()

rl.add([10, 20])
rl.print()

rl.add([20, 20])
rl.print()

rl.add([20, 21])
rl.print()

rl.add([2, 4])
rl.print()

rl.add([3, 8])
rl.print()

rl.remove([10, 10])
rl.print()

rl.remove([10, 11])
rl.print()

rl.remove([15, 17])
rl.print()

rl.remove([3, 19])
rl.print()
