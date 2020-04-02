// import { Story } from 'inkjs'
import { Story } from '../../../node_modules/inkjs/dist/ink.js'


let currentStory

export function initStory (json) {
  currentStory = new Story(json)
  return currentStory
}

export function getCurrentStory () {
  return currentStory
}
