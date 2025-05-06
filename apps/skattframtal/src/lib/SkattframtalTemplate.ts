import {
  ApplicationTemplate,
  ApplicationTypes,
  ApplicationContext,
  ApplicationRole,
  ApplicationStateSchema,
  Application,
  FormModes,
  DefaultEvents,
} from '@island.is/application/types'
import { DefaultStateLifeCycle } from '@island.is/application/core'
import { CodeOwners } from '@island.is/shared/constants'

// Define role and states
enum Roles {
  APPLICANT = 'applicant',
}

enum States {
  PREREQUISITES = 'prerequisites',
  PERSONAL_INFO = 'personalInfo',
  INCOME = 'income',
  DEDUCTIONS = 'deductions',
  ASSETS = 'assets',
  DEBTS = 'debts',
  OVERVIEW = 'overview',
  SUBMITTED = 'submitted',
}

// Define events
export type Events = {
  type: DefaultEvents.SUBMIT | DefaultEvents.ABORT
}

// Create a basic data schema for the application
import { z } from 'zod'

const dataSchema = z.object({
  name: z.string().refine((x) => x.trim().length > 0, {
    message: 'Nafn má ekki vera tómt',
  }),
  nationalId: z.string().refine((x) => x.trim().length > 0, {
    message: 'Kennitala má ekki vera tóm',
  }),
  email: z.string().email({
    message: 'Netfang verður að vera gilt',
  }),
  phoneNumber: z.string().refine((x) => x.trim().length > 0, {
    message: 'Símanúmer má ekki vera tómt',
  }),
  address: z.string().refine((x) => x.trim().length > 0, {
    message: 'Heimilisfang má ekki vera tómt',
  }),
  postalCode: z.string().refine((x) => x.trim().length > 0, {
    message: 'Póstnúmer má ekki vera tómt',
  }),
  city: z.string().refine((x) => x.trim().length > 0, {
    message: 'Staður má ekki vera tómur',
  }),
  salary: z.number().optional(),
  otherIncome: z.number().optional(),
  capitalGains: z.number().optional(),
  pensionFund: z.number().optional(),
  unionFees: z.number().optional(),
  otherDeductions: z.number().optional(),
  realEstate: z.number().optional(),
  vehicles: z.number().optional(),
  bankAccounts: z.number().optional(),
  otherAssets: z.number().optional(),
  mortgages: z.number().optional(),
  studentLoans: z.number().optional(),
  otherLoans: z.number().optional(),
})

export type SkattframtalSchema = z.infer<typeof dataSchema>

// Create the application template
const SkattframtalTemplate: ApplicationTemplate<
  ApplicationContext,
  ApplicationStateSchema<Events>,
  Events
> = {
  type: ApplicationTypes.EXAMPLE, // Would need to register a proper application type
  name: 'Skattframtal',
  codeOwner: CodeOwners.NordaApplications,
  institution: 'Skatturinn',
  dataSchema,
  stateMachineConfig: {
    initial: States.PERSONAL_INFO,
    states: {
      [States.PERSONAL_INFO]: {
        meta: {
          name: 'Persónuupplýsingar',
          status: FormModes.DRAFT,
          progress: 0.2,
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('./formBuilder').then((val) =>
                  Promise.resolve(val.SkattframtalForm),
                ),
              read: 'all',
              write: 'all',
              delete: true,
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: { target: States.INCOME },
        },
      },
      [States.INCOME]: {
        meta: {
          name: 'Tekjuupplýsingar',
          status: FormModes.DRAFT,
          progress: 0.4,
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('./formBuilder').then((val) =>
                  Promise.resolve(val.SkattframtalForm),
                ),
              read: 'all',
              write: 'all',
              delete: true,
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: { target: States.DEDUCTIONS },
        },
      },
      [States.DEDUCTIONS]: {
        meta: {
          name: 'Frádráttarliðir',
          status: FormModes.DRAFT,
          progress: 0.6,
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('./formBuilder').then((val) =>
                  Promise.resolve(val.SkattframtalForm),
                ),
              read: 'all',
              write: 'all',
              delete: true,
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: { target: States.ASSETS },
        },
      },
      [States.ASSETS]: {
        meta: {
          name: 'Eignir',
          status: FormModes.DRAFT,
          progress: 0.8,
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('./formBuilder').then((val) =>
                  Promise.resolve(val.SkattframtalForm),
                ),
              read: 'all',
              write: 'all',
              delete: true,
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: { target: States.DEBTS },
        },
      },
      [States.DEBTS]: {
        meta: {
          name: 'Skuldir',
          status: FormModes.DRAFT,
          progress: 0.9,
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('./formBuilder').then((val) =>
                  Promise.resolve(val.SkattframtalForm),
                ),
              read: 'all',
              write: 'all',
              delete: true,
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: { target: States.OVERVIEW },
        },
      },
      [States.OVERVIEW]: {
        meta: {
          name: 'Yfirlit',
          status: FormModes.DRAFT,
          progress: 0.95,
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('./formBuilder').then((val) =>
                  Promise.resolve(val.SkattframtalForm),
                ),
              read: 'all',
              write: 'all',
              delete: true,
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: { target: States.SUBMITTED },
        },
      },
      [States.SUBMITTED]: {
        meta: {
          name: 'Staðfest',
          status: 'completed',
          progress: 1,
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('./formBuilder').then((val) =>
                  Promise.resolve(val.SkattframtalForm),
                ),
              read: 'all',
            },
          ],
        },
      },
    },
  },
  mapUserToRole(
    nationalId: string,
    application: Application,
  ): ApplicationRole | undefined {
    // For this example, we just return the applicant role for everyone
    return Roles.APPLICANT
  },
}

export default SkattframtalTemplate
