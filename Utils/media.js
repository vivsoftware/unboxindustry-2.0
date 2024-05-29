// import { getStrapiURL } from "./api"

// export function getStrapiMedia(media) {
//   if (Array.isArray(media?.data)) {
//     return media?.data?.map((data) => {
//       const  {url}  = data?.attributes
//       const imageUrl = url?.startsWith("/") ? getStrapiURL(url) : url
     
//       return imageUrl
//     })
//   } else{
//   const { url } = media.data?.attributes
//   const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
//   return imageUrl
//   }
// }

import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  if (Array.isArray(media?.data)) {
    return media.data
      .map((data) => {
        const url = data?.attributes?.url;
        if (typeof url === 'string') {
          return url.startsWith("/") ? getStrapiURL(url) : url;
        }
        return null;
      })
      .filter(Boolean); // Filters out any null values
  } else {
    const url = media?.data?.attributes?.url;
    if (typeof url === 'string') {
      return url.startsWith("/") ? getStrapiURL(url) : url;
    }
    return null;
  }
}
