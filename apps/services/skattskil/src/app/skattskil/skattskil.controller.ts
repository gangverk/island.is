import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

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
  @Get('/taxpayer/:id')
  @ApiOperation({ summary: 'Retrieve a taxpayer by ID' })
  getTaxPayerById(@Param('id') id: string): Promise<TaxPayerDTO | null> {
    return this.skattskilService.getTaxPayerById(id)
  }
  /*
  // Create a new TaxPayer
  @Post('/taxpayer')
  @ApiOperation({ summary: 'Create a new taxpayer' })
  createTaxPayer(@Body() data: TaxPayerDTO): Promise<TaxPayerDTO> {
    return this.skattskilService.createTaxPayer(data)
  }

  // Update an existing TaxPayer
  @Put('/taxpayer/:id')
  @ApiOperation({ summary: 'Update an existing taxpayer' })
  updateTaxPayer(@Param('id') id: string, @Body() data: Partial<TaxPayerDTO>): Promise<TaxPayerDTO | null> {
    return this.skattskilService.updateTaxPayer(id, data)
  }

  // Get TaxReturn by ID
  @Get('/taxreturn/:id')
  @ApiOperation({ summary: 'Retrieve a tax return by ID' })
  getTaxReturnById(@Param('id') id: string): Promise<TaxReturnDTO | null> {
    return this.skattskilService.getTaxReturnById(id)
  }

  // Create a new TaxReturn
  @Post('/taxreturn')
  @ApiOperation({ summary: 'Create a new tax return' })
  createTaxReturn(@Body() data: TaxReturnDTO): Promise<TaxReturnDTO> {
    return this.skattskilService.createTaxReturn(data)
  }

  // Update an existing TaxReturn
  @Put('/taxreturn/:id')
  @ApiOperation({ summary: 'Update an existing tax return' })
  updateTaxReturn(@Param('id') id: string, @Body() data: Partial<TaxReturnDTO>): Promise<TaxReturnDTO | null> {
    return this.skattskilService.updateTaxReturn(id, data)
  }

  // Get Income by TaxReturn ID
  @Get('/income/:taxReturnId')
  @ApiOperation({ summary: 'Retrieve all income records for a tax return' })
  getIncomeByTaxReturnId(@Param('taxReturnId') taxReturnId: string): Promise<IncomeDTO[]> {
    return this.skattskilService.getIncomeByTaxReturnId(taxReturnId)
  }

  // Create a new Income
  @Post('/income')
  @ApiOperation({ summary: 'Create a new income record' })
  createIncome(@Body() data: IncomeDTO): Promise<IncomeDTO> {
    return this.skattskilService.createIncome(data)
  }

  // Update an existing Income
  @Put('/income/:id')
  @ApiOperation({ summary: 'Update an existing income record' })
  updateIncome(@Param('id') id: string, @Body() data: Partial<IncomeDTO>): Promise<IncomeDTO | null> {
    return this.skattskilService.updateIncome(id, data)
  }

  // Get Assets by TaxReturn ID
  @Get('/assets/:taxReturnId')
  @ApiOperation({ summary: 'Retrieve all assets for a tax return' })
  getAssetsByTaxReturnId(@Param('taxReturnId') taxReturnId: string): Promise<AssetsDTO[]> {
    return this.skattskilService.getAssetsByTaxReturnId(taxReturnId)
  }

  // Create a new Asset
  @Post('/assets')
  @ApiOperation({ summary: 'Create a new asset' })
  createAsset(@Body() data: AssetsDTO): Promise<AssetsDTO> {
    return this.skattskilService.createAsset(data)
  }

  // Update an existing Asset
  @Put('/assets/:id')
  @ApiOperation({ summary: 'Update an existing asset' })
  updateAsset(@Param('id') id: string, @Body() data: Partial<AssetsDTO>): Promise<AssetsDTO | null> {
    return this.skattskilService.updateAsset(id, data)
  }

  // Get Liabilities by TaxReturn ID
  @Get('/liabilities/:taxReturnId')
  @ApiOperation({ summary: 'Retrieve all liabilities for a tax return' })
  getLiabilitiesByTaxReturnId(@Param('taxReturnId') taxReturnId: string): Promise<LiabilitiesDTO[]> {
    return this.skattskilService.getLiabilitiesByTaxReturnId(taxReturnId)
  }

  // Create a new Liability
  @Post('/liabilities')
  @ApiOperation({ summary: 'Create a new liability' })
  createLiability(@Body() data: LiabilitiesDTO): Promise<LiabilitiesDTO> {
    return this.skattskilService.createLiability(data)
  }

  // Update an existing Liability
  @Put('/liabilities/:id')
  @ApiOperation({ summary: 'Update an existing liability' })
  updateLiability(@Param('id') id: string, @Body() data: Partial<LiabilitiesDTO>): Promise<LiabilitiesDTO | null> {
    return this.skattskilService.updateLiability(id, data)
  }

  // Get Residential Loans by TaxReturn ID
  @Get('/residential-loans/:taxReturnId')
  @ApiOperation({ summary: 'Retrieve all residential loans for a tax return' })
  getResidentialLoansByTaxReturnId(@Param('taxReturnId') taxReturnId: string): Promise<ResidentialLoanDTO[]> {
    return this.skattskilService.getResidentialLoansByTaxReturnId(taxReturnId)
  }

  // Create a new Residential Loan
  @Post('/residential-loans')
  @ApiOperation({ summary: 'Create a new residential loan' })
  createResidentialLoan(@Body() data: ResidentialLoanDTO): Promise<ResidentialLoanDTO> {
    return this.skattskilService.createResidentialLoan(data)
  }

  // Update an existing Residential Loan
  @Put('/residential-loans/:id')
  @ApiOperation({ summary: 'Update an existing residential loan' })
  updateResidentialLoan(@Param('id') id: string, @Body() data: Partial<ResidentialLoanDTO>): Promise<ResidentialLoanDTO | null> {
    return this.skattskilService.updateResidentialLoan(id, data)
  }*/
}