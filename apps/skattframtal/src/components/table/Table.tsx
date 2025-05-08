import { useState } from 'react'
import TableSection from './TableSection'
import TableRow from './TableRow'
import TableSumRow from './TableSumRow'
import AddLineButton from './AddLineButton'
import MultiColumnRow from './MultiColumnRow'
import { BoxProps } from '@island.is/island-ui/core'

export interface TableRowData {
  id: string
  backgroundColor?: BoxProps['background']
  left?: React.ReactNode
  leftValue: string
  rightValue: string
  hideRightValue?: boolean
  middle?: React.ReactNode
  middleValue: string
  multi?: Array<{
    content: React.ReactNode
    width?: string
    textAlign?: 'left' | 'center' | 'right'
    key?: string | number
  }>
  isNew?: boolean
}

export interface TableSectionData {
  section: {
    title: string
    sectionNumber: string
  }
  rows: TableRowData[]
  sum?: string | number
}

interface TableProps {
  data: TableSectionData[]
  onChange?: (values: {
    id: string
    left: string
    middle: string
    right: string
  }) => void
}

const Table = ({ data, onChange }: TableProps) => {
  const [sections, setSections] = useState<TableSectionData[]>(data)

  const handleAddRow = (sectionIdx: number) => {
    setSections((prev) => {
      const newSections = [...prev]
      const rows = [...newSections[sectionIdx].rows]
      rows.push({
        left: '',
        leftValue: '',
        rightValue: '',
        middle: '',
        middleValue: '',
        isNew: true,
        id: '',
      })
      newSections[sectionIdx] = { ...newSections[sectionIdx], rows }
      return newSections
    })
  }

  const handleChange = (
    id: string,
    values: { left: string; middle: string; right: string },
  ) => {
    onChange?.({ id, ...values })
  }

  return (
    <>
      {sections.map((section, sectionIdx) => (
        <div key={section.section.sectionNumber}>
          <TableSection
            title={section.section.title}
            sectionNumber={section.section.sectionNumber}
          />
          {section.rows.map((row, rIdx) => {
            if (row.multi) {
              return (
                <MultiColumnRow
                  key={`${section.section.sectionNumber}-multi-${rIdx}`}
                  columns={row.multi}
                />
              )
            }
            return (
              <TableRow
                key={`${section.section.sectionNumber}-${rIdx}`}
                left={row.left}
                leftValue={row.leftValue}
                middle={row.middle}
                middleValue={row.middleValue}
                rightValue={row.rightValue}
                hideRightValue={row.hideRightValue}
                background={row.backgroundColor}
                isNew={row.isNew}
                onChange={(values) => handleChange(row.id, values)}
              />
            )
          })}
          {section.sum !== undefined && section.sum !== null && (
            <TableSumRow
              sumLabel="Samtals"
              sumValue={section.sum}
              left={<AddLineButton onClick={() => handleAddRow(sectionIdx)} />}
            />
          )}
        </div>
      ))}
    </>
  )
}

export default Table
