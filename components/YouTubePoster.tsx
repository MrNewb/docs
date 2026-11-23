type YouTubePosterProps = {
  id: string
  title: string
  className?: string
  poster?: string
}

export function YouTubePoster({ id, title, className, poster }: YouTubePosterProps) {
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
          src={poster ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt=""
          width={poster ? 1280 : 480}
          height={poster ? 720 : 360}
          loading="lazy"
          decoding="async"
        />
        <span className="intro-video-play" aria-hidden="true" />
      </button>
    </div>
  )
}
