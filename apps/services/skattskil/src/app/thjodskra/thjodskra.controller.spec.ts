/*import request from 'supertest'
import { TestApp, testServer, useDatabase } from '@island.is/testing/nest'
import { AppModule } from '../app.module'
import { ThjodskraService } from './thjodskra.service'
import { SequelizeConfigService } from '../../sequelizeConfig.service'
import { Sequelize } from 'sequelize-typescript'
import { Type } from '@nestjs/common'
import { getConnectionToken, getModelToken } from '@nestjs/sequelize'

describe('ThjodskraController', () => {
  let app: TestApp
  let sequelize: Sequelize
  let server: request.SuperTest<request.Test>
  let thjodskraService: ThjodskraService

  beforeAll(async () => {
    app = await testServer({
      appModule: AppModule,
      enableVersioning: true,
      hooks: [
        useDatabase({ type: 'postgres', provider: SequelizeConfigService }),
      ],
    })
    sequelize = await app.resolve(getConnectionToken() as Type<Sequelize>)
    server = request(app.getHttpServer())
    thjodskraService = app.get<ThjodskraService>(ThjodskraService)

    jest.spyOn(thjodskraService, 'getPersonById').mockImplementation((id: string) =>
      Promise.resolve({
        name: 'John Doe',
        kennitala: id,
        legalDomicile: 'Reykjavik',
        postalCode: '101',
        city: 'Reykjavik',
      }),
    )

    jest.spyOn(thjodskraService, 'getPropertyById').mockImplementation((id: string) =>
      Promise.resolve({
        propertyNumber: id,
        address: '123 Main Street',
        appraisal: 50000000,
      }),
    )

    jest.spyOn(thjodskraService, 'getVehicleById').mockImplementation((id: string) =>
      Promise.resolve({
        licensePlateNumber: id,
        purchaseYear: '2020',
        purchasePrice: 3000000,
      }),
    )
  })

  afterAll(async () => {
    await app?.cleanUp()
  })

  describe('GET /thjodskra/person/:id', () => {
    it('should return person information', async () => {
      const response = await server.get('/v1/thjodskra/person/1234567890')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        name: 'John Doe',
        kennitala: '1234567890',
        legalDomicile: 'Reykjavik',
        postalCode: '101',
        city: 'Reykjavik',
      })
    })
  })

  describe('GET /thjodskra/property/:id', () => {
    it('should return property information', async () => {
      const response = await server.get('/v1/thjodskra/property/PROP123')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        propertyNumber: 'PROP123',
        address: '123 Main Street',
        appraisal: 50000000,
      })
    })
  })

  describe('GET /thjodskra/vehicle/:id', () => {
    it('should return vehicle information', async () => {
      const response = await server.get('/v1/thjodskra/vehicle/ABC123')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        licensePlateNumber: 'ABC123',
        purchaseYear: 2020,
        purchasePrice: 3000000,
      })
    })
  })
})*/