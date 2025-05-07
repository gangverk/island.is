import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Documentation } from '@island.is/nest/swagger'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'

import { SkattskilService } from './skattskil.service'
import { TaxPayerDTO, TaxReturnDTO, IncomeDTO, RealEstateDTO, VehicleDTO, LiabilitiesDTO, ResidentialLoanDTO } from './dto/skattskil.response'
import { IncomeInputDTO } from './dto/skattskil.request'

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
  async getTaxReturnsByTaxPayerId(@Param('taxPayerId') taxPayerId: string): Promise<TaxReturnDTO[]> {
    try {
      const taxReturn = await this.skattskilService.getTaxReturnsByTaxPayerId(taxPayerId)
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
      return incomes
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }


  // Create Salary Income for a TaxReturn
  @Post('/tax-returns/:taxReturnId/income/salary')
  @Documentation({
    description: 'Create a new salary income record for a tax return',
    response: { status: 201, type: IncomeDTO },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return to create a salary income record for',
        },
      },
    },
  })
  async createSalaryIncome(
    @Param('taxReturnId') taxReturnId: string,
    @Body() incomeInput: IncomeInputDTO
  ): Promise<IncomeDTO> {
    try {
      // First check if the tax return exists
      const taxReturn = await this.skattskilService.getTaxReturnById(taxReturnId);
      if (!taxReturn) {
        throw new NotFoundException(`Tax return with ID ${taxReturnId} not found`);
      }
      
      // Create the salary income record
      const newIncome = await this.skattskilService.createIncome({
        ...incomeInput,
        category: 'salary',
        taxReturnId
      });
      
      return newIncome;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred when creating salary income record');
    }
  }

  // Create Per Diem Income for a TaxReturn
  @Post('/tax-returns/:taxReturnId/income/per-diem')
  @Documentation({
    description: 'Create a new per diem income record for a tax return',
    response: { status: 201, type: IncomeDTO },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return to create a per diem income record for',
        },
      },
    },
  })
  async createPerDiemIncome(
    @Param('taxReturnId') taxReturnId: string,
    @Body() incomeInput: IncomeInputDTO
  ): Promise<IncomeDTO> {
    try {
      // First check if the tax return exists
      const taxReturn = await this.skattskilService.getTaxReturnById(taxReturnId);
      if (!taxReturn) {
        throw new NotFoundException(`Tax return with ID ${taxReturnId} not found`);
      }
      
      // Create the per diem income record
      const newIncome = await this.skattskilService.createIncome({
        ...incomeInput,
        category: 'per_diem',
        taxReturnId
      });
      
      return newIncome;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred when creating per diem income record');
    }
  }

  // Create Grant Income for a TaxReturn
  @Post('/tax-returns/:taxReturnId/income/grant')
  @Documentation({
    description: 'Create a new grant income record for a tax return',
    response: { status: 201, type: IncomeDTO },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return to create a grant income record for',
        },
      },
    },
  })
  async createGrantIncome(
    @Param('taxReturnId') taxReturnId: string,
    @Body() incomeInput: IncomeInputDTO
  ): Promise<IncomeDTO> {
    try {
      // First check if the tax return exists
      const taxReturn = await this.skattskilService.getTaxReturnById(taxReturnId);
      if (!taxReturn) {
        throw new NotFoundException(`Tax return with ID ${taxReturnId} not found`);
      }
      
      // Create the grant income record
      const newIncome = await this.skattskilService.createIncome({
        ...incomeInput,
        category: 'grant',
        taxReturnId
      });
      
      return newIncome;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred when creating grant income record');
    }
  }

  // Update Salary Income
  @Put('/tax-returns/income/salary/:id')
  @Documentation({
    description: 'Update an existing salary income record',
    response: { status: 200, type: IncomeDTO },
    request: {
      params: {
        id: {
          type: 'string',
          description: 'ID of the salary income record to update',
        },
      },
    },
  })
  async updateSalaryIncome(
    @Param('id') id: string,
    @Body() incomeInput: IncomeInputDTO
  ): Promise<IncomeDTO> {
    try {
      // Check if the income record exists and belongs to the specified tax return
      const existingIncome = await this.skattskilService.getIncomeById(id);
      if (!existingIncome) {
        throw new NotFoundException(`Income record with ID ${id} not found`);
      }
      
      if (existingIncome.category !== 'salary') {
        throw new BadRequestException(`Income record with ID ${id} is not a salary income`);
      }
      
      // Update the income record
      const updatedIncome = await this.skattskilService.updateIncome(id, {
        ...incomeInput,
        category: 'salary', // Ensure category remains salary
      });

      if (!updatedIncome) {
        throw new InternalServerErrorException('Failed to update income record');
      }
      
      return updatedIncome;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred when updating salary income record');
    }
  }

  // Update Per Diem Income
  @Put('/tax-returns/income/per-diem/:id')
  @Documentation({
    description: 'Update an existing per diem income record',
    response: { status: 200, type: IncomeDTO },
    request: {
      params: {
        id: {
          type: 'string',
          description: 'ID of the per diem income record to update',
        },
      },
    },
  })
  async updatePerDiemIncome(
    @Param('id') id: string,
    @Body() incomeInput: IncomeInputDTO
  ): Promise<IncomeDTO> {
    try {
      // Check if the income record exists and belongs to the specified tax return
      const existingIncome = await this.skattskilService.getIncomeById(id);
      if (!existingIncome) {
        throw new NotFoundException(`Income record with ID ${id} not found`);
      }
      
      if (existingIncome.category !== 'per_diem') {
        throw new BadRequestException(`Income record with ID ${id} is not a per diem income`);
      }
      
      // Update the income record
      const updatedIncome = await this.skattskilService.updateIncome(id, {
        ...incomeInput,
        category: 'per_diem', // Ensure category remains per_diem
      });
      
      if (!updatedIncome) {
        throw new InternalServerErrorException('Failed to update income record');
      }

      return updatedIncome;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred when updating per diem income record');
    }
  }

  // Update Grant Income
  @Put('/tax-returns/income/grant/:id')
  @Documentation({
    description: 'Update an existing grant income record',
    response: { status: 200, type: IncomeDTO },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return containing the grant income',
        },
        id: {
          type: 'string',
          description: 'ID of the grant income record to update',
        },
      },
    },
  })
  async updateGrantIncome(
    @Param('id') id: string,
    @Body() incomeInput: IncomeInputDTO
  ): Promise<IncomeDTO> {
    try {
      // Check if the income record exists and belongs to the specified tax return
      const existingIncome = await this.skattskilService.getIncomeById(id);
      if (!existingIncome) {
        throw new NotFoundException(`Income record with ID ${id} not found`);
      }
      
      if (existingIncome.category !== 'grant') {
        throw new BadRequestException(`Income record with ID ${id} is not a grant income`);
      }
      
      // Update the income record
      const updatedIncome = await this.skattskilService.updateIncome(id, {
        ...incomeInput,
        category: 'grant',
      });

      if (!updatedIncome) {
        throw new InternalServerErrorException('Failed to update income record');
      }
      
      return updatedIncome;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred when updating grant income record');
    }
  }

    // Delete Income by ID
  @Delete('/tax-returns/income/:id')
  @Documentation({
    description: 'Delete an income record',
    response: { status: 204 },
    request: {
      params: {
        id: {
          type: 'string',
          description: 'ID of the income record to delete',
        },
      },
    },
  })
  async deleteIncome(
    @Param('id') id: string
  ): Promise<void> {
    try {
      // Check if the income record exists and belongs to the specified tax return
      const existingIncome = await this.skattskilService.getIncomeById(id);
      if (!existingIncome) {
        throw new NotFoundException(`Income record with ID ${id} not found`);
      }
      
      // Delete the income record
      const deleted = await this.skattskilService.deleteIncome(id);
      
      if (!deleted) {
        throw new NotFoundException(`Income record with ID ${id} could not be deleted or was already removed`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred when deleting income record');
    }
  }

  // Get Real Estate Assets by TaxReturn ID
  @Get('/tax-returns/:taxReturnId/assets/real-estate')
  @Documentation({
    description: 'Retrieve real estate assets for a tax return',
    response: { status: 200, type: [RealEstateDTO] },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return to retrieve real estate assets for',
        },
      }
    },
  })
  async getRealEstateAssetsByTaxReturnId(@Param('taxReturnId') taxReturnId: string): Promise<RealEstateDTO[]> {
    try {
      const assets = await this.skattskilService.getRealEstateAssetsByTaxReturnId(taxReturnId).catch(() => []);
      return assets;
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  // Get Vehicle Assets by TaxReturn ID
  @Get('/tax-returns/:taxReturnId/assets/vehicles')
  @Documentation({
    description: 'Retrieve vehicle assets for a tax return',
    response: { status: 200, type: [VehicleDTO] },
    request: {
      params: {
        taxReturnId: {
          type: 'string',
          description: 'ID of the tax return to retrieve vehicle assets for',
        },
      }
    },
  })
  async getVehicleAssetsByTaxReturnId(@Param('taxReturnId') taxReturnId: string): Promise<VehicleDTO[]> {
    try {
      const assets = await this.skattskilService.getVehicleAssetsByTaxReturnId(taxReturnId).catch(() => []);
      return assets;
    } catch (error) {
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
      return liabilities
    } catch (error) {
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
      return loans
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }
}