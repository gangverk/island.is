import { useEffect, useState } from 'react'
import TableSection from './TableSection'
import TableRow from './TableRow'
import TableSumRow from './TableSumRow'
import AddLineButton from './AddLineButton'
import MultiColumnRow from './MultiColumnRow'
import { BoxProps } from '@island.is/island-ui/core'

export interface TableRowData<T> {
  rawData?: T
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
  onDelete?: () => void
}

export interface TableSectionData<T> {
  section: {
    title: string
    sectionNumber: string
  }
  defaultRawData?: Partial<T>
  rows: TableRowData<T>[]
  sum?: string | number
}

interface TableProps<T> {
  data: TableSectionData<T>[]
  onChange?: (values: {
    rawData: T
    left: string
    middle: string
    right: string
  }) => void
}

const Table = <T extends Record<string, unknown>>({
  data,
  onChange,
}: TableProps<T>) => {
  const [sections, setSections] = useState<TableSectionData<T>[]>(data)

  useEffect(() => {
    setSections(data)
  }, [data])

  const handleDeleteRow = (sectionIdx: number, rowIdx: number) => {
    setSections((prev) => {
      const newSections = [...prev]
      newSections[sectionIdx].rows.splice(rowIdx, 1)
      return newSections
    })
  }

  const handleAddRow = (sectionIdx: number) => {
    setSections((prev) => {
      const newSections = [...prev]
      const rows = [...newSections[sectionIdx].rows]
      rows.push({
        rawData: {
          ...(newSections[sectionIdx].defaultRawData as T),
        },
        left: '',
        leftValue: '',
        rightValue: '',
        middle: '',
        middleValue: '',
        isNew: true,
        backgroundColor: 'blue100',
        onDelete: () => handleDeleteRow(sectionIdx, rows.length - 1),
      })
      newSections[sectionIdx] = { ...newSections[sectionIdx], rows }
      return newSections
    })
  }

  const handleChange = (
    rawData: T | undefined,
    values: { left: string; middle: string; right: string },
  ) => {
    onChange?.({ rawData: rawData || ({} as T), ...values })
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
                onChange={(values) => handleChange(row.rawData, values)}
                onDelete={row.onDelete}
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
