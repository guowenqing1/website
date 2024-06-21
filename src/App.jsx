import "./App.css";

import { Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/pages/Home";
import { MillingCnc } from "./components/pages/Milling";
import { DrillingCnc } from "./components/pages/Drilling";
import { TurningCnc } from "./components/pages/Turning";
import { Materials } from "./components/pages/Materials";
import { AboutUs } from "./components/pages/About";
import { Contact } from "./components/pages/Contact";
import { Login } from "./components/pages/Login";
import { SignUp } from "./components/pages/SignUp";
import { Guide } from "./components/pages/Guide";
import { Recover } from "./components/pages/Recover";
import { DashboardHeader } from "./components/pages/Buy Pages/Header";
// import { QuoteComplete } from "./components/pages/Buy Pages/QuotesComplete";

import { Finishing } from "./components/pages/Finishing";
import AssistantContent from "./components/AssistantContent";
import Quotes from "./components/pages/Buy Pages/Customers/Quotes";
import { QuotesAssistant } from "./components/pages/Buy Pages/Assistant/QuotesAssistant";
import { QuoteFileInfoAssistant } from "./components/pages/Buy Pages/Assistant/QuoteFile";
import { AssistanOrders } from "./components/pages/Buy Pages/Assistant/AssistantOrders";
import { CustomersOrders } from "./components/pages/Buy Pages/Customers/CustomersOrders";
import AssistantMainPage from "./components/pages/AssistantMainPage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AssistanHilo } from "./components/pages/Assistant/AssistanHilo";
import { AssistantCheng } from "./components/pages/Assistant/AssistantCheng";
import { AssistantAxis } from "./components/pages/Assistant/AssistantAxis";
import AccountSetting from "./components/pages/Buy Pages/AccountSetting";
import NotFound from "./components/pages/404";
import { QuoteFile } from "./components/pages/Buy Pages/Customers/QuoteFile";
import { NewQuotation } from "./components/pages/Buy Pages/Customers/NewQuote";
import { PartSetting } from "./components/pages/Buy Pages/Customers/PartSetting";
import { OrderPart } from "./components/pages/Buy Pages/Customers/OrderPart";
import { OrderFile } from "./components/pages/Buy Pages/Customers/OrderFile";
import { AssistanOrdersFile } from "./components/pages/Buy Pages/Assistant/AssistanOrdersFile";
import { AssistanPart } from "./components/pages/Buy Pages/Assistant/AssistanPart";
import { AssistantOrderPart } from "./components/pages/Buy Pages/Assistant/AssistantOrderPart";
import { AssistantLogin } from "./components/pages/Buy Pages/Assistant/AssistanLogin";
import { AssistantdHeader } from "./components/pages/Buy Pages/Assistant/AssistanHeader";
import AccountInfo from "./components/pages/Buy Pages/Assistant/AccountInfo";
import Success from "./components/pages/Buy Pages/Customers/Success";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/machining-milling" element={<MillingCnc />} />
        <Route path="/machining-turning" element={<TurningCnc />} />
        <Route path="/machining-drilling" element={<DrillingCnc />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/finishing" element={<Finishing />} />
        {/* <Route path="/assistance" element={<Assistance />}> */}
        <Route path="/assistance" element={<AssistantMainPage />} />
        <Route
          path="/assistance"
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route index element={<AssistantMainPage />} />
          <Route
            path="/assistance/:id/:sec/:url/:file"
            element={<AssistantContent />}
          />
          <Route
            path="/assistance/轴端尺寸/:sec/:url/:file"
            element={<AssistantAxis />}
          />
          <Route path="/assistance/:id/:sec/:file" element={<AssistanHilo />} />
          <Route
            path="/assistance/人机工程/:file"
            element={<AssistantCheng />}
          />
          {/* <Route path="/assistance/:id " element={<AssistantContent />} /> */}
        </Route>

        <Route path="/guide" element={<Guide />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-assistant" element={<AssistantLogin />} />
        <Route path="/forgot-password" element={<Recover />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/panel"
          element={
            <>
              <DashboardHeader />
              <Outlet />
            </>
          }
        >
          <Route index element={<Quotes />} />
          <Route path="account-setting" element={<AccountSetting />} />
          <Route path="my-quotes" element={<Quotes />} />
          <Route path="new-quotation" element={<NewQuotation />} />
          <Route path="settings/:id" element={<QuoteFile />} />
          <Route path="success" element={<Success />} />
          <Route path="settings/:id/:file" element={<PartSetting />} />
          <Route path="my-orders" element={<CustomersOrders />} />
          <Route path="my-orders/:id" element={<OrderFile />} />
          <Route path="my-orders/:id/:file" element={<OrderPart />} />
        </Route>
        <Route
          path="/admin"
          element={
            <>
              <AssistantdHeader />
              <Outlet />
            </>
          }
        >
          <Route path="login-assistant" element={<AssistantLogin />} />
          <Route
            index
            path={`assistant-quotes`}
            element={<QuotesAssistant />}
          />
          <Route path="account-setting" element={<AccountInfo />} />
          <Route
            path={`assistant-quotes/:id`}
            element={<QuoteFileInfoAssistant />}
          />
          <Route path="assistant-quotes/:id/:file" element={<AssistanPart />} />
          <Route path={`assistant-orders/`} element={<AssistanOrders />} />
          <Route
            path={`assistant-orders/:id`}
            element={<AssistanOrdersFile />}
          />
          <Route
            path={`assistant-orders/:id/:file`}
            element={<AssistantOrderPart />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
