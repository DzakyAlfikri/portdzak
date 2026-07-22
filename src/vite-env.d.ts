/// <reference types="vite/client" />
import React from 'react'

declare module '*.jsx' {
  const component: React.ComponentType<any>
  export default component
}

declare module './GradientBlinds' {
  const GradientBlinds: React.ComponentType<any>
  export default GradientBlinds
}

declare module '../GradientBlinds' {
  const GradientBlinds: React.ComponentType<any>
  export default GradientBlinds
}

declare module './ProfileCard' {
  const ProfileCard: React.ComponentType<any>
  export default ProfileCard
}

declare module './components/Carousel' {
  const Carousel: React.ComponentType<any>
  export default Carousel
}
