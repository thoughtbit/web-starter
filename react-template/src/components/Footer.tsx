export default function Footer() {
  const { isDark, toggleDark } = useDark()
  return (
    <nav className="mt-6 inline-flex items-center  gap-2 text-xl">

      {isDark ? <div onClick={e => toggleDark(e)} className="icon-btn i-line-md-sunny-outline-to-moon-loop-transition" /> : <div className="icon-btn i-line-md-sunny-outline-loop" onClick={e => toggleDark(e)} />}
      <a
        className="icon-btn i-line-md-github-loop"
        rel="noreferrer"
        href="https://github.com/yang1206/react-template"
        target="_blank"
        title="GitHub"
      />
    </nav>

  )
}
