import React from 'react'
import ApplicationShell from '../../../components/Application/ApplicationShell'
import { useRouter } from 'next/router'

export default function ApplicationUiShellPage() {
  const router = useRouter()
  const { applicationId } = router.query
  return <ApplicationShell applicationId={applicationId as string} />
}
