import React from 'react'
import NavHeader2 from '../navHeader/navHeader'
import VerticalSideBar from '../sidebar/verticalSideBar'
const SidebarLayout = ({ children }) => {
    return (
        <>
            <section className='flex gap-2 min-h-screen relative'>
                <VerticalSideBar />
                <main className='max-w-[1540px] w-100 d-grid mx-auto'>
                    <div className='relative'>
                        <div className='absolute top-0 left-0 right-0'>
                            <NavHeader2 />
                        </div>
                        {children}
                    </div>
                </main>
            </section>
        </>
    )
}

export default SidebarLayout