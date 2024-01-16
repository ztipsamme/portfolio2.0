import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export const getIcon = (url) => {
  const http = ['https://www.', 'https://']
  const icon = [
    { site: 'linkedin', icon: faLinkedin },
    { site: 'github', icon: faGithub },
  ]
  let result

  if (!url) return

  http.forEach((e) => {
    icon.forEach((i) => {
      if (!url.includes(e + i.site)) result = i.icon
    })
  })

  return result
}
