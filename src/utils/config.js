const config = {}

function init() {
  let base = ""
  if(process.env && process.env.PUBLIC_URL){
    base = process.env.PUBLIC_URL;
  } 
  config.sources = {
    trail: `${base}assets/trails/`,
    audio: `${base}assets/audio/`,
    image: `${base}assets/images/`
  }

  config.trailname = 'trail';

  return config
}

export default config

export {init, config}
