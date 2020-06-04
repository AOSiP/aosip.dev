const BASE_URL = 'https://aosip.dev/'
const GITHUB_URL = `https://github.com/AOSiP`
const GERRIT_URL = 'https://review.aosip.dev/q'
const DEVICES_URL = 'https://github.com/AOSiP-Devices'

export async function handleRequest(request: Request): Promise<Response> {
  const relURL = request.url.replace(BASE_URL, '')
  const URLparts = relURL.split('/')
  if (URLparts[0] === 'g') {
    switch (URLparts.length) {
      case 1:
        return Response.redirect(`${GITHUB_URL}`, 301)
      case 2:
        return Response.redirect(
          `${GITHUB_URL}/${URLparts[1]}`,
          301,
        )
      case 3:
        return Response.redirect(
          `${GITHUB_URL}/${URLparts[1]}/commit/${URLparts[2]}`,
          301,
        )
      default:
        break
    }
  } else if (URLparts[0] === 'r') {
    switch (URLparts.length) {
      case 1:
        return Response.redirect(GERRIT_URL)
      case 2:
        return Response.redirect(`${GERRIT_URL}/${URLparts[1]}`)
    }
  } else if (URLparts[0] === 'd') {
    switch (URLparts.length) {
      case 1:
        return Response.redirect(`${DEVICES_URL}`, 301)
      case 2:
        return Response.redirect(
          `${DEVICES_URL}/${URLparts[1]}`,
          301,
        )
      case 3:
        return Response.redirect(
          `${GITHUB_URL}/${URLparts[1]}/commit/${URLparts[2]}`,
          301,
        )
      default:
        break
    }
  }
  return fetch(request)
}
