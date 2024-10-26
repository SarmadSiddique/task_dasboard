/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef } from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ArrowLeft, ArrowRight, ChevronDown } from 'react-feather'
import { Card, Input } from 'reactstrap'
import { Spinner } from 'react-bootstrap'
// import { arrowleft2, arrowright2, filter, searchbar, searchnormal } from '../icons/icon'

const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))


const DataTableCustom = ({ data, columns, rowHeading, showRow, showFilter, count, setLastId, selectableRows = true, pageLen = 9, isLoading = false }) => {
    const [modal, setModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])

    // ** Function to handle Modal toggle
    const handleModal = () => setModal(!modal)

    // ** Function to handle filter
    const handleFilter = e => {
        const value = e.target.value
        setSearchValue(value)
    }

    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
        setLastId(page.selected * pageLen)
    }

    // ** Pagination Previous Component
    const Previous = () => {
        return (
            <Fragment>
                <ArrowLeft style={{ height: "1.1rem" }} />
            </Fragment>
        )
    }

    // ** Pagination Next Component
    const Next = () => {
        return (
            <Fragment>
                <ArrowRight style={{ height: "1.1rem" }} />
            </Fragment>
        )
    }
    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel={<Previous size={15} />}
            nextLabel={<Next size={15} />}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={Math.ceil(count / pageLen)}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            nextLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextClassName='page-item next-item '
            previousClassName='page-item prev-item'
            containerClassName={`pagination react-paginate separated-pagination pagination-sm justify-content-end gap-1 ps-3 mt-4 ${isLoading && 'visually'}`}
        />
    )

    return (
        <>
            <Fragment>
                <Card className='border border-white w-full'>
                    {showRow && (
                        <div className='flex items-center justify-between flex-wrap p-3 max-md:gap-3 w-full'>
                            <div className="">
                                <h6 className='plusJakara_semibold text-[#6C7278]'>{rowHeading}</h6>
                            </div>
                            <div className='flex items-center flex-wrap gap-[12px]'>
                                <div className='relative'>
                                    {/* <img src={searchnormal} className='absolute mt-[12px] ms-3' alt="" /> */}
                                    <Input
                                        className='dataTable-filter ps-5 md:pe-5 py-[8px] w-full'
                                        type='text'
                                        placeholder='Search anything here'
                                        id='search-input-1'
                                        value={searchValue}
                                        onChange={handleFilter}
                                    />
                                </div>
                                {showFilter && (
                                    <div>
                                        <button className="flex items-center gap-2 border rounded-lg py-[8px] px-[14px]">
                                            {/* <img src={filter} alt="" /> */}
                                            <span className='plusJakara_semibold text_black text-sm'>Filter</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className='react-dataTable'>
                        {isLoading ? <div className='py-5 text-center'>
                            <Spinner size='' />
                        </div> :
                            <DataTable
                                noHeader
                                pagination
                                selectableRows={selectableRows}
                                columns={columns}
                                paginationPerPage={pageLen}
                                className='react-dataTable'
                                sortIcon={<ChevronDown size={10} />}
                                paginationDefaultPage={currentPage + 1}
                                paginationComponent={CustomPagination}
                                data={data}
                                selectableRowsComponent={BootstrapCheckbox}
                            />}
                    </div>
                </Card>
            </Fragment>
        </>
    )
}

export default DataTableCustom;