import ThemeNavbar from '../components/theme/ThemeNavbar'
import ThemedButton from '../components/theme/ThemedButton'
import ThemedCard from '../components/theme/ThemedCard'
import ThemedInput from '../components/theme/ThemedInput'
import { ThemeProvider, useTheme } from '../context/ThemeContext'

function ThemePageContent() {
  const { colors } = useTheme()

  return (
    <div
      style={{
        background: colors.background,
        color: colors.text,
        minHeight: '100vh',
        padding: 24,
      }}
    >
      <ThemeNavbar />

      <ThemedCard title="Profile">
        <p>Demo card theo theme hiện tại.</p>
        <ThemedInput placeholder="Nhập họ tên" />
      </ThemedCard>

      <ThemedCard title="Actions">
        <div style={{ display: 'flex', gap: 12 }}>
          <ThemedButton>Lưu thay đổi</ThemedButton>
          <ThemedButton variant="outline">Hủy</ThemedButton>
        </div>
      </ThemedCard>

      <ThemedCard title="Preview">
        <p>Nội dung này đổi màu theo `ThemeContext`.</p>
      </ThemedCard>
    </div>
  )
}

export default function Ex04ThemePage() {
  return (
    <ThemeProvider>
      <ThemePageContent />
    </ThemeProvider>
  )
}
