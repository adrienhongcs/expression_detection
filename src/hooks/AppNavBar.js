import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'

function AppNavBar() {
    const [isOpen, setIsOpen] = useState(false)


    return(
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">Let's Detect Your Expressions!</NavbarBrand>
                <NavbarToggler onClick={ () => setIsOpen(!isOpen) } />
                <Collapse isOpen={ isOpen } navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/adrienhongcs/expression_detection">
                                Github
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavBar