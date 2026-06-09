import { useTheme } from '../../context/ThemeContext'

export default function ThemedInput({ placeholder }) {
  const { colors } = useTheme()

  return (
    <input
      placeholder={placeholder}
      style={{
        background: colors.background,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        padding: '8px 12px',
        borderRadius: 8,
      }}
    />
  )
}
