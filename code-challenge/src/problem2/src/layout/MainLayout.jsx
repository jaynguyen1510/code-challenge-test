import PropTypes from "prop-types"; // Import để kiểm tra props
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container mt-4">{children}</main>
      <Footer />
    </>
  );
}

// Kiểm tra props hợp lệ
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
