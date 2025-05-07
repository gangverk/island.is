import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { v4 as uuid } from 'uuid'
import { TaxPayer } from './models/taxPayer.model'
import { TaxReturn } from './models/taxReturn.model'
import { Income } from './models/income.model'
import { Assets } from './models/assets.model'
import { Liabilities } from './models/liabilities.model'
import { ResidentialLoan } from './models/residentialLoan.model'
import { TaxPayerDTO, TaxReturnDTO, IncomeDTO, LiabilitiesDTO, ResidentialLoanDTO, RealEstateDTO, VehicleDTO } from './dto/skattskil.response'
import { ThjodskraService } from '../thjodskra/thjodskra.service'

@Injectable()
export class SkattskilService {
  constructor(
    @InjectModel(TaxPayer)
    private readonly taxPayerModel: typeof TaxPayer,
    @InjectModel(TaxReturn)
    private readonly taxReturnModel: typeof TaxReturn,
    @InjectModel(Income)
    private readonly incomeModel: typeof Income,
    @InjectModel(Assets)
    private readonly assetsModel: typeof Assets,
    @InjectModel(Liabilities)
    private readonly liabilitiesModel: typeof Liabilities,
    @InjectModel(ResidentialLoan)
    private readonly residentialLoanModel: typeof ResidentialLoan,
    private thjodskra: ThjodskraService
  ) {}

  // Get TaxPayer by ID
  async getTaxPayerById(id: string): Promise<TaxPayerDTO | null> {
    const taxPayer = await this.taxPayerModel.findByPk(id)
    if (!taxPayer) {
      return null
    }
    // Fetch additional data from Thjodskra
    const person = await this.thjodskra.getPersonById(taxPayer.personId)
    if (!person) {
      return null
    }

    return {
      id: taxPayer.id,
      name: person.name,
      personId: taxPayer.personId,
      address: `${person.legalDomicile}, ${person.postalCode} ${person.city}`,
      phoneNumber: taxPayer.phone,
      emailAddress: taxPayer.email,
      bankAccountNumber: taxPayer.bankAccountNumber,
    }
  }

  async updateTaxPayer(
    id: string,
    updateData: { phoneNumber?: string; emailAddress?: string, bankAccountNumber?: string }
  ): Promise<TaxPayerDTO | null> {
    const taxPayer = await this.taxPayerModel.findByPk(id);

    if (!taxPayer) {
      return null;
    }

    // Update only the fields provided
    if (updateData.phoneNumber !== undefined) {
      taxPayer.phone = updateData.phoneNumber;
    }

    if (updateData.emailAddress !== undefined) {
      taxPayer.email = updateData.emailAddress;
    }

    if (updateData.bankAccountNumber !== undefined) {
      taxPayer.bankAccountNumber = updateData.bankAccountNumber;
    }

    // Save the changes
    await taxPayer.save();

    // Fetch the updated data including information from Thjodskra
    const person = await this.thjodskra.getPersonById(taxPayer.personId);
    if (!person) {
      return null;
    }

    // Return the complete updated DTO
    return {
      id: taxPayer.id,
      name: person.name,
      personId: taxPayer.personId,
      address: `${person.legalDomicile}, ${person.postalCode} ${person.city}`,
      phoneNumber: taxPayer.phone,
      emailAddress: taxPayer.email,
      bankAccountNumber: taxPayer.bankAccountNumber,
    };
  }

  // Get TaxPayer by kennitala
  async getTaxPayerByKennitala(kennitala: string): Promise<TaxPayerDTO | null> {
    const taxPayer = await this.taxPayerModel.findOne({ where : { personId: kennitala } })
    if (!taxPayer) {
      return null
    }
    // Fetch additional data from Thjodskra
    const person = await this.thjodskra.getPersonById(taxPayer.personId)
    if (!person) {
      return null
    }

    return {
      id: taxPayer.id,
      name: person.name,
      personId: taxPayer.personId,
      address: `${person.legalDomicile}, ${person.postalCode} ${person.city}`,
      phoneNumber: taxPayer.phone,
      emailAddress: taxPayer.email,
      bankAccountNumber: taxPayer.bankAccountNumber,
    }
  }

