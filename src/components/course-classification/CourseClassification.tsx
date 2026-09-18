import { cn } from '../../lib/utils'
import { Icon } from '../../icons'

// Read directly from the real Figma "Course Classification" building
// block (fileKey yWcYz9Nlr9VsyCiKc2HXu5, node 1806:321) and its
// private ".Building Blocks / Rating Stars" child (node 1805:9883).
// Active stars are filled (weight="fill", text-icon-primary);
// inactive stars are hollow outlines (weight="regular",
// text-icon-disabled) — confirmed via get_screenshot on the rendered
// stars, not just the flattened SVG asset names.
export interface CourseClassificationProps {
  agency: 'MEC' | 'ENADE'
  display: 'stars' | 'grade'
  value?: number
  score?: string
  className?: string
}

export function CourseClassification({
  agency,
  display,
  value = 1,
  score = '5',
  className,
}: CourseClassificationProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center gap-4 rounded-tag border border-border bg-surface-alt p-8',
        className,
      )}
    >
      <p className="text-sm text-text-primary">{agency}</p>
      {display === 'stars' ? (
        <div className="flex items-center gap-[2px]">
          {Array.from({ length: 5 }, (_, index) => (
            <Icon
              key={index}
              name="Star"
              weight={index < value ? 'fill' : 'regular'}
              aria-hidden
              className={index < value ? 'text-icon-primary' : 'text-icon-disabled'}
              style={{ width: 14, height: 14 }}
            />
          ))}
        </div>
      ) : (
        <>
          <p className="text-base font-semibold text-text-primary">Nota</p>
          <p className="text-base font-semibold text-brand-text">{score}</p>
        </>
      )}
    </div>
  )
}
