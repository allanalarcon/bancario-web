import { BrowserRouter, Routes, Route } from "react-router-dom";
import Client from "./pages/Client";
import ClientNew from "./pages/ClientNew";
import ClientEdit from "./pages/ClientEdit";
import Account from "./pages/Account";
import Transaction from "./pages/Transaction";
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
                    <Route path="movimientos" element={<Transaction />} />
                    <Route path="reporte" element={<Report />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;
