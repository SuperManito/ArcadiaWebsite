'use client'

import { ConfigProvider, Modal, Space, theme } from 'antd'
import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { HeartHandshake } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import WechatPayImage from './WechatPayImage'

export default function DonateModal() {
  const { resolvedTheme } = useTheme()
  const algorithm = useMemo(() => {
    return resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  }, [resolvedTheme])
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const alipayIcon = ''

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <ConfigProvider theme={{ algorithm }}>
      <button
        className={cn(
          buttonVariants({
            color: 'outline',
            size: 'icon-xs',
            className: 'p-2 gap-1 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground',
          }),
        )}
        onClick={showModal}
      >
        <HeartHandshake />
        点击捐赠
      </button>
      <Modal centered width={340} styles={{ body: { justifyContent: 'center', display: 'flex', height: '340px' } }} closable={false} open={isModalOpen} cancelText="" onOk={handleOk} onCancel={handleCancel} footer={[]}>
        <Space orientation="vertical">
          <WechatPayImage />
          <Space size={6} align="center" style={{ justifyContent: 'center', width: '100%' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="#00c250" d="M9.271 14.669a.661.661 0 0 1-.88-.269l-.043-.095l-1.818-3.998a.473.473 0 0 1 0-.146a.327.327 0 0 1 .335-.327a.305.305 0 0 1 .196.066l2.18 1.527a.988.988 0 0 0 .546.167a.894.894 0 0 0 .342-.066l10.047-4.5a10.73 10.73 0 0 0-8.171-3.526C6.479 3.502 2 7.232 2 11.87a7.83 7.83 0 0 0 3.46 6.296a.662.662 0 0 1 .24.727l-.45 1.701a.945.945 0 0 0-.051.24a.327.327 0 0 0 .334.334a.416.416 0 0 0 .19-.058l2.18-1.265c.16-.098.343-.151.53-.152c.1 0 .198.014.292.043c1.062.3 2.16.452 3.264.45c5.525 0 10.011-3.729 10.011-8.33a7.228 7.228 0 0 0-1.098-3.883L9.351 14.625l-.08.044Z" />
            </svg>
            <span style={{ fontSize: '20px', fontWeight: '500' }}>微信支付</span>
          </Space>
        </Space>
      </Modal>
    </ConfigProvider>
  )
}
