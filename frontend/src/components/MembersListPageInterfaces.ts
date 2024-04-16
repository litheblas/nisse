export interface Member {
  id: string
  full_name: string
  active_period: string
  real_name?: string
  email?: string
  short_name?: string
  complete_adress?: string
  birth_date?: string
  phone_number_1?: string
  memberships?: Membership[]
  engagements?: Engagement[]
}

// Used to tell TS what Membership contains
// It does contain more but we only use membership_type
export interface Membership {
  membership_type: string
}

// Used to tell TS what Engagement contains
// It does contain more but we only use engagement_type
export interface Engagement {
  engagement_type: string
}

// List of what memberships that are shown in dropdown list, advanced search
export const membershipGroups = [
  'Kompet',
  'Klarinett',
  'Hornbasun',
  'Flöjt',
  'Saxofon',
  'Trumpet',
  'Balett',
]

// List of what instruments that are shown in dropdown list, advanced search
export const instrumentGroups = [
  'Banjo',
  'Klarinett',
  'Bas',
  'Flöjt',
  'Saxofon',
  'Trummor',
  'Tuba',
  'Trombon',
  'Trumpet',
  'Balett',
  'Horn',
]

// "Dictionary" for connecting instrument to sektioner
export const instrumentMembershipGroups: Record<string, string> = {
  Banjo: 'Kompet',
  Klarinett: 'Klarinett',
  Bas: 'Kompet',
  Horn: 'Hornbasun',
  Flöjt: 'Flöjt',
  Saxofon: 'Saxofon',
  Trummor: 'Kompet',
  Tuba: 'Kompet',
  Trombon: 'Hornbasun',
  Trumpet: 'Trumpet',
  Balett: 'Balett',
}

// List of what engagements that are shown in dropdown list, advanced search
export const engagementGroups = [
  'Dictator',
  'Skrivkunig',
  'Kronharpa',
  'Intendent',
  'Balettchef',
  'Spelraggare',
  'Domptör',
  'Notpiccolo',
  'Luciageneral',
  'Jubelgeneral',
]
