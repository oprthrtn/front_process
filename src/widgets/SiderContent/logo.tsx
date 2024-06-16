// logo.ts
import logoImage from '../../shared/assets/hitsLogo.png' // Путь к изображению логотипа
import { Image } from 'antd'

export const LogoImage: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'white', display: 'inline-block' }}>
      <Image
        src={logoImage}
        alt='Логотип'
        preview={false}
      />
    </div>
  )
}

export default LogoImage
