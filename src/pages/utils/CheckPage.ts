const PagesWithoutNavbar: Array<string> = ['/login', '/register', '/404']
const PagesWithoutFooter: Array<string> = ['/login', '/register', '/404']

const Check = (path: string, type: string) => {
  if (type.toLocaleLowerCase() === 'navbar') {
    return !PagesWithoutNavbar.includes(path.toLocaleLowerCase())
  } else if (type.toLocaleLowerCase() === 'footer') {
    return !PagesWithoutFooter.includes(path.toLocaleLowerCase())
  }
}

export default Check
