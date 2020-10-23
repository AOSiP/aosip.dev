const BASE_URL = 'https://aosip.dev/'
const GITHUB_URL = `https://github.com/AOSiP`
const GERRIT_URL = 'https://review.aosip.dev'
const DEVICES_URL = 'https://github.com/AOSiP-Devices'
const JENKINS_URL = 'https://jenkins.aosip.dev'
const CHANGELOG_URL = 'https://raw.githubusercontent.com/AOSiP-Devices/Updater-Stuff/master'


export async function handleRequest(request: Request): Promise<Response> {
  const relURL = request.url.replace(BASE_URL, '')
  const URLparts = relURL.split('/')

  // Check the route that is being accessed
  switch (URLparts[0]) {
    case 'changelog': {
      let response = await fetch(`${CHANGELOG_URL}/changelog`)
      if (response.status != 200) {
        return new Response('Error fetching changelog!', { status: response.status })
      }
      let changelog = (await response.text()).toString()
      switch (URLparts.length) {
        case 2:
          const device = URLparts[1]
          response = await fetch(`${CHANGELOG_URL}/${device}/changelog`)
          if (response.status != 200) {
            return new Response(`Error fetching changelog for ${device}!`, { status: response.status })
          }
          changelog += (await response.text()).toString()
      }
      return new Response(changelog, { status: 200 })
    }
    case 'g': {
      switch (URLparts.length) {
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
      }
      return Response.redirect(GITHUB_URL, 301)

    }
    case 'r': {
      switch (URLparts.length) {
        case 2:
          return Response.redirect(`${GERRIT_URL}/q/${URLparts[1]}`)
      }
      return Response.redirect(GERRIT_URL)
    }
    case 'd': {
      switch (URLparts.length) {
        case 2:
          return Response.redirect(
            `${DEVICES_URL}/${URLparts[1]}`,
            301,
          )
        case 3:
          return Response.redirect(
            `${DEVICES_URL}/${URLparts[1]}/commit/${URLparts[2]}`,
            301,
          )
      }
      return Response.redirect(DEVICES_URL, 301)

    }
    case 'j': {
      switch (URLparts.length) {
        case 2:
          return Response.redirect(`${JENKINS_URL}/${URLparts[1]}`)
      }
      return Response.redirect(JENKINS_URL, 301)
    }
  }
  return fetch(request)
}
