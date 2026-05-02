export type Vest = 'interim' | 'embauche' | 'responsable'

export type ColleagueVest = Extract<Vest, 'embauche' | 'responsable'>

export interface Colleague {
  name: string
  vest: ColleagueVest
}
