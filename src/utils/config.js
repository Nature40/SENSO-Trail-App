const config = {
  trailname: 'main',
  sources : {
    trail: `/`,
    audio: `/`,
    image: `/`
  }
}

function init() {
  let base = ""
  if(process.env && process.env.PUBLIC_URL){
    base = process.env.PUBLIC_URL;
    if(!base.endsWith('/')){
      base += '/'
    }
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
