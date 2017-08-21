import requireHacker from 'require-hacker'

const extensions = ['css', 'gif', 'jpg', 'svg']

extensions.forEach(type => {
  requireHacker.hook(type, () => 'module.exports = ""')
})