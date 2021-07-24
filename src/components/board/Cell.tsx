interface CellProps {
    state: number
}

export function Cell(props: CellProps) {
    const displayChar = () => {
        switch (props.state) {
            case 1: return <div className="snake-meat"></div>
        }
    }
    
    
    return <>
        Cell
    </>
}