import sanity_config from './sanity_config'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanity_config)

export function urlFor(source) {
    return builder.image(source)
}