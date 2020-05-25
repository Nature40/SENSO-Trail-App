import { extractTags, AUDIO_BASE_PATH } from '../../utils/inkjs/extractTags.js'
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
      'images':[config.sources.image+ 'test.jpg']
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
        config.sources.image+ 'test.jpg',
        config.sources.image+ 'test2.jpg',
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
})
