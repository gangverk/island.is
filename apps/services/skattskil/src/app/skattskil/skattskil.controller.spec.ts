import request from 'supertest'
import { TestApp, testServer, useDatabase } from '@island.is/testing/nest'
import { AppModule } from '../app.module'
import { SkattskilService } from './skattskil.service'
import { SequelizeConfigService } from '../../sequelizeConfig.service'
import {
  TaxPayerDTO,
  TaxReturnDTO,
  IncomeDTO,
  RealEstateDTO,
  VehicleDTO,
  LiabilitiesDTO,
  ResidentialLoanDTO
} from './dto/skattskil.response';
import {
  TaxPayerInputDTO,
  IncomeInputDTO
} from './dto/skattskil.request';

describe('SkattskilController', () => {
  let app: TestApp
  let server: request.SuperTest<request.Test>
  let skattskilService: SkattskilService

  // Mock taxPayer based on TaxPayerDTO
  const mockTaxPayer: TaxPayerDTO = {
    id: 'taxpayer-1',
    personId: '1234567890',
    name: 'John Doe',
    address: '123 Main St',
    phoneNumber: '555-1234',
    emailAddress: 'john@example.com',
    bankAccountNumber: '0123-26-123456'
  };

  // Mock taxReturn based on TaxReturnDTO
  const mockTaxReturn: TaxReturnDTO = {
    id: 'taxreturn-1',
    taxPayerId: 'taxpayer-1',
    fiscalYear: 2023,
    completed: false
  };

  // Mock income based on IncomeDTO
  const mockIncome: IncomeDTO = {
    id: 'income-1',
    taxReturnId: 'taxreturn-1',
    category: 'salary',
    description: 'Annual salary',
    amount: 5000000,
    payer: 'Company XYZ'
  };

  // Mock realEstate based on RealEstateDTO and tests expectations
  const mockRealEstate: RealEstateDTO = {
    realEstateAssetId: 'F1234567',
    address: '456 Oak St',
    estimatedValue: 50000000
  };

  // Mock vehicle based on VehicleDTO
  const mockVehicle: VehicleDTO = {
    vehicleAssetId: 'vehicle-1',
    registrationNumber: 'ABC123',
    yearOfPurchase: '2020',
    purchaseAmount: 8000000
  };

  // Mock liabilities based on LiabilitiesDTO 
  const mockLiabilities: LiabilitiesDTO = {
    id: 'liability-1',
    taxReturnId: 'taxreturn-1',
    description: 'Skuld',
    interestPaid: 3000000,
    amountRemaining: 20000000
  };

  // Mock residentialLoan based on ResidentialLoanDTO
  const mockResidentialLoan: ResidentialLoanDTO = {
    id: 'resloan-1',
    taxReturnId: 'taxreturn-1',
    purchaseYear: '2020',
    address: '456 Oak St',
    loanId: 'loan-123',
    lenderId: 'lender-1',
    lenderName: 'Landsbankinn',
    issueDate: new Date('2020-01-15'),
    remainingTermYears: '25',
    totalAmountPaidInFiscalYear: 4500000,
    interestPaidInFiscalYear: 1500000,
    principalPaidInFiscalYear: 3000000,
    remainingPrincipal: 35000000
  };

  // Mock input DTOs
  const mockTaxPayerInput: TaxPayerInputDTO = {
    phoneNumber: '555-5678',
    emailAddress: 'john.updated@example.com',
    bankAccountNumber: '0123-26-999999'
  };

  const mockIncomeInput: IncomeInputDTO = {
    description: 'Annual salary',
    amount: 5000000,
    payer: 'Company XYZ'
  };

  beforeAll(async () => {
    app = await testServer({
      appModule: AppModule,
      enableVersioning: true,
      hooks: [
        useDatabase({ type: 'postgres', provider: SequelizeConfigService }),
      ],
    })
    server = request(app.getHttpServer())
    skattskilService = app.get<SkattskilService>(SkattskilService)

    jest.spyOn(skattskilService, 'getTaxPayerById').mockResolvedValue(mockTaxPayer);
    jest.spyOn(skattskilService, 'getTaxPayerByKennitala').mockResolvedValue(mockTaxPayer);
    /*jest.spyOn(skattskilService, 'updateTaxPayer').mockResolvedValue({
      ...mockTaxPayer,
      name: mockTaxPayerInput.name,
      address: mockTaxPayerInput.address,
      email: mockTaxPayerInput.emailAddress,
      phoneNumber: mockTaxPayerInput.phoneNumber,
      bankAccountNumber: mockTaxPayerInput.bankAccountNumber
    });*/
    jest.spyOn(skattskilService, 'getTaxReturnsByTaxPayerId').mockResolvedValue([mockTaxReturn]);
    jest.spyOn(skattskilService, 'getTaxReturnById').mockResolvedValue(mockTaxReturn);
    jest.spyOn(skattskilService, 'getIncomeByTaxReturnId').mockResolvedValue([mockIncome]);
    jest.spyOn(skattskilService, 'getIncomeById').mockResolvedValue(mockIncome);
    jest.spyOn(skattskilService, 'createIncome').mockResolvedValue(mockIncome);
    jest.spyOn(skattskilService, 'updateIncome').mockResolvedValue(mockIncome);
    jest.spyOn(skattskilService, 'deleteIncome').mockResolvedValue(true);
    jest.spyOn(skattskilService, 'getRealEstateAssetsByTaxReturnId').mockResolvedValue([mockRealEstate]);
    jest.spyOn(skattskilService, 'getVehicleAssetsByTaxReturnId').mockResolvedValue([mockVehicle]);
    jest.spyOn(skattskilService, 'getLiabilitiesByTaxReturnId').mockResolvedValue([mockLiabilities]);
    jest.spyOn(skattskilService, 'getResidentialLoansByTaxReturnId').mockResolvedValue([mockResidentialLoan]);
  })


  afterAll(async () => {
    await app?.cleanUp()
  })

  describe('GET /skattskil/taxpayers/:id', () => {
    it('should return taxpayer information', async () => {
      const response = await server.get('/v1/skattskil/taxpayers/taxpayer-1')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        "address": "123 Main St",
        "bankAccountNumber": "0123-26-123456",
        "emailAddress": "john@example.com",
        "id": "taxpayer-1",
        "name": "John Doe",
        "personId": "1234567890",
        "phoneNumber": "555-1234",
      })
    })

    it('should return 404 when taxpayer is not found', async () => {
      jest.spyOn(skattskilService, 'getTaxPayerById').mockResolvedValueOnce(null)

      const response = await server.get('/v1/skattskil/taxpayers/nonexistent-id')

      expect(response.status).toBe(404)
      expect(response.body.message).toContain('not found')
    })

    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getTaxPayerById').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.get('/v1/skattskil/taxpayers/taxpayer-1')

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('An unexpected error occurred')
    })
  })


  describe('GET /skattskil/taxpayers/by-kennitala/:kennitala', () => {

    it('should return 404 when taxpayer is not found', async () => {
      jest.spyOn(skattskilService, 'getTaxPayerByKennitala').mockResolvedValueOnce(null)

      const response = await server.get('/v1/skattskil/taxpayers/by-kennitala/nonexistent')

      expect(response.status).toBe(404)
      expect(response.body.message).toContain('not found')
    })

    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getTaxPayerByKennitala').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.get('/v1/skattskil/taxpayers/by-kennitala/1234567890')

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('An unexpected error occurred')
    })
  })

  describe('GET /skattskil/taxpayers/:taxPayerId/tax-returns', () => {
    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getTaxReturnsByTaxPayerId').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.get('/v1/skattskil/taxpayers/taxpayer-1/tax-returns')

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('An unexpected error occurred')
    })
  })

  describe('GET /skattskil/tax-returns/:id', () => {
    it('should return 404 when tax return is not found', async () => {
      jest.spyOn(skattskilService, 'getTaxReturnById').mockResolvedValueOnce(null)

      const response = await server.get('/v1/skattskil/tax-returns/nonexistent-id')

      expect(response.status).toBe(404)
      expect(response.body.message).toContain('not found')
    })

    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getTaxReturnById').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1')

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('An unexpected error occurred')
    })
  })

  describe('GET /skattskil/tax-returns/:taxReturnId/income', () => {
    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getIncomeByTaxReturnId').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1/income')

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('An unexpected error occurred')
    })
  })

  describe('POST /skattskil/tax-returns/:taxReturnId/income/salary', () => {
    it('should return 404 when tax return is not found', async () => {
      jest.spyOn(skattskilService, 'getTaxReturnById').mockResolvedValueOnce(null)

      const response = await server
        .post('/v1/skattskil/tax-returns/nonexistent-id/income/salary')
        .send(mockIncomeInput)

      expect(response.status).toBe(404)
      expect(response.body.message).toContain('not found')
    })

    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getTaxReturnById').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server
        .post('/v1/skattskil/tax-returns/taxreturn-1/income/salary')
        .send(mockIncomeInput)

      expect(response.status).toBe(500)
      expect(response.body.message).toContain('unexpected error')
    })
  })

  describe('DELETE /skattskil/tax-returns/income/:id', () => {
    it('should delete an income record', async () => {
      const response = await server.delete('/v1/skattskil/tax-returns/income/income-1')

      expect(response.status).toBe(204)
    })

    it('should return 404 when income record is not found', async () => {
      jest.spyOn(skattskilService, 'getIncomeById').mockResolvedValueOnce(null)

      const response = await server.delete('/v1/skattskil/tax-returns/income/nonexistent-id')

      expect(response.status).toBe(404)
      expect(response.body.message).toContain('not found')
    })

    it('should return 404 when income record could not be deleted', async () => {
      jest.spyOn(skattskilService, 'deleteIncome').mockResolvedValueOnce(false)

      const response = await server.delete('/v1/skattskil/tax-returns/income/income-1')

      expect(response.status).toBe(404)
      expect(response.body.message).toContain('could not be deleted')
    })

    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getIncomeById').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.delete('/v1/skattskil/tax-returns/income/income-1')

      expect(response.status).toBe(500)
      expect(response.body.message).toContain('unexpected error')
    })
  })

  describe('GET /skattskil/tax-returns/:taxReturnId/assets/real-estate', () => {
    it('should return real estate assets for a tax return', async () => {
      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1/assets/real-estate')

      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        {
          estimatedValue: 50000000,
          realEstateAssetId: "F1234567",
          address: "456 Oak St",
        }
      ])
    })

    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getRealEstateAssetsByTaxReturnId').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1/assets/real-estate')

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('An unexpected error occurred')
    })
  })

  describe('GET /skattskil/tax-returns/:taxReturnId/assets/vehicles', () => {
    it('should return vehicle assets for a tax return', async () => {
      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1/assets/vehicles')

      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        {
          purchaseAmount: 8000000,
          registrationNumber: 'ABC123',
          vehicleAssetId: 'vehicle-1',
          yearOfPurchase: '2020',
        }
      ])
    })

    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getVehicleAssetsByTaxReturnId').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1/assets/vehicles')

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('An unexpected error occurred')
    })
  })

  describe('GET /skattskil/tax-returns/:taxReturnId/liabilities', () => {
    it('should return liabilities for a tax return', async () => {
      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1/liabilities')

      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        {
          id: 'liability-1',
          amountRemaining: 20000000,
          taxReturnId: 'taxreturn-1',
          description: 'Skuld',
          interestPaid: 3000000,
        }
      ])
    })

    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getLiabilitiesByTaxReturnId').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1/liabilities')

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('An unexpected error occurred')
    })
  })

  describe('GET /skattskil/tax-returns/:taxReturnId/residential-loans', () => {
    it('should return residential loans for a tax return', async () => {
      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1/residential-loans')

      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        {
          address: "456 Oak St",
          id: "resloan-1",
          interestPaidInFiscalYear: 1500000,
          issueDate: "2020-01-15T00:00:00.000Z",
          lenderId: "lender-1",
          lenderName: "Landsbankinn",
          loanId: "loan-123",
          principalPaidInFiscalYear: 3000000,
          purchaseYear: "2020",
          remainingPrincipal: 35000000,
          remainingTermYears: "25",
          taxReturnId: "taxreturn-1",
          totalAmountPaidInFiscalYear: 4500000,
        }
      ])
    })

    it('should return 500 when an unexpected error occurs', async () => {
      jest.spyOn(skattskilService, 'getResidentialLoansByTaxReturnId').mockImplementationOnce(() => {
        throw new Error('Database connection error')
      })

      const response = await server.get('/v1/skattskil/tax-returns/taxreturn-1/residential-loans')

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('An unexpected error occurred')
    })
  })
})