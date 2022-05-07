import { Box } from '@chakra-ui/react'
import React, { Children } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout: React.FC = ({ children }) => {
	return (
		<Box>
			<Navbar />
			<Box className='relative min-h-screen'>{children}</Box>
			<Box className='absolute bottom-0 w-full h-2.5'>
				<Footer />
			</Box>
		</Box>
	)
}

export default Layout
