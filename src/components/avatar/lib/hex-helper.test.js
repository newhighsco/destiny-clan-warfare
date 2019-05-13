import hexHelper from './hex-helper'

describe('hexHelper.hexToRgb()', function() {
  test('should convert a six-digitl hexadecimal value to RGB values', function() {
    var result = hexHelper.hexToRgb('red')

    expect(result).toEqual({ r: 255, g: 255, b: 255 })

    result = hexHelper.hexToRgb('#fff')

    expect(result).toEqual({ r: 255, g: 255, b: 255 })

    result = hexHelper.hexToRgb('#ffffff')

    expect(result).toEqual({ r: 255, g: 255, b: 255 })

    result = hexHelper.hexToRgb('#000000')

    expect(result).toEqual({ r: 0, g: 0, b: 0 })

    result = hexHelper.hexToRgb('#5be7de')

    expect(result).toEqual({ r: 91, g: 231, b: 222 })

    result = hexHelper.hexToRgb('#ghijkl')

    expect(result).toEqual({ r: 255, g: 255, b: 255 })
  })
})

describe('hexHelper.isHex()', function() {
  test('should return whether a value is a six-digit hexadecimal or not', function() {
    var result = hexHelper.isHex('red')

    expect(result).toEqual(null)

    result = hexHelper.isHex('#fff')

    expect(result).toEqual(null)

    result = hexHelper.isHex('#ffffff')

    expect(result[1]).toEqual('ff')
    expect(result[2]).toEqual('ff')
    expect(result[3]).toEqual('ff')

    result = hexHelper.isHex('#abcdef')

    expect(result[1]).toEqual('ab')
    expect(result[2]).toEqual('cd')
    expect(result[3]).toEqual('ef')

    result = hexHelper.isHex('#ghijkl')

    expect(result).toEqual(null)
  })
})
