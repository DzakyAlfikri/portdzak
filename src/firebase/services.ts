import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './config'

const DOC_ID = 'data'
const COLLECTION = 'portfolio'

export interface ProjectData {
  photos: any[]
  videos: any[]
  designs: any[]
  websites: any[]
}

export async function getProjects(): Promise<ProjectData | null> {
  const snap = await getDoc(doc(db, COLLECTION, DOC_ID))
  if (snap.exists()) return snap.data() as ProjectData
  return null
}

export async function saveProjects(data: ProjectData): Promise<void> {
  await setDoc(doc(db, COLLECTION, DOC_ID), data)
}
