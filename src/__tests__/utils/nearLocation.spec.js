import isNearLocation, { geoDistance } from '../../utils/geo/nearLocation.js'

/* eslint-env jest */


describe('geo location', () => {
  describe('geoDistance', () => {
    it('the to point should be roughly 0m appart', () => {
      const coords1 = [ 
        50.790324, 8.828186
      ]
      const coords2 = [ 
        50.790324, 8.828186
      ]
      const distance = 0
      const res = geoDistance(...coords1, ... coords2)

      checkHandPickedValues(res, distance, 0)
    })
    it('the to point should be roughly 5m appart', () => {
      const coords1 = [ 
        50.790324, 8.828186
      ]
      const coords2 = [ 
        50.790330, 8.828115
      ]
      const distance = 5
      const res = geoDistance(...coords1, ... coords2)

      checkHandPickedValues(res, distance, 1)
    })
    it('the to point should be roughly 25m appart', () => {
      const coords1 = [ 
        50.786366, 8.834327
      ]
      const coords2 = [ 
        50.786422, 8.833994
      ]
      const distance = 25
      const res = geoDistance(...coords1, ... coords2)

      checkHandPickedValues(res, distance, 3)
    })
    it('the to point should be roughly 100m appart', () => {
      const coords1 = [ 
        50.787716, 8.840916
      ]
      const coords2 = [ 
        50.787820, 8.839509
      ]
      const distance = 100
      const res = geoDistance(...coords1, ... coords2)

      checkHandPickedValues(res, distance, 10)
    })
    it('the to point should be roughly 1km appart', () => {
      const coords1 = [ 
        50.787820, 8.839509
      ]
      const coords2 = [ 
        50.788593, 8.825630
      ]
      const distance = 1000
      const res = geoDistance(...coords1, ... coords2)

      checkHandPickedValues(res, distance, 100)
    })
  })

  describe('isNearLocation', () => {
    it('the point should be near itself', () => {
      const coords1 = [ 
        50.790324, 8.828186
      ]
      const coords2 = [ 
        50.790324, 8.828186
      ]
      const res = isNearLocation(...coords1, ... coords2)

      expect(res).toEqual(true)
    })
    it('expect points not to be near (10m) to each other (~25m apart)', () => {
      const coords1 = [ 
        50.786366, 8.834327
      ]
      const coords2 = [ 
        50.786422, 8.833994
      ]
      const res = isNearLocation(...coords1, ... coords2, 10)

      expect(res).toEqual(false)
    })
    it('expect points to be near (10 m)  to each other (~5m apart)', () => {
      const coords1 = [ 
        50.790324, 8.828186
      ]
      const coords2 = [ 
        50.790330, 8.828115
      ]
      const res = isNearLocation(...coords1, ... coords2, 10)

      expect(res).toEqual(true)
    })
  })   
})

function checkHandPickedValues(res, distance, EPS ){
  expect(res).toBeLessThanOrEqual(distance + EPS)
  expect(res).toBeGreaterThanOrEqual(distance - EPS)
}
