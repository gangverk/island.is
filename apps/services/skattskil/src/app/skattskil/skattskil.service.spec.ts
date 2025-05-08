import { Test } from '@nestjs/testing'

import { SkattskilService } from './skattskil.service'
import { getModelToken } from '@nestjs/sequelize'
import { ThjodskraClientService } from '@island.is/clients/thjodskra'
import { TaxPayer } from './models/taxPayer.model'
import { TaxReturn } from './models/taxReturn.model'
import { Income } from './models/income.model'
import { Assets } from './models/assets.model'
import { Liabilities } from './models/liabilities.model'
import { ResidentialLoan } from './models/residentialLoan.model'
import * as uuid from 'uuid'

// Mock the uuid function
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('test-uuid')
}))

describe('SkattskilService', () => {
  let service: SkattskilService
  let taxPayerModel: typeof TaxPayer
  let taxReturnModel: typeof TaxReturn
  let incomeModel: typeof Income
  let assetsModel: typeof Assets
  let liabilitiesModel: typeof Liabilities
  let residentialLoanModel: typeof ResidentialLoan
  let thjodskraClient: ThjodskraClientService

  const mockPerson = {
    name: 'Jón Jónsson',
    kennitala: '1234567890',
    legalDomicile: 'Aðalstræti 1',
    postalCode: '101',
    city: 'Reykjavík'
  }

  const mockTaxPayer = {
    id: 'tp-123',
    personId: '1234567890',
    phone: '555-1234',
    email: 'jon@example.com',
    bankAccountNumber: '0162-26-123456',
    save: jest.fn().mockResolvedValue(true)
  }

  const mockTaxReturn = {
    id: 'tr-123',
    taxPayerId: 'tp-123',
    fiscalYear: 2023,
    completed: false
  }

  const mockIncome = {
    id: 'inc-123',
    taxReturnId: 'tr-123',
    category: 'Wages',
    description: 'January salary',
    amount: 500000,
    payer: 'Company X',
    update: jest.fn().mockResolvedValue(true),
    destroy: jest.fn().mockResolvedValue(true)
  }

  const mockProperty = {
    propertyNumber: 'prop-123',
    address: 'Aðalstræti 1, 101 Reykjavík',
    appraisal: 50000000
  }

  const mockVehicle = {
    licensePlateNumber: 'AB-123',
    purchaseYear: 2020,
    purchasePrice: 5000000
  }

  const mockLiability = {
    id: 'liab-123',
    taxReturnId: 'tr-123',
    description: 'Credit card debt',
    interestPaid: 120000,
    amountRemaining: 2000000
  }

  const mockResidentialLoan = {
    id: 'loan-123',
    taxReturnId: 'tr-123',
    assetId: 'prop-123',
    purchaseYear: 2015,
    loanId: 'l-123',
    lenderId: '1234567890',
    issueDate: '2015-06-01',
    remainingTermYears: 25,
    interestPaidInFiscalYear: 800000,
    principalPaidInFiscalYear: 1200000,
    remainingPrincipal: 30000000
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SkattskilService,
        {
          provide: getModelToken(TaxPayer),
          useValue: {
            findByPk: jest.fn(),
            findOne: jest.fn()
          }
        },
        {
          provide: getModelToken(TaxReturn),
          useValue: {
            findByPk: jest.fn(),
            findAll: jest.fn()
          }
        },
        {
          provide: getModelToken(Income),
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn()
          }
        },
        {
          provide: getModelToken(Assets),
          useValue: {
            findAll: jest.fn()
          }
        },
        {
          provide: getModelToken(Liabilities),
          useValue: {
            findAll: jest.fn()
          }
        },
        {
          provide: getModelToken(ResidentialLoan),
          useValue: {
            findAll: jest.fn()
          }
        },
        {
          provide: ThjodskraClientService,
          useValue: {
            getPersonById: jest.fn(),
            getPropertyById: jest.fn(),
            getVehicleById: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<SkattskilService>(SkattskilService)
    taxPayerModel = module.get<typeof TaxPayer>(getModelToken(TaxPayer))
    taxReturnModel = module.get<typeof TaxReturn>(getModelToken(TaxReturn))
    incomeModel = module.get<typeof Income>(getModelToken(Income))
    assetsModel = module.get<typeof Assets>(getModelToken(Assets))
    liabilitiesModel = module.get<typeof Liabilities>(getModelToken(Liabilities))
    residentialLoanModel = module.get<typeof ResidentialLoan>(getModelToken(ResidentialLoan))
    thjodskraClient = module.get<ThjodskraClientService>(ThjodskraClientService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getTaxPayerById', () => {
    it('should return null when taxpayer not found', async () => {
      jest.spyOn(taxPayerModel, 'findByPk').mockResolvedValue(null)

      const result = await service.getTaxPayerById('non-existent-id')

      expect(result).toBeNull()
      expect(taxPayerModel.findByPk).toHaveBeenCalledWith('non-existent-id')
      expect(thjodskraClient.getPersonById).not.toHaveBeenCalled()
    })

    it('should return taxpayer data with person details when found', async () => {
      jest.spyOn(taxPayerModel, 'findByPk').mockResolvedValue(mockTaxPayer as any)
      jest.spyOn(thjodskraClient, 'getPersonById').mockResolvedValue(mockPerson)

      const result = await service.getTaxPayerById(mockTaxPayer.id)

      expect(result).toEqual({
        id: mockTaxPayer.id,
        name: mockPerson.name,
        personId: mockTaxPayer.personId,
        address: `${mockPerson.legalDomicile}, ${mockPerson.postalCode} ${mockPerson.city}`,
        phoneNumber: mockTaxPayer.phone,
        emailAddress: mockTaxPayer.email,
        bankAccountNumber: mockTaxPayer.bankAccountNumber,
      })
      expect(taxPayerModel.findByPk).toHaveBeenCalledWith(mockTaxPayer.id)
      expect(thjodskraClient.getPersonById).toHaveBeenCalledWith(mockTaxPayer.personId)
    })

    it('should handle errors from the database', async () => {
      jest.spyOn(taxPayerModel, 'findByPk').mockRejectedValue(new Error('Database error'))

      await expect(service.getTaxPayerById(mockTaxPayer.id)).rejects.toThrow('Database error')
    })

    it('should handle errors from Thjodskra service', async () => {
      jest.spyOn(taxPayerModel, 'findByPk').mockResolvedValue(mockTaxPayer as any)
      jest.spyOn(thjodskraClient, 'getPersonById').mockRejectedValue(new Error('Thjodskra API error'))

      await expect(service.getTaxPayerById(mockTaxPayer.id)).rejects.toThrow('Thjodskra API error')
    })
  })

  describe('updateTaxPayer', () => {
    it('should return null when taxpayer not found', async () => {
      jest.spyOn(taxPayerModel, 'findByPk').mockResolvedValue(null)

      const result = await service.updateTaxPayer('non-existent-id', { phoneNumber: '555-4321' })

      expect(result).toBeNull()
      expect(taxPayerModel.findByPk).toHaveBeenCalledWith('non-existent-id')
    })

    it('should update only the provided fields', async () => {
      const clonedTaxPayer = { ...mockTaxPayer, save: jest.fn().mockResolvedValue(true) }
      jest.spyOn(taxPayerModel, 'findByPk').mockResolvedValue(clonedTaxPayer as any)
      jest.spyOn(thjodskraClient, 'getPersonById').mockResolvedValue(mockPerson)

      const updateData = {
        phoneNumber: '555-4321'
      }

      const result = await service.updateTaxPayer(mockTaxPayer.id, updateData)

      expect(clonedTaxPayer.phone).toBe(updateData.phoneNumber)
      expect(clonedTaxPayer.email).toBe(mockTaxPayer.email) // unchanged
      expect(clonedTaxPayer.bankAccountNumber).toBe(mockTaxPayer.bankAccountNumber) // unchanged
      expect(clonedTaxPayer.save).toHaveBeenCalled()
      expect(result).not.toBeNull()
      expect(result?.phoneNumber).toBe(updateData.phoneNumber)
    })

    it('should update all provided fields', async () => {
      const clonedTaxPayer = { ...mockTaxPayer, save: jest.fn().mockResolvedValue(true) }
      jest.spyOn(taxPayerModel, 'findByPk').mockResolvedValue(clonedTaxPayer as any)
      jest.spyOn(thjodskraClient, 'getPersonById').mockResolvedValue(mockPerson)

      const updateData = {
        phoneNumber: '555-4321',
        emailAddress: 'jon.updated@example.com',
        bankAccountNumber: '0162-26-654321'
      }

      const result = await service.updateTaxPayer(mockTaxPayer.id, updateData)

      expect(clonedTaxPayer.phone).toBe(updateData.phoneNumber)
      expect(clonedTaxPayer.email).toBe(updateData.emailAddress)
      expect(clonedTaxPayer.bankAccountNumber).toBe(updateData.bankAccountNumber)
      expect(clonedTaxPayer.save).toHaveBeenCalled()
      expect(result).not.toBeNull()
      expect(result?.phoneNumber).toBe(updateData.phoneNumber)
      expect(result?.emailAddress).toBe(updateData.emailAddress)
      expect(result?.bankAccountNumber).toBe(updateData.bankAccountNumber)
    })

    it('should handle empty update data', async () => {
      const clonedTaxPayer = { ...mockTaxPayer, save: jest.fn().mockResolvedValue(true) }
      jest.spyOn(taxPayerModel, 'findByPk').mockResolvedValue(clonedTaxPayer as any)
      jest.spyOn(thjodskraClient, 'getPersonById').mockResolvedValue(mockPerson)

      const updateData = {}

      const result = await service.updateTaxPayer(mockTaxPayer.id, updateData)

      expect(clonedTaxPayer.phone).toBe(mockTaxPayer.phone) // unchanged
      expect(clonedTaxPayer.email).toBe(mockTaxPayer.email) // unchanged
      expect(clonedTaxPayer.bankAccountNumber).toBe(mockTaxPayer.bankAccountNumber) // unchanged
      expect(clonedTaxPayer.save).toHaveBeenCalled()
      expect(result).not.toBeNull()
    })
  })

  describe('getTaxPayerByKennitala', () => {
    it('should return null when taxpayer not found', async () => {
      jest.spyOn(taxPayerModel, 'findOne').mockResolvedValue(null)

      const result = await service.getTaxPayerByKennitala('non-existent-kennitala')

      expect(result).toBeNull()
      expect(taxPayerModel.findOne).toHaveBeenCalledWith({
        where: { personId: 'non-existent-kennitala' }
      })
    })

    it('should return taxpayer data with person details when found', async () => {
      jest.spyOn(taxPayerModel, 'findOne').mockResolvedValue(mockTaxPayer as any)
      jest.spyOn(thjodskraClient, 'getPersonById').mockResolvedValue(mockPerson)

      const result = await service.getTaxPayerByKennitala(mockTaxPayer.personId)

      expect(result).toEqual({
        id: mockTaxPayer.id,
        name: mockPerson.name,
        personId: mockTaxPayer.personId,
        address: `${mockPerson.legalDomicile}, ${mockPerson.postalCode} ${mockPerson.city}`,
        phoneNumber: mockTaxPayer.phone,
        emailAddress: mockTaxPayer.email,
        bankAccountNumber: mockTaxPayer.bankAccountNumber,
      })
      expect(taxPayerModel.findOne).toHaveBeenCalledWith({
        where: { personId: mockTaxPayer.personId }
      })
      expect(thjodskraClient.getPersonById).toHaveBeenCalledWith(mockTaxPayer.personId)
    })
  })

  describe('getTaxReturnById', () => {
    it('should return null when tax return not found', async () => {
      jest.spyOn(taxReturnModel, 'findByPk').mockResolvedValue(null)

      const result = await service.getTaxReturnById('non-existent-id')

      expect(result).toBeNull()
      expect(taxReturnModel.findByPk).toHaveBeenCalledWith('non-existent-id', {
        include: [TaxPayer]
      })
    })

    it('should return tax return data when found', async () => {
      jest.spyOn(taxReturnModel, 'findByPk').mockResolvedValue(mockTaxReturn as any)

      const result = await service.getTaxReturnById(mockTaxReturn.id)

      expect(result).toEqual({
        id: mockTaxReturn.id,
        taxPayerId: mockTaxReturn.taxPayerId,
        fiscalYear: mockTaxReturn.fiscalYear,
        completed: mockTaxReturn.completed
      })
      expect(taxReturnModel.findByPk).toHaveBeenCalledWith(mockTaxReturn.id, {
        include: [TaxPayer]
      })
    })
  })

  describe('getTaxReturnsByTaxPayerId', () => {
    it('should return empty array when no tax returns found', async () => {
      jest.spyOn(taxReturnModel, 'findAll').mockResolvedValue([])

      const result = await service.getTaxReturnsByTaxPayerId('tp-123')

      expect(result).toEqual([])
      expect(taxReturnModel.findAll).toHaveBeenCalledWith({
        where: { taxPayerId: 'tp-123' },
        include: [TaxPayer]
      })
    })

    it('should return array of tax returns when found', async () => {
      const mockTaxReturns = [
        mockTaxReturn,
        { ...mockTaxReturn, id: 'tr-124', fiscalYear: 2022 }
      ]
      jest.spyOn(taxReturnModel, 'findAll').mockResolvedValue(mockTaxReturns as any)

      const result = await service.getTaxReturnsByTaxPayerId('tp-123')

      expect(result).toEqual([
        {
          id: mockTaxReturns[0].id,
          taxPayerId: mockTaxReturns[0].taxPayerId,
          fiscalYear: mockTaxReturns[0].fiscalYear,
          completed: mockTaxReturns[0].completed
        },
        {
          id: mockTaxReturns[1].id,
          taxPayerId: mockTaxReturns[1].taxPayerId,
          fiscalYear: mockTaxReturns[1].fiscalYear,
          completed: mockTaxReturns[1].completed
        }
      ])
      expect(taxReturnModel.findAll).toHaveBeenCalledWith({
        where: { taxPayerId: 'tp-123' },
        include: [TaxPayer]
      })
    })
  })

  describe('getIncomeByTaxReturnId', () => {
    it('should return empty array when no income found', async () => {
      jest.spyOn(incomeModel, 'findAll').mockResolvedValue([])

      const result = await service.getIncomeByTaxReturnId('tr-123')

      expect(result).toEqual([])
      expect(incomeModel.findAll).toHaveBeenCalledWith({
        where: { taxReturnId: 'tr-123' }
      })
    })

    it('should return array of income when found', async () => {
      const mockIncomes = [
        mockIncome,
        { ...mockIncome, id: 'inc-124', category: 'Capital gains', amount: 200000 }
      ]
      jest.spyOn(incomeModel, 'findAll').mockResolvedValue(mockIncomes as any)

      const result = await service.getIncomeByTaxReturnId('tr-123')

      expect(result).toEqual([
        {
          id: mockIncomes[0].id,
          taxReturnId: mockIncomes[0].taxReturnId,
          category: mockIncomes[0].category,
          description: mockIncomes[0].description,
          amount: mockIncomes[0].amount,
          payer: mockIncomes[0].payer
        },
        {
          id: mockIncomes[1].id,
          taxReturnId: mockIncomes[1].taxReturnId,
          category: mockIncomes[1].category,
          description: mockIncomes[1].description,
          amount: mockIncomes[1].amount,
          payer: mockIncomes[1].payer
        }
      ])
      expect(incomeModel.findAll).toHaveBeenCalledWith({
        where: { taxReturnId: 'tr-123' }
      })
    })
  })

  describe('createIncome', () => {
    it('should create and return a new income record', async () => {
      // Mock the uuid function to return a specific value
      const mockUuid = 'test-uuid';
      jest.spyOn(uuid, 'v4').mockReturnValue(mockUuid);
      
      const incomeData = {
        taxReturnId: 'tr-123',
        category: 'Wages',
        description: 'January salary',
        amount: 500000,
        payer: 'Company X'
      }
  
      jest.spyOn(incomeModel, 'create').mockResolvedValue({
        id: mockUuid,
        ...incomeData
      } as any);
  
      const result = await service.createIncome(incomeData);
  
      // Expect any string for the id
      expect(result).toEqual({
        id: expect.any(String),
        ...incomeData
      });
      
      //expect(uuid.v4).toHaveBeenCalled();
      expect(incomeModel.create).toHaveBeenCalledWith({
        id: expect.any(String),
        ...incomeData
      });
    });
  });

  describe('getIncomeById', () => {
    it('should return null when income not found', async () => {
      jest.spyOn(incomeModel, 'findOne').mockResolvedValue(null)

      const result = await service.getIncomeById('non-existent-id')

      expect(result).toBeNull()
      expect(incomeModel.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' }
      })
    })

    it('should return income data when found', async () => {
      jest.spyOn(incomeModel, 'findOne').mockResolvedValue(mockIncome as any)

      const result = await service.getIncomeById(mockIncome.id)

      expect(result).toEqual({
        id: mockIncome.id,
        taxReturnId: mockIncome.taxReturnId,
        category: mockIncome.category,
        description: mockIncome.description,
        amount: mockIncome.amount,
        payer: mockIncome.payer
      })
      expect(incomeModel.findOne).toHaveBeenCalledWith({
        where: { id: mockIncome.id }
      })
    })
  })

  describe('updateIncome', () => {
    it('should return null when income not found', async () => {
      jest.spyOn(incomeModel, 'findOne').mockResolvedValue(null)

      const result = await service.updateIncome('non-existent-id', {
        category: 'Updated category',
        amount: 600000,
        payer: 'Updated payer'
      })

      expect(result).toBeNull()
      expect(incomeModel.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' }
      })
    })

    it('should update and return income data when found', async () => {
      const updateData = {
        category: 'Updated category',
        description: 'Updated description',
        amount: 600000,
        payer: 'Updated payer'
      }

      jest.spyOn(incomeModel, 'findOne').mockResolvedValue(mockIncome as any)

      const result = await service.updateIncome(mockIncome.id, updateData)

      expect(mockIncome.update).toHaveBeenCalledWith(updateData)
      expect(result).toEqual({
        id: mockIncome.id,
        taxReturnId: mockIncome.taxReturnId,
        category: mockIncome.category,
        description: mockIncome.description,
        amount: mockIncome.amount,
        payer: mockIncome.payer
      })
    })
  })

  describe('deleteIncome', () => {
    it('should return false when income not found', async () => {
      jest.spyOn(incomeModel, 'findOne').mockResolvedValue(null)

      const result = await service.deleteIncome('non-existent-id')

      expect(result).toBe(false)
      expect(incomeModel.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' }
      })
    })

    it('should delete income and return true when found', async () => {
      jest.spyOn(incomeModel, 'findOne').mockResolvedValue(mockIncome as any)

      const result = await service.deleteIncome(mockIncome.id)

      expect(mockIncome.destroy).toHaveBeenCalled()
      expect(result).toBe(true)
    })
  })

  describe('getRealEstateAssetsByTaxReturnId', () => {
    it('should return empty array when no assets found', async () => {
      jest.spyOn(assetsModel, 'findAll').mockResolvedValue([])

      const result = await service.getRealEstateAssetsByTaxReturnId('tr-123')

      expect(result).toEqual([])
      expect(assetsModel.findAll).toHaveBeenCalledWith({
        where: { taxReturnId: 'tr-123', assetType: 'real_estate' }
      })
    })

    it('should return array of real estate assets when found', async () => {
      const mockAssets = [
        { assetId: 'prop-123', taxReturnId: 'tr-123', assetType: 'real_estate' },
        { assetId: 'prop-124', taxReturnId: 'tr-123', assetType: 'real_estate' }
      ]
      const mockProperties = [
        mockProperty,
        { ...mockProperty, propertyNumber: 'prop-124', address: 'Bankastræti 5', appraisal: 60000000 }
      ]
      
      jest.spyOn(assetsModel, 'findAll').mockResolvedValue(mockAssets as any)
      jest.spyOn(thjodskraClient, 'getPropertyById').mockImplementation((assetId) => {
        const property = mockProperties.find(p => p.propertyNumber === assetId)
        if (property) {
          return Promise.resolve({
            propertyNumber: property.propertyNumber,
            address: property.address,
            appraisal: property.appraisal,
          } as any)
        }
        return Promise.reject(new Error('Property not found'))
      })

      const result = await service.getRealEstateAssetsByTaxReturnId('tr-123')

      expect(result).toEqual([
        {
          realEstateAssetId: mockAssets[0].assetId,
          address: mockProperties[0].address,
          estimatedValue: mockProperties[0].appraisal
        },
        {
          realEstateAssetId: mockAssets[1].assetId,
          address: mockProperties[1].address,
          estimatedValue: mockProperties[1].appraisal
        }
      ])
    })
  })

  describe('getVehicleAssetsByTaxReturnId', () => {
    it('should return empty array when no assets found', async () => {
      jest.spyOn(assetsModel, 'findAll').mockResolvedValue([])

      const result = await service.getVehicleAssetsByTaxReturnId('tr-123')

      expect(result).toEqual([])
      expect(assetsModel.findAll).toHaveBeenCalledWith({
        where: { taxReturnId: 'tr-123', assetType: 'vehicle' }
      })
    })
  })

  describe('getLiabilitiesByTaxReturnId', () => {
    it('should return empty array when no liabilities found', async () => {
      jest.spyOn(liabilitiesModel, 'findAll').mockResolvedValue([])

      const result = await service.getLiabilitiesByTaxReturnId('tr-123')

      expect(result).toEqual([])
      expect(liabilitiesModel.findAll).toHaveBeenCalledWith({
        where: { taxReturnId: 'tr-123' }
      })
    })

    it('should return array of liabilities when found', async () => {
      const mockLiabilities = [
        mockLiability,
        { ...mockLiability, id: 'liab-124', description: 'Student loan', interestPaid: 80000, amountRemaining: 1500000 }
      ]
      
      jest.spyOn(liabilitiesModel, 'findAll').mockResolvedValue(mockLiabilities as any)

      const result = await service.getLiabilitiesByTaxReturnId('tr-123')

      expect(result).toEqual([
        {
          id: mockLiabilities[0].id,
          taxReturnId: mockLiabilities[0].taxReturnId,
          description: mockLiabilities[0].description,
          interestPaid: mockLiabilities[0].interestPaid,
          amountRemaining: mockLiabilities[0].amountRemaining
        },
        {
          id: mockLiabilities[1].id,
          taxReturnId: mockLiabilities[1].taxReturnId,
          description: mockLiabilities[1].description,
          interestPaid: mockLiabilities[1].interestPaid,
          amountRemaining: mockLiabilities[1].amountRemaining
        }
      ])
    })
  })

  describe('getResidentialLoansByTaxReturnId', () => {
    it('should return empty array when no loans found', async () => {
      jest.spyOn(residentialLoanModel, 'findAll').mockResolvedValue([])

      const result = await service.getResidentialLoansByTaxReturnId('tr-123')

      expect(result).toEqual([])
      expect(residentialLoanModel.findAll).toHaveBeenCalledWith({
        where: { taxReturnId: 'tr-123' }
      })
    })

    it('should return array of residential loans when found', async () => {
      const mockLoans = [
        mockResidentialLoan,
        { ...mockResidentialLoan, id: 'loan-124', loanId: 'l-124' }
      ]
      
      jest.spyOn(residentialLoanModel, 'findAll').mockResolvedValue(mockLoans as any)
      jest.spyOn(thjodskraClient, 'getPropertyById').mockResolvedValue(mockProperty)
      jest.spyOn(thjodskraClient, 'getPersonById').mockResolvedValue(mockPerson)

      const result = await service.getResidentialLoansByTaxReturnId('tr-123')

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        id: mockLoans[0].id,
        taxReturnId: mockLoans[0].taxReturnId,
        purchaseYear: mockLoans[0].purchaseYear.toString(),
        address: mockProperty.address,
        loanId: mockLoans[0].loanId,
        lenderId: mockLoans[0].lenderId,
        lenderName: mockPerson.name,
        issueDate: mockLoans[0].issueDate,
        remainingTermYears: mockLoans[0].remainingTermYears.toString(),
        totalAmountPaidInFiscalYear: mockLoans[0].interestPaidInFiscalYear + mockLoans[0].principalPaidInFiscalYear,
        interestPaidInFiscalYear: mockLoans[0].interestPaidInFiscalYear,
        principalPaidInFiscalYear: mockLoans[0].principalPaidInFiscalYear,
        remainingPrincipal: mockLoans[0].remainingPrincipal
      })
    })
  })
})