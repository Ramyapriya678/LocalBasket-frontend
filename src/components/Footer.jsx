function Footer() {
    return (
        <footer className="bg-white border-top mt-auto py-4">
            <div className="container text-center text-muted small">
                <p className="mb-1 fw-semibold text-success">🧺 LocalBasket</p>
                <p className="mb-0">
                    Fresh groceries from local stores, delivered to your door.
                </p>
                <p className="mb-0">
                    © {new Date().getFullYear()} LocalBasket. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;