import { ImageResponse } from 'next/og'
import { join } from 'path'
import { readFile } from 'fs/promises'

export const alt = 'MYAH Consulting'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoPath = join(process.cwd(), 'public/logoMyahConsulting.png')
  const logoBuffer = await readFile(logoPath)
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#1b3b36',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            backgroundColor: '#ffffff', 
            width: '100%', 
            height: '100%', 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          <img 
            src={logoBase64} 
            alt="MYAH Consulting Logo" 
            style={{ width: '80%', height: '80%', objectFit: 'contain' }} 
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