  // Get TaxReturn by ID
  async getTaxReturnById(id: string): Promise<TaxReturnDTO | null> {
    const taxReturn = await this.taxReturnModel.findByPk(id, {
      include: [TaxPayer],
    })
    if (!taxReturn) {
      return null
    }
    return {
      id: taxReturn.id,
      taxPayerId: taxReturn.taxPayerId,
      fiscalYear: taxReturn.fiscalYear,
      completed: taxReturn.completed,
    }
  }

  // Get all TaxReturns by TaxPayer ID
  async getTaxReturnsByTaxPayerId(taxPayerId: string): Promise<TaxReturnDTO[]> {
    const taxReturns = await this.taxReturnModel.findAll({
      where: { taxPayerId },
      include: [TaxPayer],
    });

    return taxReturns.map(taxReturn => ({
      id: taxReturn.id,
      taxPayerId: taxReturn.taxPayerId,
      fiscalYear: taxReturn.fiscalYear,
      completed: taxReturn.completed,
    }));
  }

  // Get Income by TaxReturn ID
  async getIncomeByTaxReturnId(taxReturnId: string): Promise<IncomeDTO[]> {
    const incomes = await this.incomeModel.findAll({ where: { taxReturnId } })
    return incomes.map((income) => ({
      id: income.id,
      taxReturnId: income.taxReturnId,
      category: income.category,
      description: income.description,
      amount: income.amount,
      payer: income.payer,
    }))
  }

  // Create a new income
  async createIncome(incomeData: {
    taxReturnId: string;
    category: string;
    description?: string;
    amount: number;
    payer: string
  }): Promise<IncomeDTO> {
    // Generate a new UUID for the income record
    const id = uuid();

    const income = await this.incomeModel.create({
      id,
      ...incomeData
    });

    return {
      id: income.id,
      taxReturnId: income.taxReturnId,
      category: income.category,
      description: income.description,
      amount: income.amount,
      payer: income.payer
    };
  }

  async getIncomeById(id: string): Promise<IncomeDTO | null> {
    const income = await this.incomeModel.findOne({
      where: { id }
    });

    if (!income) {
      return null;
    }

    return {
      id: income.id,
      taxReturnId: income.taxReturnId,
      category: income.category,
      description: income.description,
      amount: income.amount,
      payer: income.payer
    };
  }

  async updateIncome(
    id: string,
    incomeData: {
      category: string;
      description?: string;
      amount: number;
      payer: string
    }
  ): Promise<IncomeDTO | null> {
    const income = await this.incomeModel.findOne({
      where: { id }
    });

    if (!income) {
      return null;
    }

    await income.update(incomeData);

    return {
      id: income.id,
      taxReturnId: income.taxReturnId,
      category: income.category,
      description: income.description,
      amount: income.amount,
      payer: income.payer
    };
  }

  async deleteIncome(id: string): Promise<boolean> {
    const income = await this.incomeModel.findOne({
      where: { id }
    });

    if (!income) {
      return false;
    }

    await income.destroy();

    return true;
  }

  // Get Assets by TaxReturn ID
  async getRealEstateAssetsByTaxReturnId(taxReturnId: string): Promise<RealEstateDTO[]> {
    const assets = await this.assetsModel.findAll({ where: { taxReturnId, assetType: "real_estate"  } })
    const realEstates = await this.thjodskra.getPropertiesByIds(assets.map((asset) => asset.assetId))
    if (!realEstates) {
      return []
    }

    const propertyMap = realEstates.reduce((map, property) => {
      map[property.propertyNumber] = property;
      return map;
    }, {} as Record<string, any>);

    return assets.map(asset => {
      const property = propertyMap[asset.assetId];

      if (!property) {
        return null;
      }

      return {
        realEstateAssetId: asset.assetId,
        address: property.address,
        estimatedValue: property.appraisal,
      };
    })
    .filter((vehicle): vehicle is RealEstateDTO => vehicle !== null);;
  }

