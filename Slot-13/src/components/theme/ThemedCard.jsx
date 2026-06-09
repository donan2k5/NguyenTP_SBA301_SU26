import { useTheme } from '../../context/ThemeContext'

export default function ThemedCard({ title, children }) {
  const { colors } = useTheme()

  return (
    <div
      style={{
        background: colors.surface,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      {title ? <h3>{title}</h3> : null}
      {children}
    </div>
  )
}
