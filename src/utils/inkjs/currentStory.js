import { Story } from 'inkjs'

let currentStory

export function initStory (json) {
  currentStory = new Story(json)
  return currentStory
}

export function getCurrentStory () {
  return currentStory
}