  async getVehicleAssetsByTaxReturnId(taxReturnId: string): Promise<VehicleDTO[]> {
    const assets = await this.assetsModel.findAll({ where: { taxReturnId, assetType: "vehicle" } })
    const vehicles = await this.thjodskra.getVehiclesByIds(assets.map(asset => asset.assetId));

    const vehicleMap = vehicles.reduce((map, vehicle) => {
      map[vehicle.licensePlateNumber] = vehicle;
      return map;
    }, {} as Record<string, any>);


    return assets
      .map(asset => {
        const vehicle = vehicleMap[asset.assetId];

        if (!vehicle) {
          return null;
        }

        return {
          vehicleAssetId: asset.assetId,
          registrationNumber: vehicle.licensePlateNumber,
          yearOfPurchase: vehicle.purchaseYear,
          purchaseAmount: vehicle.purchasePrice,
        };
      })
      .filter((vehicle): vehicle is VehicleDTO => vehicle !== null);
  }

  // Get Liabilities by TaxReturn ID
  async getLiabilitiesByTaxReturnId(taxReturnId: string): Promise<LiabilitiesDTO[]> {
    const liabilities = await this.liabilitiesModel.findAll({ where: { taxReturnId } })
    return liabilities.map((liability) => ({
      id: liability.id,
      taxReturnId: liability.taxReturnId,
      description: liability.description,
      interestPaid: liability.interestPaid,
      amountRemaining: liability.amountRemaining,
    }))
  }

