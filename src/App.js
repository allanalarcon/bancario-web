import { BrowserRouter, Routes, Route } from "react-router-dom";
import Client from "./pages/Client";
import ClientNew from "./pages/ClientNew";
import ClientEdit from "./pages/ClientEdit";
import Account from "./pages/Account";
import AccountNew from "./pages/AccountNew";
import AccountEdit from "./pages/AccountEdit";
import Transaction from "./pages/Transaction";
import TransactionNew from "./pages/TransactionNew";
import Report from "./pages/Report";

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Client />} />
                    <Route path="clientes" element={<Client />} />
                    <Route path="clientes/add" element={<ClientNew />} />
                    <Route path="clientes/:id/edit" element={<ClientEdit />} />
                    <Route path="cuentas" element={<Account />} />
                    <Route path="cuentas/add" element={<AccountNew />} />
                    <Route path="cuentas/:id/edit" element={<AccountEdit />} />
                    <Route path="movimientos" element={<Transaction />} />
                    <Route path="movimientos/add" element={<TransactionNew />} />
                    <Route path="reporte" element={<Report />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;
