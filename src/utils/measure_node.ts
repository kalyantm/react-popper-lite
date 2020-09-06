import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'

export default function measureNode(
  node: React.ReactElement
): { width: number; height: number } {
  const container = document.createElement('div')
  container.style.visibility = 'hidden'
  container.style.display = 'inline-block'
  container.style.height = 'auto'
  container.innerHTML = ReactDOMServer.renderToStaticMarkup(node)

  document.body.appendChild(container)

  const width = container.clientWidth
  const height = container.clientHeight

  document.body.removeChild(container)
  return {
    width,
    height,
  }
}