  // Get Residential Loans by TaxReturn ID
  async getResidentialLoansByTaxReturnId(taxReturnId: string): Promise<ResidentialLoanDTO[]> {
    const loans = await this.residentialLoanModel.findAll({ where: { taxReturnId } })
    return loans.map((loan) => ({
      id: loan.id,
      taxReturnId: loan.taxReturnId,
      assetId: loan.assetId,
      lenderId: loan.lenderId,
      issueDate: loan.issueDate,
      remainingTermYears: loan.remainingTermYears,
      interestPaidInFiscalYear: loan.interestPaidInFiscalYear,
      principalPaidInFiscalYear: loan.principalPaidInFiscalYear,
      remainingPrincipal: loan.remainingPrincipal,
    }))
  }
  /*
  // Update an existing TaxPayer
  async updateTaxPayer(id: string, data: Partial<TaxPayerDTO>): Promise<TaxPayerDTO | null> {
    const taxPayer = await this.taxPayerModel.findByPk(id)
    if (!taxPayer) {
      return null
    }
    await taxPayer.update(data)
    return {
      id: taxPayer.id,
      personId: taxPayer.personId,
      phone: taxPayer.phone,
      email: taxPayer.email,
    }
  }

  // Create a new TaxReturn
  async createTaxReturn(data: TaxReturnDTO): Promise<TaxReturnDTO> {
    const taxReturn = await this.taxReturnModel.create(data)
    return {
      id: taxReturn.id,
      taxPayerId: taxReturn.taxPayerId,
      fiscalYear: taxReturn.fiscalYear,
      completed: taxReturn.completed,
    }
  }

  // Update an existing TaxReturn
  async updateTaxReturn(id: string, data: Partial<TaxReturnDTO>): Promise<TaxReturnDTO | null> {
    const taxReturn = await this.taxReturnModel.findByPk(id)
    if (!taxReturn) {
      return null
    }
    await taxReturn.update(data)
    return {
      id: taxReturn.id,
      taxPayerId: taxReturn.taxPayerId,
      fiscalYear: taxReturn.fiscalYear,
      completed: taxReturn.completed,
    }
  }

  // Create a new Income
  async createIncome(data: IncomeDTO): Promise<IncomeDTO> {
    const income = await this.incomeModel.create(data)
    return {
      id: income.id,
      taxReturnId: income.taxReturnId,
      category: income.category,
      description: income.description,
      amount: income.amount,
      payer: income.payer,
    }
  }

  // Update an existing Income
  async updateIncome(id: string, data: Partial<IncomeDTO>): Promise<IncomeDTO | null> {
    const income = await this.incomeModel.findByPk(id)
    if (!income) {
      return null
    }
    await income.update(data)
    return {
      id: income.id,
      taxReturnId: income.taxReturnId,
      category: income.category,
      description: income.description,
      amount: income.amount,
      payer: income.payer,
    }
  }

  // Create a new Asset
  async createAsset(data: AssetsDTO): Promise<AssetsDTO> {
    const asset = await this.assetsModel.create(data)
    return {
      id: asset.id,
      taxReturnId: asset.taxReturnId,
      assetType: asset.assetType,
      assetId: asset.assetId,
    }
  }

  // Update an existing Asset
  async updateAsset(id: string, data: Partial<AssetsDTO>): Promise<AssetsDTO | null> {
    const asset = await this.assetsModel.findByPk(id)
    if (!asset) {
      return null
    }
    await asset.update(data)
    return {
      id: asset.id,
      taxReturnId: asset.taxReturnId,
      assetType: asset.assetType,
      assetId: asset.assetId,
    }
  }

  // Create a new Liability
  async createLiability(data: LiabilitiesDTO): Promise<LiabilitiesDTO> {
    const liability = await this.liabilitiesModel.create(data)
    return {
      id: liability.id,
      taxReturnId: liability.taxReturnId,
      description: liability.description,
      interestPaid: liability.interestPaid,
      amountRemaining: liability.amountRemaining,
    }
  }

  // Update an existing Liability
  async updateLiability(id: string, data: Partial<LiabilitiesDTO>): Promise<LiabilitiesDTO | null> {
    const liability = await this.liabilitiesModel.findByPk(id)
    if (!liability) {
      return null
    }
    await liability.update(data)
    return {
      id: liability.id,
      taxReturnId: liability.taxReturnId,
      description: liability.description,
      interestPaid: liability.interestPaid,
      amountRemaining: liability.amountRemaining,
    }
  }

  // Create a new Residential Loan
  async createResidentialLoan(data: ResidentialLoanDTO): Promise<ResidentialLoanDTO> {
    const loan = await this.residentialLoanModel.create(data)
    return {
      id: loan.id,
      taxReturnId: loan.taxReturnId,
      assetId: loan.assetId,
      lenderId: loan.lenderId,
      issueDate: loan.issueDate,
      remainingTermYears: loan.remainingTermYears,
      amountPaidInFiscalYear: loan.amountPaidInFiscalYear,
      interestComponent: loan.interestComponent,
      principalComponent: loan.principalComponent,
      remainingPrincipal: loan.remainingPrincipal,
    }
  }

  // Update an existing Residential Loan
  async updateResidentialLoan(id: string, data: Partial<ResidentialLoanDTO>): Promise<ResidentialLoanDTO | null> {
    const loan = await this.residentialLoanModel.findByPk(id)
    if (!loan) {
      return null
    }
    await loan.update(data)
    return {
      id: loan.id,
      taxReturnId: loan.taxReturnId,
      assetId: loan.assetId,
      lenderId: loan.lenderId,
      issueDate: loan.issueDate,
      remainingTermYears: loan.remainingTermYears,
      amountPaidInFiscalYear: loan.amountPaidInFiscalYear,
      interestComponent: loan.interestComponent,
      principalComponent: loan.principalComponent,
      remainingPrincipal: loan.remainingPrincipal,
    }
  }*/
}
