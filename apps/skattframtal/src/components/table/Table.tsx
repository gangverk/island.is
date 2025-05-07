import { useState, useEffect } from 'react'
import TableSection from './TableSection'
import TableRow from './TableRow'
import TableSumRow from './TableSumRow'
import AddLineButton from './AddLineButton'
import AnimatedTableRowWrapper from './AnimatedTableRowWrapper'
import MultiColumnRow from './MultiColumnRow'
import { BoxProps } from '@island.is/island-ui/core'

export interface TableRowData {
  backgroundColor?: BoxProps['background']
  left?: React.ReactNode
  right?: React.ReactNode
  middle?: React.ReactNode
  multi?: Array<{
    content: React.ReactNode
    width?: string
    textAlign?: 'left' | 'center' | 'right'
    key?: string | number
  }>
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
  onChange?: (data: TableSectionData[]) => void
}

const Table = ({ data, onChange }: TableProps) => {
  const [sections, setSections] = useState<TableSectionData[]>(data)
  const [animatingRow, setAnimatingRow] = useState<{
    sectionIdx: number
    rowIdx: number
  } | null>(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  const handleAddRow = (sectionIdx: number) => {
    setSections((prev) => {
      const newSections = [...prev]
      const rows = [...newSections[sectionIdx].rows]
      rows.push({ left: '', right: '' })
      newSections[sectionIdx] = { ...newSections[sectionIdx], rows }
      setAnimatingRow({ sectionIdx, rowIdx: rows.length - 1 })
      if (onChange) onChange(newSections)
      return newSections
    })
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
            const isNew =
              animatingRow &&
              animatingRow.sectionIdx === sectionIdx &&
              animatingRow.rowIdx === rIdx
            if (row.multi) {
              return (
                <MultiColumnRow
                  key={`${section.section.sectionNumber}-multi-${rIdx}`}
                  columns={row.multi}
                />
              )
            }
            return (
              <AnimatedTableRowWrapper
                key={`${section.section.sectionNumber}-${rIdx}`}
                animate={!!isNew}
              >
                <TableRow
                  left={row.left}
                  middle={row.middle}
                  right={row.right}
                  background={row.backgroundColor}
                />
              </AnimatedTableRowWrapper>
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
