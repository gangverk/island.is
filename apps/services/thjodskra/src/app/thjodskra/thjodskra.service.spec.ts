import { ThjodskraService } from './thjodskra.service'
import { TestApp } from '@island.is/testing/nest'
import { setupTestApp } from '../../../test/setup'
import { Thjodskra } from './models/thjodskra.model'
import { Fasteignaskra } from './models/fasteignaskra.model'
import { Okutaekjaskra } from './models/okutaekjaskra.model'
import { getModelToken } from '@nestjs/sequelize'

describe('ThjodskraService', () => {
  let app: TestApp
  let service: ThjodskraService
  let thjodskraModel: typeof Thjodskra & { findOne: jest.Mock; findAll: jest.Mock }
  let fasteignaskraModel: typeof Fasteignaskra & { findOne: jest.Mock; findAll: jest.Mock }
  let okutaekjaskraModel: typeof Okutaekjaskra & { findOne: jest.Mock; findAll: jest.Mock }

  beforeAll(async () => {
    app = await setupTestApp()
    
    service = app.get<ThjodskraService>(ThjodskraService)
    thjodskraModel = app.get(getModelToken(Thjodskra))
    fasteignaskraModel = app.get(getModelToken(Fasteignaskra))
    okutaekjaskraModel = app.get(getModelToken(Okutaekjaskra))
    
    // Mock all database interactions
    jest.spyOn(thjodskraModel, 'findOne').mockImplementation(() => null)
    jest.spyOn(fasteignaskraModel, 'findOne').mockImplementation(() => null)
    jest.spyOn(fasteignaskraModel, 'findAll').mockImplementation(() => [])
    jest.spyOn(okutaekjaskraModel, 'findOne').mockImplementation(() => null)
    jest.spyOn(okutaekjaskraModel, 'findAll').mockImplementation(() => [])
  })

  afterAll(() => {
    app?.cleanUp()

    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  describe('getPersonById', () => {
    it('should return person data when valid kennitala is provided', async () => {
      const mockPerson = {
        name: 'Jón Jónsson',
        kennitalaId: '1234567890',
        legalDomicile: 'Austurstræti 12',
        postalCode: '101',
        city: 'Reykjavík'
      }

      jest.spyOn(thjodskraModel, 'findOne').mockResolvedValueOnce(mockPerson)

      const result = await service.getPersonById('1234567890')

      expect(result).toEqual({
        name: 'Jón Jónsson',
        kennitala: '1234567890',
        legalDomicile: 'Austurstræti 12',
        postalCode: '101',
        city: 'Reykjavík'
      })

      expect(thjodskraModel.findOne).toHaveBeenCalledWith({
        where: { kennitalaId: '1234567890' }
      })
    })

    it('should return null when person is not found', async () => {
      jest.spyOn(thjodskraModel, 'findOne').mockResolvedValueOnce(null)

      const result = await service.getPersonById('1234567890')

      expect(result).toBeNull()
    })
  })

  describe('getPropertyById', () => {
    it('should return property data when valid property number is provided', async () => {
      const mockProperty = {
        propertyNumber: 'F2020-123456',
        address: 'Laugavegur 20',
        appraisal: 45000000
      }

      jest.spyOn(fasteignaskraModel, 'findOne').mockResolvedValueOnce(mockProperty)

      const result = await service.getPropertyById('F2020-123456')

      expect(result).toEqual({
        propertyNumber: 'F2020-123456',
        address: 'Laugavegur 20',
        appraisal: 45000000
      })

      expect(fasteignaskraModel.findOne).toHaveBeenCalledWith({
        where: { propertyNumber: 'F2020-123456' }
      })
    })

    it('should return null when property is not found', async () => {
      jest.spyOn(fasteignaskraModel, 'findOne').mockResolvedValueOnce(null)

      const result = await service.getPropertyById('nonexistent')

      expect(result).toBeNull()
    })
  })

  describe('getVehicleById', () => {
    it('should return vehicle data when valid license plate is provided', async () => {
      const mockVehicle = {
        licensePlateNumber: 'AB123',
        purchaseYear: 2019,
        purchasePrice: 4500000
      }

      jest.spyOn(okutaekjaskraModel, 'findOne').mockResolvedValueOnce(mockVehicle)

      const result = await service.getVehicleById('AB123')

      expect(result).toEqual({
        licensePlateNumber: 'AB123',
        purchaseYear: 2019,
        purchasePrice: 4500000
      })

      expect(okutaekjaskraModel.findOne).toHaveBeenCalledWith({
        where: { licensePlateNumber: 'AB123' }
      })
    })

    it('should return null when vehicle is not found', async () => {
      jest.spyOn(okutaekjaskraModel, 'findOne').mockResolvedValueOnce(null)

      const result = await service.getVehicleById('XX999')

      expect(result).toBeNull()
    })
  })
})

describe('Okutaekjaskra Model', () => {
  describe('purchasePrice getter', () => {
    it('should convert string/bigint value to a number', () => {
      const vehicle = new Okutaekjaskra()
      
      const getDataValueSpy = jest.spyOn(vehicle, 'getDataValue' as any)
        .mockReturnValue('5000000')
      
      expect(vehicle.purchasePrice).toBe(5000000)
      expect(typeof vehicle.purchasePrice).toBe('number')
      expect(getDataValueSpy).toHaveBeenCalledWith('purchasePrice')
    })
    
    it('should handle null values', () => {
      const vehicle = new Okutaekjaskra()
      
      jest.spyOn(vehicle, 'getDataValue' as any).mockReturnValue(null)
      
      expect(vehicle.purchasePrice).toBe(0) // Number(null) is 0
    })
    
    it('should handle numeric string values', () => {
      const vehicle = new Okutaekjaskra()
      
      jest.spyOn(vehicle, 'getDataValue' as any).mockReturnValue('4500000')
      
      expect(vehicle.purchasePrice).toBe(4500000)
    })
  })
})

describe('Fasteignaskra Model', () => {
  describe('appraisal getter', () => {
    it('should convert string/bigint value to a number', () => {
      const property = new Fasteignaskra()
      
      const getDataValueSpy = jest.spyOn(property, 'getDataValue' as any)
        .mockReturnValue('45000000')
      
      expect(property.appraisal).toBe(45000000)
      expect(typeof property.appraisal).toBe('number')
      expect(getDataValueSpy).toHaveBeenCalledWith('appraisal')
    })
    
    it('should handle null values', () => {
      const property = new Fasteignaskra()
      
      jest.spyOn(property, 'getDataValue' as any).mockReturnValue(null)
      
      expect(property.appraisal).toBe(0) // Number(null) is 0
    })
    
    it('should handle numeric string values', () => {
      const property = new Fasteignaskra()
      
      jest.spyOn(property, 'getDataValue' as any).mockReturnValue('52500000')
      
      expect(property.appraisal).toBe(52500000)
    })
    
    it('should convert decimal strings correctly', () => {
      const property = new Fasteignaskra()
      
      jest.spyOn(property, 'getDataValue' as any).mockReturnValue('42500000.50')
      
      expect(property.appraisal).toBe(42500000.5)
    })
  })
})