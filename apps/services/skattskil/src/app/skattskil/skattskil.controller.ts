import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Documentation } from '@island.is/nest/swagger'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'

import { SkattskilService } from './skattskil.service'
import { TaxPayerDTO, TaxReturnDTO, IncomeDTO, AssetsDTO, LiabilitiesDTO, ResidentialLoanDTO } from './dto/skattskil.dto'

@ApiTags('skattskil')
@Controller({
  path: 'skattskil',
  version: ['1'],
})
export class SkattskilController {
  constructor(private readonly skattskilService: SkattskilService) {}

  // Get TaxPayer by ID
  @Get('/taxpayers/:id')
  @Documentation({
    description: 'Retrieve a taxpayer by ID.',
    response: { status: 200, type: TaxPayerDTO },
    request: {
      params: {
        id: {
          type: 'string',
          description: 'ID of the taxpayer',
        },
      }
    },
  })
  async getTaxPayerById(@Param('id') id: string): Promise<TaxPayerDTO> {
    try {
      const taxPayer = await this.skattskilService.getTaxPayerById(id)
      if (!taxPayer) {
        throw new NotFoundException(`Taxpayer with ID ${id} not found`)
      }
      return taxPayer
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  // Get TaxPayer by kennitala
  @Get('/taxpayers/by-kennitala/:kennitala')
  @Documentation({
    description: 'Retrieve a taxpayer by kennitala',
    response: { status: 200, type: TaxPayerDTO },
    request: {
      params: {
        kennitala: {
          type: 'string',
          description: 'Kennitala (personal ID) of the taxpayer',
        },
      }
    },
  })
  async getTaxPayerByKennitala(@Param('kennitala') kennitala: string): Promise<TaxPayerDTO> {
    try {
      const taxPayer = await this.skattskilService.getTaxPayerByKennitala(kennitala)
      if (!taxPayer) {
        throw new NotFoundException(`Taxpayer with kennitala ${kennitala} not found`)
      }
      return taxPayer
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  // Get TaxReturn by TaxPayer ID
  @Get('/taxpayers/:taxPayerId/tax-returns')
  @Documentation({
    description: 'Retrieve tax returns for a taxpayer',
    response: { status: 200, type: TaxReturnDTO },
    request: {
      params: {
        taxPayerId: {
          type: 'string',
          description: 'ID of the taxpayer whose tax returns to retrieve',
        },
      }
    },
  })
  async getTaxReturnByTaxPayerId(@Param('taxPayerId') taxPayerId: string): Promise<TaxReturnDTO> {
    try {
      const taxReturn = await this.skattskilService.getTaxReturnById(taxPayerId)
      if (!taxReturn) {
        throw new NotFoundException(`Tax return for taxpayer ID ${taxPayerId} not found`)
      }
      return taxReturn
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  // Get TaxReturn by ID
  @Get('/tax-returns/:id')
  @Documentation({
    description: 'Retrieve a tax return by ID',
    response: { status: 200, type: TaxReturnDTO },
    request: {
      params: {
        id: {
          type: 'string',
          description: 'ID of the tax return to retrieve',
        },
      }
    },
  })
  async getTaxReturnById(@Param('id') id: string): Promise<TaxReturnDTO> {
    try {
      const taxReturn = await this.skattskilService.getTaxReturnById(id)
      if (!taxReturn) {
        throw new NotFoundException(`Tax return with ID ${id} not found`)
      }
      return taxReturn
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  // Get Income by TaxReturn ID
  @Get('/tax-returns/:taxReturnId/income')
  @Documentation({
    description: 'Retrieve all income records for a tax return',
    response: { status: 200, type: [IncomeDTO] },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return to retrieve income records for',
        },
      }
    },
  })
  async getIncomeByTaxReturnId(@Param('taxReturnId') taxReturnId: string): Promise<IncomeDTO[]> {
    try {
      const incomes = await this.skattskilService.getIncomeByTaxReturnId(taxReturnId)
      if (!incomes || incomes.length === 0) {
        throw new NotFoundException(`No income records found for tax return ID ${taxReturnId}`)
      }
      return incomes
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  // Get Assets by TaxReturn ID with optional type filter
  @Get('/tax-returns/:taxReturnId/assets')
  @Documentation({
    description: 'Retrieve assets for a tax return, optionally filtered by type',
    response: { status: 200, type: [AssetsDTO] },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return to retrieve assets for',
        },
      },
      query: {
        type: {
          type: 'string',
          description: 'Asset type to filter by (real-estate, vehicle)',
          required: false,
        },
      }
    },
  })
  async getAssetsByTaxReturnId(
    @Param('taxReturnId') taxReturnId: string,
    @Query('type') type?: string
  ): Promise<AssetsDTO[]> {
    try {
      let assets: AssetsDTO[] = [];
      
      if (type === 'real-estate') {
        assets = await this.skattskilService.getRealEstateAssetsByTaxReturnId(taxReturnId);
      } else if (type === 'vehicle') {
        assets = await this.skattskilService.getVehicleAssetsByTaxReturnId(taxReturnId);
      } else {
        // Get all assets regardless of type
        const realEstateAssets = await this.skattskilService.getRealEstateAssetsByTaxReturnId(taxReturnId).catch(() => []);
        const vehicleAssets = await this.skattskilService.getVehicleAssetsByTaxReturnId(taxReturnId).catch(() => []);
        assets = [...realEstateAssets, ...vehicleAssets];
      }
      
      if (!assets || assets.length === 0) {
        throw new NotFoundException(`No assets found for tax return ID ${taxReturnId}${type ? ` with type ${type}` : ''}`);
      }
      
      return assets;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  // Get Liabilities by TaxReturn ID
  @Get('/tax-returns/:taxReturnId/liabilities')
  @Documentation({
    description: 'Retrieve all liabilities for a tax return',
    response: { status: 200, type: [LiabilitiesDTO] },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return to retrieve liabilities for',
        },
      }
    },
  })
  async getLiabilitiesByTaxReturnId(@Param('taxReturnId') taxReturnId: string): Promise<LiabilitiesDTO[]> {
    try {
      const liabilities = await this.skattskilService.getLiabilitiesByTaxReturnId(taxReturnId)
      if (!liabilities || liabilities.length === 0) {
        throw new NotFoundException(`No liabilities found for tax return ID ${taxReturnId}`)
      }
      return liabilities
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  // Get Residential Loans by TaxReturn ID
  @Get('/tax-returns/:taxReturnId/residential-loans')
  @Documentation({
    description: 'Retrieve all residential loans for a tax return',
    response: { status: 200, type: [ResidentialLoanDTO] },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return to retrieve residential loans for',
        },
      }
    },
  })
  async getResidentialLoansByTaxReturnId(@Param('taxReturnId') taxReturnId: string): Promise<ResidentialLoanDTO[]> {
    try {
      const loans = await this.skattskilService.getResidentialLoansByTaxReturnId(taxReturnId)
      if (!loans || loans.length === 0) {
        throw new NotFoundException(`No residential loans found for tax return ID ${taxReturnId}`)
      }
      return loans
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }
}