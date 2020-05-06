//https://github.com/inkle/ink/blob/master/Documentation/RunningYourInk.md#marking-up-your-ink-content-with-tags

export const AUDIO_BASE_PATH = './audio/'


/**
 * @return {Object}
 */
export function extractTags (tags) {
  const tagObject = {
  }

  const other = []

  tags.forEach((e) => {
    const split = e.split(':')
    console.log(split)
    switch(split[0]) {
      case 'audio': 
        tagObject.audio = AUDIO_BASE_PATH+split[1].trim()
        break;
      default:
        other.push(split.join(':'))
    }
  })
  if(other.length > 0){
    tagObject.other = other
  }
  return tagObject
}
