import { z } from 'zod'
import * as kennitala from 'kennitala'
import { VehicleMileage } from '../shared'
import { error } from './messages'

const UserSchemaBase = z.object({
  nationalId: z
    .string()
    .refine(
      (nationalId) =>
        nationalId &&
        nationalId.length !== 0 &&
        kennitala.isValid(nationalId) &&
        (kennitala.isCompany(nationalId) ||
          kennitala.info(nationalId).age >= 18),
    ),
  name: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
})

const RemovableUserSchemaBase = z
  .object({
    nationalId: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    wasRemoved: z.string().optional(),
  })
  .refine(
    ({ nationalId, wasRemoved }) => {
      return (
        wasRemoved === 'true' ||
        (nationalId && nationalId.length > 0 && kennitala.isValid(nationalId))
      )
    },
    { path: ['nationalId'] },
  )
  .refine(
    ({ name, wasRemoved }) => {
      return wasRemoved === 'true' || (name && name.length > 0)
    },
    { path: ['name'] },
  )
  .refine(
    ({ email, wasRemoved }) => {
      return wasRemoved === 'true' || (email && email.length > 0)
    },
    { path: ['email'] },
  )
  .refine(
    ({ phone, wasRemoved }) => {
      return wasRemoved === 'true' || (phone && phone.length > 0)
    },
    { path: ['phone'] },
  )

export const UserInformationSchema = z.intersection(
  UserSchemaBase,
  z.object({
    approved: z.boolean().optional(),
  }),
)

export const OperatorInformationSchema = z.intersection(
  RemovableUserSchemaBase,
  z.object({
    approved: z.boolean().optional(),
  }),
)

export const OldOperatorInformationSchema = z.object({
  nationalId: z
    .string()
    .refine((x) => x && x.length !== 0 && kennitala.isValid(x)),
  name: z.string().min(1),
  wasRemoved: z.string().optional(),
  startDate: z.string().optional(),
})

export const RejecterSchema = z.object({
  plate: z.string(),
  name: z.string(),
  nationalId: z.string(),
  type: z.enum(['coOwner', 'operator']),
})

export const ChangeOperatorOfVehicleSchema = z.object({
  approveExternalData: z.boolean().refine((v) => v),
  pickVehicle: z.object({
    vehicle: z.string().optional(),
    plate: z.string().min(1),
    type: z.string().optional(),
    color: z.string().optional(),
  }),
  owner: UserInformationSchema,
  ownerCoOwner: z.array(UserInformationSchema),
  vehicleMileage: z
    .object({
      requireMileage: z.boolean().optional(),
      mileageReading: z.string().optional(),
      value: z.string().optional(),
    })
    .refine(
      (x: VehicleMileage) => {
        if (x.requireMileage) {
          return (
            (x.value !== undefined &&
              x.value !== '' &&
              parseInt(x.value?.split(' ')[0]) > 0 &&
              x.mileageReading === undefined) ||
            Number(x.value) >= Number(x.mileageReading)
          )
        } else {
          return (
            x.value === undefined ||
            x.value === '' ||
            parseInt(x.value?.split(' ')[0]) >= 0
          )
        }
      },
      {
        path: ['value'],
        message: error.invalidMileage.defaultMessage,
      },
    ),
  operators: z.array(OperatorInformationSchema),
  oldOperators: z.array(OldOperatorInformationSchema),
  mainOperator: z.object({
    nationalId: z.string(),
  }),
  rejecter: RejecterSchema,
})
export type ChangeOperatorOfVehicle = z.TypeOf<
  typeof ChangeOperatorOfVehicleSchema
>
