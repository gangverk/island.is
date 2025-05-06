import React from 'react'
import { ApplicationForm } from '@island.is/application/ui-shell'

interface ApplicationShellProps {
  applicationId?: string
  nationalRegistryId?: string
}

// This is a simplified wrapper component that would integrate with the Island.is application system
export const ApplicationShell: React.FC<ApplicationShellProps> = ({
  applicationId = 'skattframtal-mock-id',
  nationalRegistryId = '000000-0000',
}) => {
  return (
    <ApplicationForm
      applicationId={applicationId}
      nationalRegistryId={nationalRegistryId}
      slug="skattframtal"
    />
  )
}

export default ApplicationShell
