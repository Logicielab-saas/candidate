import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AnnonceTabs } from '@/features/recruiter/annonces/components/AnnonceTabs'
import React from 'react'

const JobsPage = () => {
  return <>
    <div className="flex justify-end">
      <Button>Publier une annonce</Button>
    </div>
    <Separator className="my-6" />
    <AnnonceTabs />
  </>
}

export default JobsPage