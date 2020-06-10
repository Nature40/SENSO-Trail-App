import {
  extractTags, 
  extractImageData
} from '../../utils/inkjs/extractTags.js'
import config from '../../utils/config.js'

/* eslint-env jest */

describe('utils extract Story Tags', () => {
  it('should extract an audio src if tag is audio: <src.file>', () => {
    const tags = [
      'audio: test.mp3'
    ]
    const res = extractTags(tags)

    expect(res).toEqual({
      'audio':config.sources.audio + 'test.mp3'
    })
  })
  it('should extract an image src if tag is image: <src.file>', () => {
    const tags = [
      'image: test.jpg'
    ]
    const res = extractTags(tags)

    expect(res).toEqual({
      'images':[extractImageData('test.jpg')]
    })
  })
  it('should extract all image src if multiple image tags are supplied', () => {
    const tags = [
      'image: test.jpg',
      'image: test2.jpg'
    ]
    const res = extractTags(tags)

    expect(res).toEqual({
      'images':[
        extractImageData('test.jpg'),
        extractImageData('test2.jpg'),
      ]
    })
  })
  it('should extract unknown tags into other', () => {
    const tags = [
      'blubber bla'
    ]
    const res = extractTags(tags)

    expect(res).toEqual({
      other: ['blubber bla']
    })
  })
  it('should extract no tags from empty tag object', () => {
    const tags = []
    const res = extractTags(tags)

    expect(res).toEqual({})
  })
  describe('extractImageData', () => {
    it('should extract source and alt data from a string', () => {
      const exp = {
        src: config.sources.image + 'test.jpg',
        alt: 'test'
      }
      const res = extractImageData('test.jpg test')

      expect(res).toEqual(exp)
    })
    it('should extract source and default alt data from a string without alt', () => {
      const exp = {
        src: config.sources.image + 'test.jpg',
        alt: 'Bild'
      }
      const res = extractImageData('test.jpg')

      expect(res).toEqual(exp)
    })
  })
})
