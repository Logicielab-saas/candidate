"use client";

import { usePathname } from 'next/navigation'
import { dashboardNavigation } from '@/core/constants/dashboard-navigation.const'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Fragment } from 'react';

interface BreadcrumbItemType {
  title: string
  url: string
}

const getBreadcrumbItems = (pathname: string): BreadcrumbItemType[] => {
  const items: BreadcrumbItemType[] = []
  const paths = pathname.split('/').filter(Boolean)

  // Add dashboard as first item if we're in a dashboard route
  if (paths[0] === 'dashboard' || paths[0] === 'admin' || paths[0] === 'recruiter' || paths[0] === 'candidate') {
    items.push({
      title: 'Dashboard',
      url: '/dashboard'
    })
  }

  // Find matching section and item in navigation
  dashboardNavigation.navMain.forEach((section) => {
    section.items.forEach((item) => {
      const itemPaths = item.url.split('/').filter(Boolean)
      if (paths.join('/').includes(itemPaths.join('/'))) {
        // Add section if it's a parent and has a valid URL
        if (section.title !== item.title && section.url !== '#') {
          items.push({
            title: section.title,
            url: section.url
          })
        }
        // Add the actual page
        items.push({
          title: item.title,
          url: item.url
        })
      }
    })
  })

  // If no matches found in navigation, construct from path
  if (items.length === 1 && paths.length > 1) {
    paths.slice(1).forEach((path) => {
      items.push({
        title: path.charAt(0).toUpperCase() + path.slice(1),
        url: `/${paths.slice(0, paths.indexOf(path) + 1).join('/')}`
      })
    })
  }

  return items
}

export function DashboardBreadcrumb() {
  const pathname = usePathname()
  const breadcrumbItems = getBreadcrumbItems(pathname)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.url}>
                {item.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}