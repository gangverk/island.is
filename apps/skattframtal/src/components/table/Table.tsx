import { useState } from 'react'
import TableSection from './TableSection'
import TableRow from './TableRow'
import TableSumRow from './TableSumRow'
import AddLineButton from './AddLineButton'
import AnimatedTableRowWrapper from './AnimatedTableRowWrapper'

export interface TableRowData {
  left: React.ReactNode
  right: React.ReactNode
}

export interface TableSectionData {
  section: {
    title: string
    sectionNumber: string
  }
  rows: TableRowData[]
  sum: string | number
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

  const handleAddRow = (sectionIdx: number) => {
    setSections((prev) => {
      const newSections = [...prev]
      const rows = [...newSections[sectionIdx].rows]
      const insertIdx = rows.length
      rows.splice(insertIdx, 0, { left: '', right: '' })
      newSections[sectionIdx] = { ...newSections[sectionIdx], rows }
      setAnimatingRow({ sectionIdx, rowIdx: insertIdx })
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
            const shouldAlternate = section.rows.length > 2
            const isStriped = shouldAlternate && rIdx % 2 === 0
            const isNew =
              animatingRow &&
              animatingRow.sectionIdx === sectionIdx &&
              animatingRow.rowIdx === rIdx
            return (
              <AnimatedTableRowWrapper
                key={`${section.section.sectionNumber}-${rIdx}`}
                animate={!!isNew}
              >
                <TableRow
                  left={row.left}
                  right={row.right}
                  background={isStriped ? 'purple100' : undefined}
                />
              </AnimatedTableRowWrapper>
            )
          })}
          <TableSumRow
            sumLabel="Samtals"
            sumValue={section.sum}
            left={<AddLineButton onClick={() => handleAddRow(sectionIdx)} />}
          />
        </div>
      ))}
    </>
  )
}

export default Table
