import { Layout } from "antd";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Layout.scss";
const { Content } = Layout;

// eslint-disable-next-line react/prop-types
const LayoutDefault = ({ children }) => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <Content className="content">
          <div className="content-section">{children}</div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default LayoutDefault;
