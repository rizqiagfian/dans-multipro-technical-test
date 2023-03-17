import React from "react"

const Footer = () => {
    return (
        <>
            <footer className="font-montserrat" style={{ backgroundColor: 'black', color: '#fff', padding: '2rem', textAlign: 'center', letterSpacing: '1px' }}>
                <strong>Copyright &copy; {new Date().getFullYear()} <a style={{ color: 'yellow', textDecoration: 'none' }} href="https://github.com/rizqiagfian" target={"_blank"}>Rizqi Agfian</a> </strong>
                All rights reserved.
                <div style={{ marginTop: '0.5rem' }}>
                    <b>Version</b> 1.0.0
                </div>
            </footer>
        </>
    )
}

export default Footer