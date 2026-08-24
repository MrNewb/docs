type YouTubePosterProps = {
  id: string
  title: string
  className?: string
}

export function YouTubePoster({ id, title, className }: YouTubePosterProps) {
  const wrapClass = className ? `intro-video ${className}` : 'intro-video'
  return (
    <div className={wrapClass}>
      <button
        type="button"
        className="intro-video-poster"
        data-youtube={id}
        data-title={title}
        aria-label={`Play ${title}`}
      >
        <img
          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt=""
          width={480}
          height={360}
          loading="lazy"
          decoding="async"
        />
        <span className="intro-video-play" aria-hidden="true" />
      </button>
    </div>
  )
}
