'use client'

import { useParams } from 'next/navigation'
import { useMemo } from 'react'


export const useConversation = () => {
    const params = useParams()

    const userTOChatId = useMemo(() => {
        if (!params?.userTOChatId) {
            return ''
        }
        return params.userTOChatId as string

    }, [params?.userTOChatId])

    const isOpen = useMemo(() => !!userTOChatId, [userTOChatId])

    return useMemo(() => ({
        isOpen, userTOChatId
    }), [isOpen, userTOChatId])
}