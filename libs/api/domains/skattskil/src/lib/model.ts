import {
  ObjectType,
  Field,
  ID,
  InputType,
  Float,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType()
export class Money {
  @Field(() => Float)
  amount!: number;
}

@InputType()
export class MoneyInput {
  @Field(() => Float)
  amount!: number;
}


// Enums
export enum TaxReturnIncomeCategory {
  SALARY = 'SALARY',
  PER_DIEM = 'PER_DIEM',
  GRANT = 'GRANT',
}

registerEnumType(TaxReturnIncomeCategory, {
  name: 'TaxReturnIncomeCategory',
});

// Entities
@ObjectType()
export class TaxPayer {
  @Field(() => ID)
  taxPayerID!: string;

  @Field()
  name!: string;

  @Field()
  kennitala!: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  emailAddress?: string;

  @Field({ nullable: true })
  bankAccountNumber?: string;

  @Field(() => [TaxReturn])
  taxReturns!: TaxReturn[];
}

@ObjectType()
export class TaxReturn {
  @Field(() => ID)
  taxReturnID!: string;

  @Field()
  fiscalYear!: string;

  @Field(() => [TaxReturnIncome])
  income!: TaxReturnIncome[];

  @Field(() => [TaxReturnIcelandicRealEstate])
  realEstateAssets!: TaxReturnIcelandicRealEstate[];

  @Field(() => [TaxReturnVehicle])
  vehicleAssets!: TaxReturnVehicle[];

  @Field(() => [TaxReturnGenericLiability])
  liabilities!: TaxReturnGenericLiability[];

  @Field(() => [TaxReturnResidentialLoan])
  residentialLoans!: TaxReturnResidentialLoan[];
}

@ObjectType()
export class TaxReturnIncome {
  @Field(() => ID)
  incomeID!: string;

  @Field(() => TaxReturnIncomeCategory)
  category!: TaxReturnIncomeCategory;

  @Field()
  description!: string;

  @Field(() => Money)
  amount!: Money;

  @Field()
  payer!: string;
}

@ObjectType()
export class TaxReturnIcelandicRealEstate {
  @Field(() => ID)
  realEstateAssetID!: string;

  // Specific fields for Icelandic real estate
  @Field()
  address!: string;

  @Field(() => Money)
  estimatedValue!: Money;
}

@ObjectType()
export class TaxReturnVehicle {
  @Field(() => ID)
  vehicleAssetID!: string;

  @Field(() => String)
  registrationNumber!: string;

  @Field(() => String)
  yearOfPurchase!: string;

  @Field(() => Money)
  purchaseAmount!: Money;
}

@ObjectType()
export class TaxReturnGenericLiability {
  @Field(() => ID)
  liabilityID!: string;

  @Field()
  description!: string;

  @Field(() => Money)
  interestPaid!: Money;

  @Field(() => Money)
  amountRemaining!: Money;
}

@ObjectType()
export class TaxReturnResidentialLoan {
  @Field(() => ID)
  residentialLoanID!: string;

  @Field()
  yearOfPurchase!: string;

  @Field()
  address!: string;

  @Field()
  lenderKennitala!: string;

  @Field()
  lenderName!: string;

  @Field()
  loanNumber!: string;

  @Field()
  dateOfIssuance!: string;

  @Field()
  remainingTermYears!: string;

  @Field(() => Money)
  amountPaidInFiscalYear!: Money;

  @Field(() => Money)
  interestPaidInFiscalYear!: Money;
}

@InputType()
export class TaxReturnIncomeInput {
  @Field(() => TaxReturnIncomeCategory)
  category!: TaxReturnIncomeCategory;

  @Field()
  description!: string;

  @Field(() => MoneyInput)
  amount!: MoneyInput;

  @Field()
  payer!: string;
}

@ObjectType()
export class MutationSuccess {
  @Field()
  success!: boolean;
}

