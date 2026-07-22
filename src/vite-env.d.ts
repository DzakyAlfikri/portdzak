/// <reference types="vite/client" />

declare module '*.jsx' {
  const component: any
  export default component
}

declare module './GradientBlinds' {
  const GradientBlinds: any
  export default GradientBlinds
}

declare module '../GradientBlinds' {
  const GradientBlinds: any
  export default GradientBlinds
}

declare module './ProfileCard' {
  const ProfileCard: any
  export default ProfileCard
}

declare module './components/Carousel' {
  const Carousel: any
  export default Carousel
}
