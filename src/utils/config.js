const config = {
  trailname: 'main',
  sources : {
    trail: `/`,
    audio: `/`,
    image: `/`
  }
}

function init(base) {
  if(!base){
    base = "/"
  }
  if(!base.endsWith('/')){
    base += '/'
  }

  console.log("base: ", base)
  config.sources = {
    trail: `${base}assets/trails/`,
    audio: `${base}assets/audio/`,
    image: `${base}assets/images/`
  }

  console.log(config)

  config.trailname = 'trail';

  return config
}

export default config

export {init, config}
