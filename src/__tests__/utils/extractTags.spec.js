import { extractTags, AUDIO_BASE_PATH } from '../../utils/inkjs/extractTags.js'

/* eslint-env jest */

describe('utils extract Story Tags', () => {
  it('should extract an audio src if tag is audio: <src.file>', () => {
    const tags = [
      'audio: test.mp3'
    ]
    const res = extractTags(tags)

    expect(res).toEqual({
      'audio':AUDIO_BASE_PATH+'test.mp3'
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
